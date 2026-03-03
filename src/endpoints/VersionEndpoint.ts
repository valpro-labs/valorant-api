import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { VersionResponse } from '../schemas';

class VersionEndpoint extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getVersionV1(): Promise<VersionResponse> {
    return this.requestValorantApi<VersionResponse>('v1/version');
  }
}

export { VersionEndpoint };
