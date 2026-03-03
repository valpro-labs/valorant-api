import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { BundleResponse, BundlesResponse } from '../schemas';

class BundlesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getBundlesV1(): Promise<BundlesResponse> {
    return this.requestValorantApi<BundlesResponse>('v1/bundles');
  }

  public async getBundleByUuidV1(uuid: string): Promise<BundleResponse> {
    return this.requestValorantApi<BundleResponse>(`v1/bundles/${uuid}`);
  }
}

export { BundlesEndpoints };
