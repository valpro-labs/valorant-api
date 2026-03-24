import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { SprayResponse, SpraysResponse, SprayLevelResponse } from '../schemas';

class SpraysEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getSpraysV1(): Promise<SpraysResponse> {
    return this.requestValorantApi<SpraysResponse>('v1/sprays');
  }

  public async getSprayByUuidV1(uuid: string): Promise<SprayResponse> {
    return this.requestValorantApi<SprayResponse>(`v1/sprays/${uuid}`);
  }

  /**
   * Get spray level by UUID
   * @param uuid Spray level UUID
   * @returns Promise<SprayLevelResponse>
   */
  public async getSprayLevelByUuidV1(uuid: string): Promise<SprayLevelResponse> {
    return this.requestValorantApi<SprayLevelResponse>(`v1/sprays/levels/${uuid}`);
  }
}

export { SpraysEndpoints };
