import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { GameModeResponse, GameModesResponse } from '../schemas';

class GameModesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getGameModesV1(): Promise<GameModesResponse> {
    return this.requestValorantApi<GameModesResponse>('v1/gamemodes');
  }

  public async getGameModeByUuidV1(uuid: string): Promise<GameModeResponse> {
    return this.requestValorantApi<GameModeResponse>(`v1/gamemodes/${uuid}`);
  }
}

export { GameModesEndpoints };
