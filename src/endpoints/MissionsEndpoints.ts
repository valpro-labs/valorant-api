import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { MissionResponse, MissionsResponse } from '../schemas';

class MissionsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getMissionsV1(): Promise<MissionsResponse> {
    return this.requestValorantApi<MissionsResponse>('v1/missions');
  }

  public async getMissionByUuidV1(uuid: string): Promise<MissionResponse> {
    return this.requestValorantApi<MissionResponse>(`v1/missions/${uuid}`);
  }
}

export { MissionsEndpoints };
