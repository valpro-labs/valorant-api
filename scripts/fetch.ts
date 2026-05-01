import * as fs from 'node:fs';
import * as https from 'node:https';
import * as path from 'node:path';

import {
  GameModeFallbackIds,
  type GameModeFallbackData,
} from '../src/GameModeFallback';
import type { ValorantLocale } from '../src/endpoints/BaseEndpoint';

const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'queues.json');
const ICONS_DIR = path.join(__dirname, '..', 'data', 'icons', 'gamemodes');
const ICON_FILENAMES = ['displayicon.png', 'listviewicontall.png'] as const;

function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
        res.resume();
        reject(new Error(`Request failed: ${res.statusCode ?? 'unknown'} ${url}`));
        return;
      }

      let data = '';
      res.on('data', (chunk: string) => {
        data += chunk;
      });
      res.on('end', () => resolve(JSON.parse(data) as T));
    }).on('error', reject);
  });
}

function downloadFile(url: string, dest: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        resolve(false);
        return;
      }

      const file = fs.createWriteStream(dest);
      res.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve(true);
      });

      file.on('error', (err) => {
        file.close();
        reject(err);
      });
    }).on('error', reject);
  });
}

async function run(): Promise<void> {
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.mkdirSync(ICONS_DIR, { recursive: true });

  const results = await Promise.all(
    Object.entries(GameModeFallbackIds).map(async ([name, id]) => {
      const { data } = await fetchJson<{ data: { displayName: Record<ValorantLocale, string> } }>(
        `https://valorant-api.com/v1/gamemodes/${id}?language=all`,
      );
      console.log(`Fetched ${name}`);

      const iconDir = path.join(ICONS_DIR, id);
      fs.mkdirSync(iconDir, { recursive: true });

      for (const filename of ICON_FILENAMES) {
        const ok = await downloadFile(
          `https://media.valorant-api.com/gamemodes/${id}/${filename}`,
          path.join(iconDir, filename),
        );

        if (ok) {
          console.log(`Downloaded ${name}/${filename}`);
        } else {
          console.warn(`Skipped ${name}/${filename}`);
        }
      }

      const entry: GameModeFallbackData = { id, displayName: data.displayName };
      return [name, entry] as [string, GameModeFallbackData];
    }),
  );

  const queues = Object.fromEntries(results) as Record<string, GameModeFallbackData>;
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(queues, null, '\t') + '\n', 'utf8');
  console.log('Written to', OUTPUT_PATH);
}

run().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
