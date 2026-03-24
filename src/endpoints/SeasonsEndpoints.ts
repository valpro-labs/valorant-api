import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { SeasonResponse, SeasonsResponse, CompetitiveSeasonResponse, CompetitiveSeasonsResponse } from '../schemas';

/**
 * Provides access to the Valorant API seasons endpoints.
 */
class SeasonsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all seasons.
   * @returns An array of {@link SeasonResponse} objects.
   */
  public async getSeasonsV1(): Promise<SeasonsResponse> {
    return this.requestValorantApi<SeasonsResponse>('v1/seasons');
  }

  /**
   * Get a season by its UUID.
   * @param uuid - The UUID of the season.
   * @returns The {@link SeasonResponse} matching the given UUID.
   */
  public async getSeasonByUuidV1(uuid: string): Promise<SeasonResponse> {
    return this.requestValorantApi<SeasonResponse>(`v1/seasons/${uuid}`);
  }

  /**
   * Get all competitive seasons.
   * @returns An array of {@link CompetitiveSeasonResponse} objects.
   */
  public async getCompetitiveSeasonsV1(): Promise<CompetitiveSeasonsResponse> {
    return this.requestValorantApi<CompetitiveSeasonsResponse>('v1/seasons/competitive');
  }

  /**
   * Get a competitive season by its UUID.
   * @param uuid - The UUID of the competitive season.
   * @returns The {@link CompetitiveSeasonResponse} matching the given UUID.
   */
  public async getCompetitiveSeasonByUuidV1(uuid: string): Promise<CompetitiveSeasonResponse> {
    return this.requestValorantApi<CompetitiveSeasonResponse>(`v1/seasons/competitive/${uuid}`);
  }
}

export { SeasonsEndpoints };
