import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { ContentTierResponse, ContentTiersResponse } from '../schemas';

/**
 * Provides access to the Valorant API content tiers (rarities) endpoints.
 */
class ContentTierEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all content tiers.
   * @returns A list of all content tiers.
   */
  public async getContentTiersV1(): Promise<ContentTiersResponse> {
    return this.requestValorantApi<ContentTiersResponse>('v1/contenttiers');
  }

  /**
   * Get a content tier by UUID.
   * @param uuid - The UUID of the content tier.
   * @returns The content tier matching the given UUID.
   */
  public async getContentTierByUuidV1(uuid: string): Promise<ContentTierResponse> {
    return this.requestValorantApi<ContentTierResponse>(`v1/contenttiers/${uuid}`);
  }
}

export { ContentTierEndpoints };
