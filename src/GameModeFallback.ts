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
  | 'skirmishascension2v2'
  | 'skirmishascension1v1'
  | 'ggteam'
  | 'fortcollins'
  | 'dodgeball'
  | 'bot';

export type GameModeFilterId =
  | 'all'
  | 'competitive'
  | 'custom'
  | 'unknown'
  | GameModeFallbackName;

export type GameModeFallbackMap = Record<string, GameModeFallbackData>;

export interface GameModeFallbackData {
  id: string;
  displayName: Record<ValorantLocale, string>;
  iconPath: string | null;
}

export const GameModeFallbackIds: Record<GameModeFallbackName, string> = {
  unrated: '96bd3920-4f36-d026-2b28-c683eb0bcac5',
  swiftplay: '5d0f264b-4ebe-cc63-c147-809e1374484b',
  deathmatch: 'a8790ec5-4237-f2f0-e93b-08a8e89865b2',
  spikerush: 'e921d1e6-416b-c31f-1291-74930c330b7b',
  valaram: '1cd8901f-47af-49cb-d758-e2afd0eb2a39',
  hurm: 'e086db66-47fd-e791-ca81-06a645ac7661',
  skirmish2v2: '0e9805d8-4af6-5ffb-f467-55806a6bc484',
  skirmishascension2v2: 'd08c45fe-4415-edcf-65a3-45885cc4349b',
  skirmishascension1v1: 'd08c45fe-4415-edcf-65a3-45885cc4349b',
  ggteam: 'a4ed6518-4741-6dcb-35bd-f884aecdc859',
  fortcollins: '75b7b658-472c-0264-cbe6-049abf14f54b',
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
  'fortcollins',
  'valaram',
  'skirmish2v2',
  'skirmishascension2v2',
  'skirmishascension1v1',
  'dodgeball',
  'custom',
];

export const GAME_MODE_FALLBACK_BASE_URL =
  'https://cdn.valprolabs.com/data';
export const GAME_MODE_FALLBACK_URL =
  `${GAME_MODE_FALLBACK_BASE_URL}/queues.json`;
export const GAME_MODE_FALLBACK_ICON_BASE_URL =
  `${GAME_MODE_FALLBACK_BASE_URL}/icons/gamemodes`;
export const GAME_MODE_FALLBACK_QUERYABLE_IDS_URL =
  `${GAME_MODE_FALLBACK_BASE_URL}/queryable-queues.json`;

export let gameModeFallbacks = {} as GameModeFallbackMap;
export let gameModeQueryableIds: GameModeFilterId[] = [];

export interface ResolvedGameModeFallback {
  id: string;
  displayName: string | null;
  iconUrl: string | null;
}

const gameModeFallbackIdToName: Record<string, GameModeFallbackName> = Object.fromEntries(
  Object.entries(GameModeFallbackIds).map(([name, id]) => [id, name as GameModeFallbackName]),
) as Record<string, GameModeFallbackName>;

export async function fetchAndCacheGameModeData(): Promise<void> {
  const [fallbacksResponse, queryableIdsResponse] = await Promise.all([
    axios.get<GameModeFallbackMap>(GAME_MODE_FALLBACK_URL),
    axios.get<GameModeFilterId[]>(GAME_MODE_FALLBACK_QUERYABLE_IDS_URL),
  ]);
  gameModeFallbacks = fallbacksResponse.data;
  gameModeQueryableIds = queryableIdsResponse.data;
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
  const fallbackKey = queueId in gameModeFallbacks
    ? queueId
    : name ?? 'unknown';
  const data = gameModeFallbacks[fallbackKey] ?? null;

  return {
    id,
    displayName: data?.displayName[locale] ?? data?.displayName['en-US'] ?? null,
    iconUrl: data?.iconPath != null ? `${GAME_MODE_FALLBACK_ICON_BASE_URL}/${data.iconPath}` : null,
  };
}

export const GameModeFallback = {
  ids: GameModeFallbackIds,
  queryableIds: GameModeFallbackQueryableIds,
  baseUrl: GAME_MODE_FALLBACK_BASE_URL,
  url: GAME_MODE_FALLBACK_URL,
  iconBaseUrl: GAME_MODE_FALLBACK_ICON_BASE_URL,
  queryableIdsUrl: GAME_MODE_FALLBACK_QUERYABLE_IDS_URL,
  get fallbacksData() {
    return gameModeFallbacks;
  },
  get queryableIdsData() {
    return gameModeQueryableIds;
  },
  init: fetchAndCacheGameModeData,
  resolve: resolveGameModeFallback,
};
