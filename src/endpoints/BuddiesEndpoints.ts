import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

const BuddyLevelSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  displayIcon: z.string(),
  assetPath: z.string(),
});

const BuddySchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  isHiddenIfNotOwned: z.boolean(),
  themeUuid: z.string().uuid().nullable(),
  displayIcon: z.string(),
  assetPath: z.string(),
  levels: z.array(BuddyLevelSchema),
});

const BuddiesSchema = z.array(BuddySchema);
const BuddyLevelsSchema = z.array(BuddyLevelSchema);

export type BuddyResponse = z.infer<typeof BuddySchema>;
export type BuddiesResponse = z.infer<typeof BuddiesSchema>;
export type BuddyLevelResponse = z.infer<typeof BuddyLevelSchema>;
export type BuddyLevelsResponse = z.infer<typeof BuddyLevelsSchema>;

class BuddiesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getBuddiesV1(): Promise<BuddiesResponse> {
    return this.requestValorantApi<BuddiesResponse>('https://valorant-api.com/v1/buddies');
  }

  public async getBuddyByUuidV1(uuid: string): Promise<BuddyResponse> {
    return this.requestValorantApi<BuddyResponse>(`https://valorant-api.com/v1/buddies/${uuid}`);
  }

  public async getBuddyLevelByUuidV1(uuid: string): Promise<BuddyLevelResponse> {
    return this.requestValorantApi<BuddyLevelResponse>(`https://valorant-api.com/v1/buddies/levels/${uuid}`);
  }
}

export { BuddiesEndpoints };
