import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { ThemeResponse, ThemesResponse } from '../schemas';

class ThemesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all themes
   * @returns Promise<ThemesResponse>
   */
  public async getThemesV1(): Promise<ThemesResponse> {
    return this.requestValorantApi<ThemesResponse>('v1/themes');
  }

  /**
   * Get theme by UUID
   * @param uuid Theme UUID
   * @returns Promise<ThemeResponse>
   */
  public async getThemeByUuidV1(uuid: string): Promise<ThemeResponse> {
    return this.requestValorantApi<ThemeResponse>(`v1/themes/${uuid}`);
  }
}

export { ThemesEndpoints };
