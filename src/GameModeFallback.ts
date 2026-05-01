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

export type GameModeFilterId =
  | 'all'
  | 'competitive'
  | 'custom'
  | GameModeFallbackName;

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

export const GameModeFallbackQueryableIds: GameModeFilterId[] = [
  'all',
  'unrated',
  'competitive',
  'swiftplay',
  'deathmatch',
  'hurm',
  'spikerush',
  'ggteam',
  'valaram',
  'skirmish2v2',
  'dodgeball',
  'custom',
];

export const GAME_MODE_FALLBACK_BASE_URL =
  'https://raw.githubusercontent.com/valpro-labs/valorant-api/main/data';
export const GAME_MODE_FALLBACK_URL =
  `${GAME_MODE_FALLBACK_BASE_URL}/queues.json`;
export const GAME_MODE_FALLBACK_ICON_BASE_URL =
  `${GAME_MODE_FALLBACK_BASE_URL}/icons/gamemodes`;
export const GAME_MODE_FALLBACK_QUERYABLE_IDS_URL =
  `${GAME_MODE_FALLBACK_BASE_URL}/queryable-queues.json`;

export let gameModeFallbacks = {} as GameModeFallbackMap;

export interface ResolvedGameModeFallback {
  id: string;
  displayName: string | null;
  iconUrl: string;
}

const gameModeFallbackIdToName: Record<string, GameModeFallbackName> = Object.fromEntries(
  Object.entries(GameModeFallbackIds).map(([name, id]) => [id, name as GameModeFallbackName]),
) as Record<string, GameModeFallbackName>;

export async function initGameModeFallback(): Promise<void> {
  const response = await axios.get<GameModeFallbackMap>(GAME_MODE_FALLBACK_URL);
  gameModeFallbacks = response.data;
}

export function resolveGameModeFallback(
  queueId: string,
  locale: ValorantLocale = 'en-US',
): ResolvedGameModeFallback {
  const id = queueId in GameModeFallbackIds
    ? GameModeFallbackIds[queueId as GameModeFallbackName]
    : queueId;
  const name = queueId in GameModeFallbackIds
    ? queueId as GameModeFallbackName
    : gameModeFallbackIdToName[queueId];
  const data = name ? gameModeFallbacks[name] ?? null : null;

  return {
    id,
    displayName: data?.displayName[locale] ?? data?.displayName['en-US'] ?? null,
    iconUrl: `${GAME_MODE_FALLBACK_ICON_BASE_URL}/${id}/displayicon.png`,
  };
}

export const GameModeFallback = {
  ids: GameModeFallbackIds,
  queryableIds: GameModeFallbackQueryableIds,
  baseUrl: GAME_MODE_FALLBACK_BASE_URL,
  url: GAME_MODE_FALLBACK_URL,
  iconBaseUrl: GAME_MODE_FALLBACK_ICON_BASE_URL,
  queryableIdsUrl: GAME_MODE_FALLBACK_QUERYABLE_IDS_URL,
  get data() {
    return gameModeFallbacks;
  },
  init: initGameModeFallback,
  resolve: resolveGameModeFallback,
};
