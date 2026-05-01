import axios from 'axios';

import type { ValorantLocale } from './endpoints/BaseEndpoint';

export type GameModeFallbackName =
  | 'unrated'
  | 'swiftplay'
  | 'deathmatch'
  | 'spikerush'
  | 'valaram'
  | 'hurm'
  | 'skirmish2v2'
  | 'ggteam'
  | 'dodgeball'
  | 'bot';

export type GameModeFallbackMap = Record<string, GameModeFallbackData>;

export interface GameModeFallbackData {
  id: string;
  displayName: Record<ValorantLocale, string>;
}

export const GameModeFallbackIds: Record<GameModeFallbackName, string> = {
  unrated: '96bd3920-4f36-d026-2b28-c683eb0bcac5',
  swiftplay: '5d0f264b-4ebe-cc63-c147-809e1374484b',
  deathmatch: 'a8790ec5-4237-f2f0-e93b-08a8e89865b2',
  spikerush: 'e921d1e6-416b-c31f-1291-74930c330b7b',
  valaram: '1cd8901f-47af-49cb-d758-e2afd0eb2a39',
  hurm: 'e086db66-47fd-e791-ca81-06a645ac7661',
  skirmish2v2: '0e9805d8-4af6-5ffb-f467-55806a6bc484',
  ggteam: 'a4ed6518-4741-6dcb-35bd-f884aecdc859',
  dodgeball: '1a4a3fd5-4966-62cb-7fe4-15b0317f5c80',
  bot: 'd2d0f229-4514-517a-b10a-aaa0ef0d4a67',
};

export const GAME_MODE_FALLBACK_URL =
  'https://raw.githubusercontent.com/valpro-labs/valorant-api/main/data/queues.json';

export let gameModeFallbacks = {} as GameModeFallbackMap;

const gameModeFallbackIdToName: Record<string, GameModeFallbackName> = Object.fromEntries(
  Object.entries(GameModeFallbackIds).map(([name, id]) => [id, name as GameModeFallbackName]),
) as Record<string, GameModeFallbackName>;

export async function initGameModeFallback(): Promise<void> {
  const response = await axios.get<GameModeFallbackMap>(GAME_MODE_FALLBACK_URL);
  gameModeFallbacks = response.data;
}

function resolveGameModeFallbackName(queueId: string): GameModeFallbackName | undefined {
  if (queueId in GameModeFallbackIds) {
    return queueId as GameModeFallbackName;
  }

  return gameModeFallbackIdToName[queueId];
}

export function getGameModeFallbackData(queueId: string): GameModeFallbackData | null {
  const name = resolveGameModeFallbackName(queueId);
  return name ? gameModeFallbacks[name] ?? null : null;
}

export function getGameModeFallbackDisplayName(
  queueId: string,
  locale: ValorantLocale = 'en-US',
): string | null {
  const data = getGameModeFallbackData(queueId);
  if (!data) {
    return null;
  }

  return data.displayName[locale] ?? data.displayName['en-US'] ?? null;
}

export function getGameModeFallbackIconUrl(queueId: string): string {
  const id = queueId in GameModeFallbackIds
    ? GameModeFallbackIds[queueId as GameModeFallbackName]
    : queueId;

  return `https://media.valorant-api.com/gamemodes/${id}/displayicon.png`;
}

export const GameModeFallback = {
  ids: GameModeFallbackIds,
  url: GAME_MODE_FALLBACK_URL,
  get data() {
    return gameModeFallbacks;
  },
  init: initGameModeFallback,
  getData: getGameModeFallbackData,
  getDisplayName: getGameModeFallbackDisplayName,
  getIconUrl: getGameModeFallbackIconUrl,
};
