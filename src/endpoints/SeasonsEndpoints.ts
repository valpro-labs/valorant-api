import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { SeasonResponse, SeasonsResponse, CompetitiveSeasonResponse, CompetitiveSeasonsResponse } from '../schemas';

class SeasonsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all seasons
   * @returns Promise<SeasonsResponse>
   */
  public async getSeasonsV1(): Promise<SeasonsResponse> {
    return this.requestValorantApi<SeasonsResponse>('v1/seasons');
  }

  /**
   * Get season by UUID
   * @param uuid Season UUID
   * @returns Promise<SeasonResponse>
   */
  public async getSeasonByUuidV1(uuid: string): Promise<SeasonResponse> {
    return this.requestValorantApi<SeasonResponse>(`v1/seasons/${uuid}`);
  }

  /**
   * Get all competitive seasons
   * @returns Promise<CompetitiveSeasonsResponse>
   */
  public async getCompetitiveSeasonsV1(): Promise<CompetitiveSeasonsResponse> {
    return this.requestValorantApi<CompetitiveSeasonsResponse>('v1/seasons/competitive');
  }

  /**
   * Get competitive season by UUID
   * @param uuid Competitive Season UUID
   * @returns Promise<CompetitiveSeasonResponse>
   */
  public async getCompetitiveSeasonByUuidV1(uuid: string): Promise<CompetitiveSeasonResponse> {
    return this.requestValorantApi<CompetitiveSeasonResponse>(`v1/seasons/competitive/${uuid}`);
  }
}

export { SeasonsEndpoints };
