import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { ThemeResponse, ThemesResponse } from '../schemas';

/**
 * Provides access to the Valorant API themes endpoints.
 */
class ThemesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all themes.
   * @returns A list of all themes.
   */
  public async getThemesV1(): Promise<ThemesResponse> {
    return this.requestValorantApi<ThemesResponse>('v1/themes');
  }

  /**
   * Get a theme by its UUID.
   * @param uuid - The UUID of the theme.
   * @returns The theme matching the given UUID.
   */
  public async getThemeByUuidV1(uuid: string): Promise<ThemeResponse> {
    return this.requestValorantApi<ThemeResponse>(`v1/themes/${uuid}`);
  }
}

export { ThemesEndpoints };
