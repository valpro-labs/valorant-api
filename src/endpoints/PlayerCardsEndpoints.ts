import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { PlayerCardResponse, PlayerCardsResponse } from '../schemas';

/**
 * Provides access to the Valorant API player cards endpoints.
 */
class PlayerCardsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all player cards.
   * @returns A list of all player cards.
   */
  public async getPlayerCardsV1(): Promise<PlayerCardsResponse> {
    return this.requestValorantApi<PlayerCardsResponse>('v1/playercards');
  }

  /**
   * Get a player card by its UUID.
   * @param uuid - The UUID of the player card.
   * @returns The player card matching the given UUID.
   */
  public async getPlayerCardByUuidV1(uuid: string): Promise<PlayerCardResponse> {
    return this.requestValorantApi<PlayerCardResponse>(`v1/playercards/${uuid}`);
  }
}

export { PlayerCardsEndpoints };
