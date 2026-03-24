import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { LevelBorderResponse, LevelBordersResponse } from '../schemas';

/**
 * Provides access to the Valorant API level borders endpoints.
 */
class LevelBordersEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all level borders.
   * @returns A list of all level borders.
   */
  public async getLevelBordersV1(): Promise<LevelBordersResponse> {
    return this.requestValorantApi<LevelBordersResponse>('v1/levelborders');
  }

  /**
   * Get a level border by its UUID.
   * @param uuid - The UUID of the level border.
   * @returns The level border matching the given UUID.
   */
  public async getLevelBorderByUuidV1(uuid: string): Promise<LevelBorderResponse> {
    return this.requestValorantApi<LevelBorderResponse>(`v1/levelborders/${uuid}`);
  }
}

export { LevelBordersEndpoints };
