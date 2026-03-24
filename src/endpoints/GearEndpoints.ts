import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { GearResponse, GearsResponse } from '../schemas';

/**
 * Provides access to the Valorant API gear endpoints (armor items like shields).
 */
class GearEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all gear.
   * @returns A list of all gear items.
   */
  public async getGearV1(): Promise<GearsResponse> {
    return this.requestValorantApi<GearsResponse>('v1/gear');
  }

  /**
   * Get a gear item by its UUID.
   * @param uuid - The UUID of the gear item.
   * @returns The gear item matching the given UUID.
   */
  public async getGearByUuidV1(uuid: string): Promise<GearResponse> {
    return this.requestValorantApi<GearResponse>(`v1/gear/${uuid}`);
  }
}

export { GearEndpoints };
