import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { LevelBorderResponse, LevelBordersResponse } from '../schemas';

class LevelBordersEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getLevelBordersV1(): Promise<LevelBordersResponse> {
    return this.requestValorantApi<LevelBordersResponse>('v1/levelborders');
  }

  public async getLevelBorderByUuidV1(uuid: string): Promise<LevelBorderResponse> {
    return this.requestValorantApi<LevelBorderResponse>(`v1/levelborders/${uuid}`);
  }
}

export { LevelBordersEndpoints };
