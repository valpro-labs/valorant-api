import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { SprayResponse, SpraysResponse } from '../schemas';

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
}

export { SpraysEndpoints };
