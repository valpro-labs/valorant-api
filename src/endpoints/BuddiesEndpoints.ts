import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { BuddyResponse, BuddiesResponse, BuddyLevelResponse } from '../schemas';

/**
 * Provides access to the Valorant API buddies (gun charms) endpoints.
 */
class BuddiesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all buddies.
   * @returns An array of {@link BuddyResponse} objects.
   */
  public async getBuddiesV1(): Promise<BuddiesResponse> {
    return this.requestValorantApi<BuddiesResponse>('v1/buddies');
  }

  /**
   * Get a buddy by UUID.
   * @param uuid - The UUID of the buddy.
   * @returns The {@link BuddyResponse} matching the given UUID.
   */
  public async getBuddyByUuidV1(uuid: string): Promise<BuddyResponse> {
    return this.requestValorantApi<BuddyResponse>(`v1/buddies/${uuid}`);
  }

  /**
   * Get a buddy level by UUID.
   * @param uuid - The UUID of the buddy level.
   * @returns The {@link BuddyLevelResponse} matching the given UUID.
   */
  public async getBuddyLevelByUuidV1(uuid: string): Promise<BuddyLevelResponse> {
    return this.requestValorantApi<BuddyLevelResponse>(`v1/buddies/levels/${uuid}`);
  }
}

export { BuddiesEndpoints };
