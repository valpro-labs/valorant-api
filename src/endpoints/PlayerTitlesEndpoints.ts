import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { PlayerTitleResponse, PlayerTitlesResponse } from '../schemas';

/**
 * Provides access to the Valorant API player titles endpoints.
 */
class PlayerTitlesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all player titles.
   * @returns A list of all player titles.
   */
  public async getPlayerTitlesV1(): Promise<PlayerTitlesResponse> {
    return this.requestValorantApi<PlayerTitlesResponse>('v1/playertitles');
  }

  /**
   * Get a player title by its UUID.
   * @param uuid - The UUID of the player title.
   * @returns The player title matching the given UUID.
   */
  public async getPlayerTitleByUuidV1(uuid: string): Promise<PlayerTitleResponse> {
    return this.requestValorantApi<PlayerTitleResponse>(`v1/playertitles/${uuid}`);
  }
}

export { PlayerTitlesEndpoints };
