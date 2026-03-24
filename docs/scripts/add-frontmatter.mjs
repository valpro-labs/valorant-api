/**
 * Post-processes TypeDoc-generated MDX files to add YAML frontmatter
 * required by Fumadocs (title, description).
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const API_DIR = new URL('../content/docs/api', import.meta.url).pathname;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.name.endsWith('.mdx')) {
      files.push(full);
    }
  }
  return files;
}

function extractTitle(content) {
  // Match the first H1 heading: "# Class: AgentsEndpoints" → "AgentsEndpoints"
  // Also strips prefixes like "Type Alias:", "Variable:", "Interface:", "Function:"
  const match = content.match(/^#\s+(.+)$/m);
  if (!match) return null;
  return match[1]
    .replace(/^(Class|Type Alias|Variable|Interface|Function|Enumeration):\s+/i, '')
    .trim();
}

function extractDescription(content) {
  // Find the first paragraph after the heading (skip "Defined in:" lines)
  const lines = content.split('\n');
  let foundHeading = false;
  for (const line of lines) {
    if (line.startsWith('# ')) {
      foundHeading = true;
      continue;
    }
    if (!foundHeading) continue;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('Defined in:') || trimmed.startsWith('>')) continue;
    if (trimmed.startsWith('#') || trimmed.startsWith('|') || trimmed.startsWith('```')) break;
    // Return first meaningful line as description
    return trimmed.length > 120 ? trimmed.slice(0, 120) + '...' : trimmed;
  }
  return null;
}

async function processFile(filePath) {
  const content = await readFile(filePath, 'utf-8');

  // Skip if already has frontmatter
  if (content.startsWith('---')) return;

  const title = extractTitle(content);
  if (!title) return;

  const description = extractDescription(content);

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    ...(description ? [`description: "${description.replace(/"/g, '\\"')}"`] : []),
    '---',
    '',
  ].join('\n');

  // Remove the H1 heading since Fumadocs renders the title from frontmatter
  const withoutH1 = content.replace(/^#\s+.+\n+/, '');

  await writeFile(filePath, frontmatter + withoutH1);
  console.log(`  ✓ ${relative(API_DIR, filePath)}`);
}

async function main() {
  console.log('Adding frontmatter to TypeDoc output...');
  const files = await walk(API_DIR);
  await Promise.all(files.map(processFile));
  console.log(`Done. Processed ${files.length} files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
