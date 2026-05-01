import * as fs from 'node:fs';
import * as https from 'node:https';
import * as path from 'node:path';

import {
  GameModeFallbackIds,
  GameModeFallbackQueryableIds,
  type GameModeFallbackData,
} from '../src/GameModeFallback';
import type { ValorantLocale } from '../src/endpoints/BaseEndpoint';

const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'queues.json');
const QUERYABLE_OUTPUT_PATH = path.join(__dirname, '..', 'data', 'queryable-queues.json');
const ICONS_DIR = path.join(__dirname, '..', 'data', 'icons', 'gamemodes');
const ICON_FILENAMES = ['displayicon.png', 'listviewicontall.png'] as const;

const EXTRA_QUEUE_DATA: Record<string, GameModeFallbackData> = {
  all: {
    id: 'all',
    displayName: {
      'ar-AE': 'الكل',
      'de-DE': 'Alle',
      'en-US': 'All',
      'es-ES': 'Todo',
      'es-MX': 'Todo',
      'fr-FR': 'Tous',
      'id-ID': 'Semua',
      'it-IT': 'Tutte',
      'ja-JP': 'すべて',
      'ko-KR': '전체',
      'pl-PL': 'Wszystko',
      'pt-BR': 'Todos',
      'ru-RU': 'Все',
      'th-TH': 'ทั้งหมด',
      'tr-TR': 'Tümü',
      'vi-VN': 'Tất cả',
      'zh-CN': '全部',
      'zh-TW': '全部',
    },
  },
  competitive: {
    id: 'competitive',
    displayName: {
      'ar-AE': 'التنافسي',
      'de-DE': 'Kompetitiv',
      'en-US': 'Competitive',
      'es-ES': 'Competitivo',
      'es-MX': 'Competitivo',
      'fr-FR': 'Compétitif',
      'id-ID': 'Kompetitif',
      'it-IT': 'Competitiva',
      'ja-JP': 'コンペティティブ',
      'ko-KR': '경쟁전',
      'pl-PL': 'Rankingowy',
      'pt-BR': 'Competitivo',
      'ru-RU': 'Соревновательный',
      'th-TH': 'โหมดแข่งขัน',
      'tr-TR': 'Rekabetçi',
      'vi-VN': 'Đấu Hạng',
      'zh-CN': '竞技模式',
      'zh-TW': '競技模式',
    },
  },
  custom: {
    id: 'custom',
    displayName: {
      'ar-AE': 'مخصص',
      'de-DE': 'Benutzerdefiniert',
      'en-US': 'Custom',
      'es-ES': 'Personalizada',
      'es-MX': 'Personalizada',
      'fr-FR': 'Personnalisé',
      'id-ID': 'Kustom',
      'it-IT': 'Personalizzata',
      'ja-JP': 'カスタム',
      'ko-KR': '사용자 설정',
      'pl-PL': 'Niestandardowy',
      'pt-BR': 'Personalizado',
      'ru-RU': 'Пользовательский',
      'th-TH': 'กำหนดเอง',
      'tr-TR': 'Özel',
      'vi-VN': 'Tùy Chỉnh',
      'zh-CN': '自定义',
      'zh-TW': '自訂',
    },
  },
  unknown: {
    id: 'unknown',
    displayName: {
      'ar-AE': 'غير معروف',
      'de-DE': 'Unbekannt',
      'en-US': 'Unknown',
      'es-ES': 'Desconocido',
      'es-MX': 'Desconocido',
      'fr-FR': 'Inconnu',
      'id-ID': 'Tidak diketahui',
      'it-IT': 'Sconosciuto',
      'ja-JP': '不明',
      'ko-KR': '알 수 없음',
      'pl-PL': 'Nieznany',
      'pt-BR': 'Desconhecido',
      'ru-RU': 'Неизвестно',
      'th-TH': 'ไม่ทราบ',
      'tr-TR': 'Bilinmiyor',
      'vi-VN': 'Không xác định',
      'zh-CN': '未知',
      'zh-TW': '未知',
    },
  },
};

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

  const queues = {
    ...EXTRA_QUEUE_DATA,
    ...Object.fromEntries(results) as Record<string, GameModeFallbackData>,
  };
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(queues, null, '\t') + '\n', 'utf8');
  console.log('Written to', OUTPUT_PATH);

  fs.writeFileSync(
    QUERYABLE_OUTPUT_PATH,
    JSON.stringify(GameModeFallbackQueryableIds, null, '\t') + '\n',
    'utf8',
  );
  console.log('Written to', QUERYABLE_OUTPUT_PATH);
}

run().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
