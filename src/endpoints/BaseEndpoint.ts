import axios from 'axios';

export type ValorantLocale =
  | 'ar-AE' | 'de-DE' | 'en-US' | 'es-ES' | 'es-MX'
  | 'fr-FR' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR'
  | 'pl-PL' | 'pt-BR' | 'ru-RU' | 'th-TH' | 'tr-TR'
  | 'vi-VN' | 'zh-CN' | 'zh-TW';

export interface ValorantApiConfig {
  language?: ValorantLocale;
}

interface ValorantApiResponse<T> {
  status: string;
  data: T;
}

class BaseEndpoint {
  protected language: ValorantLocale;

  constructor(config?: ValorantApiConfig) {
    this.language = config?.language || 'en-US';
  }

  public async requestValorantApi<T>(endpointUrl: string): Promise<T> {
    const baseUrl = 'https://valorant-api.com/';

    const url = new URL(endpointUrl, baseUrl);
    url.searchParams.set('language', this.language);

    const result = await axios.get<ValorantApiResponse<T>>(url.toString());

    return result.data.data;
  }
}

export { BaseEndpoint };
