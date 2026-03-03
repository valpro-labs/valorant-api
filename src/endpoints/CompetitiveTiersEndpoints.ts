import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { CompetitiveTierSetResponse, CompetitiveTiersResponse } from '../schemas';

class CompetitiveTiersEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getCompetitiveTiersV1(): Promise<CompetitiveTiersResponse> {
    return this.requestValorantApi<CompetitiveTiersResponse>('v1/competitivetiers');
  }

  public async getCompetitiveTiersByUuidV1(uuid: string): Promise<CompetitiveTierSetResponse> {
    return this.requestValorantApi<CompetitiveTierSetResponse>(`v1/competitivetiers/${uuid}`);
  }
}

export { CompetitiveTiersEndpoints };
