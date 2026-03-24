import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { GearResponse, GearsResponse } from '../schemas';

class GearEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all gear
   * @returns Promise<GearsResponse>
   */
  public async getGearV1(): Promise<GearsResponse> {
    return this.requestValorantApi<GearsResponse>('v1/gear');
  }

  /**
   * Get gear by UUID
   * @param uuid Gear UUID
   * @returns Promise<GearResponse>
   */
  public async getGearByUuidV1(uuid: string): Promise<GearResponse> {
    return this.requestValorantApi<GearResponse>(`v1/gear/${uuid}`);
  }
}

export { GearEndpoints };
