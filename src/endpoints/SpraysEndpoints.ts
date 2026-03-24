import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { SprayResponse, SpraysResponse, SprayLevelResponse } from '../schemas';

/**
 * Provides access to the Valorant API sprays endpoints.
 */
class SpraysEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all sprays.
   * @returns An array of {@link SprayResponse} objects.
   */
  public async getSpraysV1(): Promise<SpraysResponse> {
    return this.requestValorantApi<SpraysResponse>('v1/sprays');
  }

  /**
   * Get a spray by its UUID.
   * @param uuid - The UUID of the spray.
   * @returns The {@link SprayResponse} matching the given UUID.
   */
  public async getSprayByUuidV1(uuid: string): Promise<SprayResponse> {
    return this.requestValorantApi<SprayResponse>(`v1/sprays/${uuid}`);
  }

  /**
   * Get a spray level by its UUID.
   * @param uuid - The UUID of the spray level.
   * @returns The {@link SprayLevelResponse} matching the given UUID.
   */
  public async getSprayLevelByUuidV1(uuid: string): Promise<SprayLevelResponse> {
    return this.requestValorantApi<SprayLevelResponse>(`v1/sprays/levels/${uuid}`);
  }
}

export { SpraysEndpoints };
