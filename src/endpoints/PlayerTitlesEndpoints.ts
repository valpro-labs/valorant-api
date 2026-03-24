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
   * @returns An array of {@link PlayerTitleResponse} objects.
   */
  public async getPlayerTitlesV1(): Promise<PlayerTitlesResponse> {
    return this.requestValorantApi<PlayerTitlesResponse>('v1/playertitles');
  }

  /**
   * Get a player title by its UUID.
   * @param uuid - The UUID of the player title.
   * @returns The {@link PlayerTitleResponse} matching the given UUID.
   */
  public async getPlayerTitleByUuidV1(uuid: string): Promise<PlayerTitleResponse> {
    return this.requestValorantApi<PlayerTitleResponse>(`v1/playertitles/${uuid}`);
  }
}

export { PlayerTitlesEndpoints };
