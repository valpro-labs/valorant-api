import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

export const PlayerTitleSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  titleText: z.string(),
  isHiddenIfNotOwned: z.boolean(),
  assetPath: z.string(),
});

export const PlayerTitlesSchema = z.array(PlayerTitleSchema);

export type PlayerTitleResponse = z.infer<typeof PlayerTitleSchema>;
export type PlayerTitlesResponse = z.infer<typeof PlayerTitlesSchema>;

class PlayerTitlesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getPlayerTitlesV1(): Promise<PlayerTitlesResponse> {
    return this.requestValorantApi<PlayerTitlesResponse>('https://valorant-api.com/v1/playertitles');
  }

  public async getPlayerTitleByUuidV1(uuid: string): Promise<PlayerTitleResponse> {
    return this.requestValorantApi<PlayerTitleResponse>(`https://valorant-api.com/v1/playertitles/${uuid}`);
  }
}

export { PlayerTitlesEndpoints };
