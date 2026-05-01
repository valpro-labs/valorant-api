import axios from 'axios';

import {
  GAME_MODE_FALLBACK_URL,
  GameModeFallback,
  GameModeFallbackIds,
  gameModeFallbacks,
  getGameModeFallbackData,
  getGameModeFallbackDisplayName,
  getGameModeFallbackIconUrl,
  initGameModeFallback,
} from '../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockFallbackPayload = {
  swiftplay: {
    id: '5d0f264b-4ebe-cc63-c147-809e1374484b',
    displayName: {
      'ar-AE': 'swiftplay-ar',
      'de-DE': 'swiftplay-de',
      'en-US': 'Swiftplay',
      'es-ES': 'swiftplay-es-es',
      'es-MX': 'swiftplay-es-mx',
      'fr-FR': 'swiftplay-fr',
      'id-ID': 'swiftplay-id',
      'it-IT': 'swiftplay-it',
      'ja-JP': 'swiftplay-ja',
      'ko-KR': 'swiftplay-ko',
      'pl-PL': 'swiftplay-pl',
      'pt-BR': 'swiftplay-pt',
      'ru-RU': 'swiftplay-ru',
      'th-TH': 'swiftplay-th',
      'tr-TR': 'swiftplay-tr',
      'vi-VN': 'swiftplay-vi',
      'zh-CN': 'swiftplay-zh-cn',
      'zh-TW': '超速衝點',
    },
  },
  hurm: {
    id: 'e086db66-47fd-e791-ca81-06a645ac7661',
    displayName: {
      'ar-AE': 'hurm-ar',
      'de-DE': 'hurm-de',
      'en-US': 'Team Deathmatch',
      'es-ES': 'hurm-es-es',
      'es-MX': 'hurm-es-mx',
      'fr-FR': 'hurm-fr',
      'id-ID': 'hurm-id',
      'it-IT': 'hurm-it',
      'ja-JP': 'hurm-ja',
      'ko-KR': 'hurm-ko',
      'pl-PL': 'hurm-pl',
      'pt-BR': 'hurm-pt',
      'ru-RU': 'hurm-ru',
      'th-TH': 'hurm-th',
      'tr-TR': 'hurm-tr',
      'vi-VN': 'hurm-vi',
      'zh-CN': 'hurm-zh-cn',
      'zh-TW': '團隊死鬥模式',
    },
  },
  ggteam: {
    id: 'a4ed6518-4741-6dcb-35bd-f884aecdc859',
    displayName: {
      'ar-AE': 'ggteam-ar',
      'de-DE': 'ggteam-de',
      'en-US': 'Escalation',
      'es-ES': 'ggteam-es-es',
      'es-MX': 'ggteam-es-mx',
      'fr-FR': 'ggteam-fr',
      'id-ID': 'ggteam-id',
      'it-IT': 'ggteam-it',
      'ja-JP': 'ggteam-ja',
      'ko-KR': 'ggteam-ko',
      'pl-PL': 'ggteam-pl',
      'pt-BR': 'ggteam-pt',
      'ru-RU': 'ggteam-ru',
      'th-TH': 'ggteam-th',
      'tr-TR': 'ggteam-tr',
      'vi-VN': 'ggteam-vi',
      'zh-CN': 'ggteam-zh-cn',
      'zh-TW': '超激進戰',
    },
  },
};

describe('GameModeFallback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads fallback data from GitHub json', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockFallbackPayload } as never);

    await initGameModeFallback();

    expect(mockedAxios.get).toHaveBeenCalledWith(GAME_MODE_FALLBACK_URL);
    expect(GameModeFallback.data.swiftplay).toEqual(mockFallbackPayload.swiftplay);
  });

  it('resolves display names from queue aliases', () => {
    mockedAxios.get.mockResolvedValue({ data: mockFallbackPayload } as never);

    return initGameModeFallback().then(() => {
      expect(getGameModeFallbackDisplayName('swiftplay', 'zh-TW')).toBe('超速衝點');
    });
  });

  it('resolves display names from queue uuids', () => {
    mockedAxios.get.mockResolvedValue({ data: mockFallbackPayload } as never);

    return initGameModeFallback().then(() => {
      expect(getGameModeFallbackDisplayName(GameModeFallbackIds.hurm, 'en-US')).toBe('Team Deathmatch');
    });
  });

  it('returns fallback data objects', () => {
    mockedAxios.get.mockResolvedValue({ data: mockFallbackPayload } as never);

    return initGameModeFallback().then(() => {
      expect(getGameModeFallbackData('ggteam')).toEqual(GameModeFallback.data.ggteam);
    });
  });

  it('returns null for unknown queue ids', () => {
    expect(getGameModeFallbackData('unknown-mode')).toBeNull();
    expect(getGameModeFallbackDisplayName('unknown-mode')).toBeNull();
  });

  it('builds display icon urls', () => {
    expect(getGameModeFallbackIconUrl('swiftplay')).toBe(
      'https://media.valorant-api.com/gamemodes/5d0f264b-4ebe-cc63-c147-809e1374484b/displayicon.png',
    );
  });
});
