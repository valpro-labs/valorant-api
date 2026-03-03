import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { ContentTierResponse, ContentTiersResponse } from '../schemas';

class ContentTierEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getContentTiersV1(): Promise<ContentTiersResponse> {
    return this.requestValorantApi<ContentTiersResponse>('v1/contenttiers');
  }

  public async getContentTierByUuidV1(uuid: string): Promise<ContentTierResponse> {
    return this.requestValorantApi<ContentTierResponse>(`v1/contenttiers/${uuid}`);
  }
}

export { ContentTierEndpoints };
