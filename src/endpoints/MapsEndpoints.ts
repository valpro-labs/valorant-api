import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { MapResponse, MapsResponse } from '../schemas';

class MapsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getMapsV1(): Promise<MapsResponse> {
    return this.requestValorantApi<MapsResponse>('v1/maps');
  }

  public async getMapByUuidV1(uuid: string): Promise<MapResponse> {
    return this.requestValorantApi<MapResponse>(`v1/maps/${uuid}`);
  }
}

export { MapsEndpoints };
