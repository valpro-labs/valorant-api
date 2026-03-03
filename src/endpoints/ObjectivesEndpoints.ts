import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { ObjectiveResponse, ObjectivesResponse } from '../schemas';

class ObjectivesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getObjectivesV1(): Promise<ObjectivesResponse> {
    return this.requestValorantApi<ObjectivesResponse>('v1/objectives');
  }

  public async getObjectiveByUuidV1(uuid: string): Promise<ObjectiveResponse> {
    return this.requestValorantApi<ObjectiveResponse>(`v1/objectives/${uuid}`);
  }
}

export { ObjectivesEndpoints };
