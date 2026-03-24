import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { BundleResponse, BundlesResponse } from '../schemas';

/**
 * Provides access to the Valorant API bundles endpoints.
 */
class BundlesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all store bundles.
   * @returns A list of all store bundles.
   */
  public async getBundlesV1(): Promise<BundlesResponse> {
    return this.requestValorantApi<BundlesResponse>('v1/bundles');
  }

  /**
   * Get a store bundle by UUID.
   * @param uuid - The UUID of the bundle.
   * @returns The bundle matching the given UUID.
   */
  public async getBundleByUuidV1(uuid: string): Promise<BundleResponse> {
    return this.requestValorantApi<BundleResponse>(`v1/bundles/${uuid}`);
  }
}

export { BundlesEndpoints };
