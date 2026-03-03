import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { BuddyResponse, BuddiesResponse, BuddyLevelResponse } from '../schemas';

class BuddiesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getBuddiesV1(): Promise<BuddiesResponse> {
    return this.requestValorantApi<BuddiesResponse>('v1/buddies');
  }

  public async getBuddyByUuidV1(uuid: string): Promise<BuddyResponse> {
    return this.requestValorantApi<BuddyResponse>(`v1/buddies/${uuid}`);
  }

  public async getBuddyLevelByUuidV1(uuid: string): Promise<BuddyLevelResponse> {
    return this.requestValorantApi<BuddyLevelResponse>(`v1/buddies/levels/${uuid}`);
  }
}

export { BuddiesEndpoints };
