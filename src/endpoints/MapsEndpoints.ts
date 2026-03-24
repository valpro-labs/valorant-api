import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { MapResponse, MapsResponse } from '../schemas';

/**
 * Provides access to the Valorant API maps endpoints.
 */
class MapsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all maps.
   * @returns A list of all maps.
   */
  public async getMapsV1(): Promise<MapsResponse> {
    return this.requestValorantApi<MapsResponse>('v1/maps');
  }

  /**
   * Get a map by its UUID.
   * @param uuid - The UUID of the map.
   * @returns The map matching the given UUID.
   */
  public async getMapByUuidV1(uuid: string): Promise<MapResponse> {
    return this.requestValorantApi<MapResponse>(`v1/maps/${uuid}`);
  }
}

export { MapsEndpoints };
