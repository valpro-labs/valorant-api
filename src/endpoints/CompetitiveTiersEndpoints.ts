import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { CompetitiveTierSetResponse, CompetitiveTiersResponse } from '../schemas';

/**
 * Provides access to the Valorant API competitive tiers endpoints.
 */
class CompetitiveTiersEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all competitive tier sets.
   * @returns An array of {@link CompetitiveTierSetResponse} objects.
   */
  public async getCompetitiveTiersV1(): Promise<CompetitiveTiersResponse> {
    return this.requestValorantApi<CompetitiveTiersResponse>('v1/competitivetiers');
  }

  /**
   * Get a competitive tier set by UUID.
   * @param uuid - The UUID of the competitive tier set.
   * @returns The {@link CompetitiveTierSetResponse} matching the given UUID.
   */
  public async getCompetitiveTiersByUuidV1(uuid: string): Promise<CompetitiveTierSetResponse> {
    return this.requestValorantApi<CompetitiveTierSetResponse>(`v1/competitivetiers/${uuid}`);
  }
}

export { CompetitiveTiersEndpoints };
