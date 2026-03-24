import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { GameModeResponse, GameModesResponse, GameModeEquippableResponse, GameModeEquippablesResponse } from '../schemas';

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

  /**
   * Get all game mode equippables
   * @returns Promise<GameModeEquippablesResponse>
   */
  public async getGameModeEquippablesV1(): Promise<GameModeEquippablesResponse> {
    return this.requestValorantApi<GameModeEquippablesResponse>('v1/gamemodes/equippables');
  }

  /**
   * Get game mode equippable by UUID
   * @param uuid Game mode equippable UUID
   * @returns Promise<GameModeEquippableResponse>
   */
  public async getGameModeEquippableByUuidV1(uuid: string): Promise<GameModeEquippableResponse> {
    return this.requestValorantApi<GameModeEquippableResponse>(`v1/gamemodes/equippables/${uuid}`);
  }
}

export { GameModesEndpoints };
