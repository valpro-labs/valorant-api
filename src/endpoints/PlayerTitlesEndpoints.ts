import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { PlayerTitleResponse, PlayerTitlesResponse } from '../schemas';

class PlayerTitlesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getPlayerTitlesV1(): Promise<PlayerTitlesResponse> {
    return this.requestValorantApi<PlayerTitlesResponse>('v1/playertitles');
  }

  public async getPlayerTitleByUuidV1(uuid: string): Promise<PlayerTitleResponse> {
    return this.requestValorantApi<PlayerTitleResponse>(`v1/playertitles/${uuid}`);
  }
}

export { PlayerTitlesEndpoints };
