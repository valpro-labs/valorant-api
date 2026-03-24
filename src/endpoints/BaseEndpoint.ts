import axios from 'axios';

/**
 * Supported locale codes for the Valorant API.
 * Controls the language of localized strings in API responses.
 */
export type ValorantLocale =
  | 'ar-AE' | 'de-DE' | 'en-US' | 'es-ES' | 'es-MX'
  | 'fr-FR' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR'
  | 'pl-PL' | 'pt-BR' | 'ru-RU' | 'th-TH' | 'tr-TR'
  | 'vi-VN' | 'zh-CN' | 'zh-TW';

/**
 * Configuration options for the Valorant API client.
 */
export interface ValorantApiConfig {
  /** The language/locale for API responses. Defaults to `'en-US'`. */
  language?: ValorantLocale;
}

/** @internal */
interface ValorantApiResponse<T> {
  status: string;
  data: T;
}

/**
 * Base class for all Valorant API endpoint classes.
 * Provides shared HTTP request logic and locale configuration.
 */
class BaseEndpoint {
  /** The configured locale for API requests. */
  protected language: ValorantLocale;

  /**
   * @param config - Optional configuration for the API client.
   */
  constructor(config?: ValorantApiConfig) {
    this.language = config?.language || 'en-US';
  }

  /**
   * Sends a GET request to the Valorant API.
   * @typeParam T - The expected shape of the response data.
   * @param endpointUrl - The API endpoint path (e.g. `v1/agents`).
   * @returns The parsed response data.
   */
  public async requestValorantApi<T>(endpointUrl: string): Promise<T> {
    const baseUrl = 'https://valorant-api.com/';

    const url = new URL(endpointUrl, baseUrl);
    url.searchParams.set('language', this.language);

    const result = await axios.get<ValorantApiResponse<T>>(url.toString());

    return result.data.data;
  }
}

export { BaseEndpoint };
