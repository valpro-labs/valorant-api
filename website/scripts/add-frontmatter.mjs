#!/usr/bin/env node
/**
 * Post-processes TypeDoc markdown output so every MDX file has the
 * frontmatter Fumadocs needs (title + description).
 *
 * Typedoc-plugin-markdown emits files with an H1 at the top, e.g.
 *   # Class: AgentsEndpoints
 *   Provides access to the Valorant API agents endpoints.
 *
 * This script lifts that H1 (and the first paragraph when present)
 * into YAML frontmatter and removes the H1 from the body so Fumadocs
 * doesn't render the title twice.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const apiDir = fileURLToPath(new URL('../content/docs/api/', import.meta.url));

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.name.endsWith('.mdx')) {
      yield full;
    }
  }
}

function escapeYaml(value) {
  return value.replace(/"/g, '\\"');
}

function transform(content, fallbackTitle) {
  if (content.startsWith('---\n')) return content; // already has frontmatter

  const lines = content.split('\n');
  let title = fallbackTitle;
  let description = '';
  const body = [];

  let i = 0;
  if (lines[i]?.startsWith('# ')) {
    title = lines[i].replace(/^#\s+/, '').trim();
    i++;
    while (i < lines.length && lines[i].trim() === '') i++;
    // Take the next non-empty line as description if it's a plain paragraph
    if (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('|') &&
      !lines[i].startsWith('```')
    ) {
      description = lines[i].trim();
      i++;
    }
  }
  body.push(...lines.slice(i));

  const fm = [
    '---',
    `title: "${escapeYaml(title)}"`,
    description ? `description: "${escapeYaml(description)}"` : null,
    '---',
    '',
  ]
    .filter((l) => l !== null)
    .join('\n');

  return fm + body.join('\n');
}

let count = 0;
for await (const file of walk(apiDir)) {
  const raw = await readFile(file, 'utf8');
  const basename = file.split('/').pop().replace(/\.mdx$/, '');
  const out = transform(raw, basename);
  if (out !== raw) {
    await writeFile(file, out);
    count++;
  }
}

console.log(`[frontmatter] wrote ${count} files`);
