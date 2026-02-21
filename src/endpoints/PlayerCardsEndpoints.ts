import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

const PlayerCardSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  isHiddenIfNotOwned: z.boolean(),
  themeUuid: z.string().uuid(),
  displayIcon: z.string(),
  smallArt: z.string(),
  wideArt: z.string(),
  largeArt: z.string(),
  assetPath: z.string(),
});

const PlayerCardsSchema = z.array(PlayerCardSchema);

export type PlayerCardResponse = z.infer<typeof PlayerCardSchema>;
export type PlayerCardsResponse = z.infer<typeof PlayerCardsSchema>;

class PlayerCardsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getPlayerCardsV1(): Promise<PlayerCardsResponse> {
    return this.requestValorantApi<PlayerCardsResponse>('https://valorant-api.com/v1/playercards');
  }

  public async getPlayerCardByUuidV1(uuid: string): Promise<PlayerCardResponse> {
    return this.requestValorantApi<PlayerCardResponse>(`https://valorant-api.com/v1/playercards/${uuid}`);
  }
}

export { PlayerCardsEndpoints };
