#!/usr/bin/env node
/**
 * Post-processes TypeDoc markdown output for Fumadocs:
 *
 *   1. Merges each `schemas/*Schemas` page into its matching
 *      `endpoints/*Endpoints` page, so every endpoint plus the types
 *      it returns live on a single page.
 *   2. Rewrites inter-module links to anchors when the target has
 *      been merged into the same page.
 *   3. Adds a YAML frontmatter block (title + description) that
 *      Fumadocs needs to render the page.
 *   4. Gives each file a clean, human-friendly name and title.
 */
import { readdir, readFile, writeFile, unlink, rename } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const apiDir = fileURLToPath(new URL('../content/docs/api/', import.meta.url));

// ---------------------------------------------------------------- utilities

function depluralize(word) {
  if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
  if (word.endsWith('sses')) return word.slice(0, -2);
  if (word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

/** Remove trailing "Endpoint"/"Endpoints" and depluralize. */
function endpointStem(base) {
  return depluralize(base.replace(/Endpoints?$/, ''));
}

/** Remove trailing "Schema"/"Schemas". */
function schemaStem(base) {
  return base.replace(/Schemas?$/, '');
}

/** Derive a nice display name & url slug from a module filename. */
function niceName(base) {
  // "AgentsEndpoints" -> "Agents", "VersionEndpoint" -> "Version"
  if (/Endpoints?$/.test(base)) return base.replace(/Endpoints?$/, '');
  // "SharedSchemas" -> "Shared Types"
  if (base === 'SharedSchemas') return 'Shared Types';
  return base;
}

function slugify(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function escapeYaml(value) {
  return value.replace(/"/g, '\\"').replace(/\n/g, ' ').trim();
}

// -------------------------------------------------------- gather module info

const files = (await readdir(apiDir)).filter(
  (f) => f.endsWith('.mdx') && f !== 'index.mdx',
);

/**
 * Each module: { file, kind: 'endpoint'|'schema'|'other', base, stem }
 * `file` is the generated filename (relative to apiDir).
 * `base` is the bare module basename (e.g. "AgentsEndpoints").
 */
const modules = files.map((file) => {
  const noExt = file.slice(0, -extname(file).length);
  // TypeDoc names them "endpoints.AgentsEndpoints" with flattenOutputFiles
  const parts = noExt.split('.');
  const base = parts[parts.length - 1];
  const folder = parts.length > 1 ? parts[0] : '';

  let kind = 'other';
  if (folder === 'endpoints') kind = 'endpoint';
  else if (folder === 'schemas') kind = 'schema';
  else if (base === 'ValorantApi') kind = 'other';

  return { file, base, folder, kind };
});

// ------------------------------------------------ build merge mapping

/** modulesByFile: file -> target file (the file it should be written to) */
const targetByFile = new Map();
/** mergesIntoEndpoint: endpoint base -> array of schema module entries */
const mergedSchemas = new Map();

for (const m of modules) {
  if (m.kind === 'endpoint') {
    targetByFile.set(m.file, m.file);
    mergedSchemas.set(m.base, []);
  } else if (m.kind === 'other') {
    targetByFile.set(m.file, m.file);
  }
}

for (const m of modules) {
  if (m.kind !== 'schema') continue;
  const sStem = schemaStem(m.base);
  // Find an endpoint whose singular stem is a prefix of schema stem.
  // E.g. endpoint stem "GameMode" absorbs schemas "GameMode" and "GameModeEquippable".
  const endpoint = modules
    .filter((e) => e.kind === 'endpoint')
    .map((e) => ({ ...e, eStem: endpointStem(e.base) }))
    // Longest matching prefix wins
    .sort((a, b) => b.eStem.length - a.eStem.length)
    .find((e) => sStem === e.eStem || sStem.startsWith(e.eStem));

  if (endpoint) {
    targetByFile.set(m.file, endpoint.file);
    mergedSchemas.get(endpoint.base).push(m);
  } else {
    // e.g. SharedSchemas — keep its own page
    targetByFile.set(m.file, m.file);
  }
}

// ------------------------------- build header lookup so we can rewrite links

/**
 * For every heading that TypeDoc emitted (e.g. `### AgentResponse`), we
 * need to know which file it's going to live in *after* merging so that
 * cross-module links keep working. TypeDoc slugifies "AgentResponse" →
 * "agentresponse" for the anchor (markdown convention).
 */
const anchorLocation = new Map(); // "<originalFile>#<anchor>" -> "<targetFile>#<anchor>"

async function indexAnchors() {
  for (const m of modules) {
    const content = await readFile(join(apiDir, m.file), 'utf8');
    // Find every H2/H3 heading (typedoc uses ### for members)
    for (const match of content.matchAll(/^###?\s+(.+?)\s*$/gm)) {
      const heading = match[1].trim();
      // Strip parentheses from method names like "getAgentsV1()"
      const slug = heading
        .replace(/[()]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      anchorLocation.set(
        `${m.file}#${slug}`,
        `${targetByFile.get(m.file)}#${slug}`,
      );
    }
    // Also explicit <a id="..."></a> anchors
    for (const match of content.matchAll(/<a\s+id="([^"]+)"/g)) {
      anchorLocation.set(
        `${m.file}#${match[1]}`,
        `${targetByFile.get(m.file)}#${match[1]}`,
      );
    }
  }
}

await indexAnchors();

// ---------------------------------------------------- link-rewrite helpers

/**
 * Strip `### XxxSchema` sections (the Zod schema `const` entries) from a
 * page. The response types already document the shape; the schema consts
 * are redundant noise for readers who aren't writing Zod validators.
 *
 * Also drops the "### Type Aliases / ### Variables" group headings left
 * empty after stripping, plus the "***" horizontal rules TypeDoc inserts
 * between entries.
 */
function stripSchemaSections(content) {
  const lines = content.split('\n');
  const out = [];
  let skipping = false;
  for (const line of lines) {
    // Start skipping at any "### XxxSchema" heading
    if (/^###\s+\w+Schemas?\s*$/.test(line)) {
      skipping = true;
      continue;
    }
    // Stop skipping when we hit the next heading at ### or higher
    if (skipping && /^#{1,3}\s+/.test(line)) {
      skipping = false;
    }
    if (skipping) continue;
    out.push(line);
  }
  // Collapse now-orphaned "***" separators and excessive blank runs
  return out
    .join('\n')
    .replace(/(\n\s*\*\*\*\s*\n)+(?=\n*## )/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n');
}

/**
 * Read the endpoint's .ts source and extract the set of type names
 * that appear directly in method return signatures (e.g. `Promise<AgentResponse>`).
 * Any Response type NOT in this set is a sub-type and can be hidden.
 */
async function getReturnedTypes(endpointBase) {
  const srcDir = fileURLToPath(new URL('../../src/endpoints/', import.meta.url));
  try {
    const src = await readFile(join(srcDir, `${endpointBase}.ts`), 'utf8');
    const types = new Set();
    for (const m of src.matchAll(/Promise<(\w+?)(?:\[])?>/g)) {
      types.add(m[1]);
    }
    return types;
  } catch {
    return null; // file not found — skip filtering
  }
}

/**
 * In the merged "types" section (after `## Xxx types`), strip any
 * `### Xxx` entry whose name does NOT appear in a method return
 * signature. These are sub-types (e.g. AbilityResponse, LevelItem)
 * whose fields are already visible inside their parent type's table.
 */
function stripSubTypes(content, keepTypes) {
  if (!keepTypes || keepTypes.size === 0) return content;
  const lines = content.split('\n');
  const out = [];
  let inTypesSection = false;
  let skipping = false;
  for (const line of lines) {
    // Detect entering the merged types section
    if (/^## .+ types\s*$/.test(line)) {
      inTypesSection = true;
      out.push(line);
      continue;
    }
    // Leaving the types section when we hit a non-types H2
    if (/^## /.test(line) && !/types\s*$/.test(line)) {
      inTypesSection = false;
      skipping = false;
    }
    if (inTypesSection) {
      const headingMatch = line.match(/^###\s+(\w+)\s*$/);
      if (headingMatch) {
        if (keepTypes.has(headingMatch[1])) {
          skipping = false;
        } else {
          skipping = true;
          continue;
        }
      } else if (skipping && /^#{1,3}\s+/.test(line)) {
        skipping = false;
      }
    }
    if (skipping) continue;
    out.push(line);
  }
  return out
    .join('\n')
    .replace(/(\n\s*\*\*\*\s*\n)+(?=\n*## )/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n');
}

function rewriteLinks(content, ownTargetFile) {
  // Matches markdown links: [text](target.mdx#anchor) or (target.mdx)
  return content.replace(
    /\]\(([^)\s]+?\.mdx)(#[^)]+)?\)/g,
    (_, file, frag) => {
      const key = `${file}${frag ?? ''}`;
      const mapped = anchorLocation.get(key) ?? key;
      // Separate file + anchor
      const [targetFile, ...rest] = mapped.split('#');
      const anchor = rest.length ? '#' + rest.join('#') : '';
      // If link targets a page that was merged into this one, drop the filename
      if (targetFile === ownTargetFile) {
        return `](${anchor || ''})`;
      }
      // Cross-page link: strip the .mdx extension so Fumadocs/Next can route it
      const base = basename(targetFile, '.mdx');
      return `](./${base}${anchor})`;
    },
  );
}

// ------------------------------------------------------- build merged pages

/** Build the final content for each *target* file. */
const pagesOut = new Map(); // targetFile -> { title, description, body, originalBase }

for (const m of modules) {
  const content = await readFile(join(apiDir, m.file), 'utf8');
  const target = targetByFile.get(m.file);

  // Strip frontmatter + the module-level H1 heading (e.g. "# endpoints/AgentsEndpoints")
  let stripped = content.replace(/^---[\s\S]*?---\s*\n/, '');
  stripped = stripped.replace(/^#\s+[^\n]+\n+/, '');

  if (target === m.file) {
    // This module keeps its own page
    const title = niceName(m.base);
    // Description: first non-heading paragraph inside the module's first class/content block
    let description = '';
    const firstPara = stripped
      .split('\n')
      .find((l) => l.trim() !== '' && !l.startsWith('#') && !l.startsWith('|') && !l.startsWith('```') && !l.startsWith('-') && !l.startsWith('*'));
    if (firstPara) description = firstPara.trim();

    pagesOut.set(target, {
      title,
      description,
      body: stripped,
      originalBase: m.base,
      merges: [],
    });
  }
}

// Append merged-schema content to each target page
for (const [endpointBase, schemas] of mergedSchemas) {
  if (schemas.length === 0) continue;

  // Find endpoint target file by base
  const endpointMod = modules.find(
    (x) => x.kind === 'endpoint' && x.base === endpointBase,
  );
  if (!endpointMod) continue;
  const page = pagesOut.get(endpointMod.file);
  if (!page) continue;

  for (const schema of schemas) {
    const raw = await readFile(join(apiDir, schema.file), 'utf8');
    let stripped = raw.replace(/^---[\s\S]*?---\s*\n/, '');
    stripped = stripped.replace(/^#\s+[^\n]+\n+/, '');
    // Also strip the auto-emitted "## Type Aliases" / "## Variables" headings
    // so they blend into the endpoint page more cleanly.
    page.body +=
      `\n\n---\n\n## ${schema.base.replace(/Schemas?$/, '')} types\n\n` +
      stripped.replace(/^## (Type Aliases|Variables|Functions|Classes|Interfaces)\s*\n+/gm, '');
    page.merges.push(schema.file);
  }
}

// ------------------------------------- write out target files + delete extras

await Promise.all(
  [...pagesOut.entries()].map(async ([file, page]) => {
    // Drop the redundant `### XxxSchema` const entries
    const noSchemas = stripSchemaSections(page.body);
    // Drop sub-type Response entries whose fields are already visible
    // inside their parent type's expanded table
    const returnedTypes = await getReturnedTypes(page.originalBase);
    const trimmed = stripSubTypes(noSchemas, returnedTypes);
    // Rewrite internal links so merged-in schema types resolve correctly
    const body = rewriteLinks(trimmed, file);

    const fm = [
      '---',
      `title: "${escapeYaml(page.title)}"`,
      page.description ? `description: "${escapeYaml(page.description)}"` : null,
      '---',
      '',
    ]
      .filter((l) => l !== null)
      .join('\n');

    await writeFile(join(apiDir, file), fm + body);
  }),
);

// Delete merged schema files
const toDelete = new Set();
for (const page of pagesOut.values()) {
  for (const f of page.merges) toDelete.add(f);
}
await Promise.all(
  [...toDelete].map((f) => unlink(join(apiDir, f))),
);

// -------- Rename files to prettier URLs: "endpoints.AgentsEndpoints.mdx" → "agents.mdx"

const finalRenames = new Map(); // oldFile -> newFile
for (const [file] of pagesOut) {
  const noExt = file.slice(0, -extname(file).length);
  const parts = noExt.split('.');
  const base = parts[parts.length - 1];
  const pretty = slugify(niceName(base)) + '.mdx';
  if (pretty !== file) finalRenames.set(file, pretty);
}

// Build a filename-rewrite map so we can fix cross-page links before renaming
const fileRewrite = new Map(
  [...finalRenames.entries()].map(([oldF, newF]) => [
    oldF.slice(0, -extname(oldF).length),
    newF.slice(0, -extname(newF).length),
  ]),
);

// Patch cross-page links that reference old filenames (./endpoints.AgentsEndpoints)
for (const [oldFile, newFile] of finalRenames) {
  // nothing here yet; we'll rewrite all files after collecting final names
}

// Do the renames
await Promise.all(
  [...finalRenames].map(([oldF, newF]) =>
    rename(join(apiDir, oldF), join(apiDir, newF)),
  ),
);

// Walk every remaining .mdx file and rewrite hrefs to the new filenames
const remaining = (await readdir(apiDir)).filter((f) => f.endsWith('.mdx'));
for (const f of remaining) {
  const full = join(apiDir, f);
  let content = await readFile(full, 'utf8');
  content = content.replace(
    /\]\(\.?\/?([^)#\s]+)(#[^)]+)?\)/g,
    (match, filePart, anchor) => {
      if (!fileRewrite.has(filePart)) return match;
      return `](./${fileRewrite.get(filePart)}${anchor ?? ''})`;
    },
  );
  await writeFile(full, content);
}

// ------------------------------------------------ rewrite curated index.mdx

const indexEntries = [];
for (const m of modules) {
  if (m.kind !== 'endpoint') continue;
  const name = niceName(m.base);
  const slug = slugify(name);
  // Pull the endpoint's JSDoc description we captured above
  const target = pagesOut.get(m.file);
  const desc = target?.description ?? '';
  indexEntries.push({ name, slug, desc });
}
indexEntries.sort((a, b) => a.name.localeCompare(b.name));

const indexContent =
  `---\n` +
  `title: "API Reference"\n` +
  `description: "All endpoints exported by @valpro-labs/valorant-api"\n` +
  `---\n\n` +
  `Every endpoint class, its methods, and the Zod schemas / response ` +
  `types it uses live on a single page — grouped by resource.\n\n` +
  `| Endpoint | Description |\n` +
  `| ------ | ------ |\n` +
  indexEntries
    .map((e) => `| [${e.name}](./${e.slug}) | ${e.desc || '—'} |`)
    .join('\n') +
  `\n\n## Shared\n\n` +
  `- [Core client](./valorant-api) — the \`ValorantApi\` facade class\n` +
  `- [Base](./base) — \`BaseEndpoint\` and \`ValorantApiConfig\`\n` +
  `- [Shared types](./shared-types) — types reused across endpoints\n`;

await writeFile(join(apiDir, 'index.mdx'), indexContent);

// -------------------------------------------------- emit meta.json sidebar

const metaPages = ['index', '---Endpoints---', ...indexEntries.map((e) => e.slug), '---Core---', 'valorant-api', 'base', 'shared-types'];
await writeFile(
  join(apiDir, 'meta.json'),
  JSON.stringify({ title: 'API Reference', pages: metaPages }, null, 2) + '\n',
);

console.log(
  `[post-process] wrote ${pagesOut.size} pages; merged ${toDelete.size} schema pages into their endpoints`,
);
