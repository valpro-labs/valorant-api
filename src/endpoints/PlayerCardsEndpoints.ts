import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { PlayerCardResponse, PlayerCardsResponse } from '../schemas';

class PlayerCardsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getPlayerCardsV1(): Promise<PlayerCardsResponse> {
    return this.requestValorantApi<PlayerCardsResponse>('v1/playercards');
  }

  public async getPlayerCardByUuidV1(uuid: string): Promise<PlayerCardResponse> {
    return this.requestValorantApi<PlayerCardResponse>(`v1/playercards/${uuid}`);
  }
}

export { PlayerCardsEndpoints };
