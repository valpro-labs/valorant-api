import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { VersionResponse } from '../schemas';

/**
 * Provides access to the Valorant API version endpoint.
 */
class VersionEndpoint extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get the current Valorant build version info.
   * @returns The current version information.
   */
  public async getVersionV1(): Promise<VersionResponse> {
    return this.requestValorantApi<VersionResponse>('v1/version');
  }
}

export { VersionEndpoint };
