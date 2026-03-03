import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { FlexResponse, FlexsResponse } from '../schemas';

class FlexEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getFlexV1(): Promise<FlexsResponse> {
    return this.requestValorantApi<FlexsResponse>('v1/flex');
  }

  public async getFlexByUuidV1(uuid: string): Promise<FlexResponse> {
    return this.requestValorantApi<FlexResponse>(`v1/flex/${uuid}`);
  }
}

export { FlexEndpoints };
