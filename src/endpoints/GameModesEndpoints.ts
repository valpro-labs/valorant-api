import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { GameModeResponse, GameModesResponse, GameModeEquippableResponse, GameModeEquippablesResponse } from '../schemas';

/**
 * Provides access to the Valorant API game modes endpoints.
 */
class GameModesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all game modes.
   * @returns A list of all game modes.
   */
  public async getGameModesV1(): Promise<GameModesResponse> {
    return this.requestValorantApi<GameModesResponse>('v1/gamemodes');
  }

  /**
   * Get a game mode by its UUID.
   * @param uuid - The UUID of the game mode.
   * @returns The game mode matching the given UUID.
   */
  public async getGameModeByUuidV1(uuid: string): Promise<GameModeResponse> {
    return this.requestValorantApi<GameModeResponse>(`v1/gamemodes/${uuid}`);
  }

  /**
   * Get all game mode equippables.
   * @returns A list of all game mode equippables.
   */
  public async getGameModeEquippablesV1(): Promise<GameModeEquippablesResponse> {
    return this.requestValorantApi<GameModeEquippablesResponse>('v1/gamemodes/equippables');
  }

  /**
   * Get a game mode equippable by its UUID.
   * @param uuid - The UUID of the game mode equippable.
   * @returns The game mode equippable matching the given UUID.
   */
  public async getGameModeEquippableByUuidV1(uuid: string): Promise<GameModeEquippableResponse> {
    return this.requestValorantApi<GameModeEquippableResponse>(`v1/gamemodes/equippables/${uuid}`);
  }
}

export { GameModesEndpoints };
