import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { SeasonResponse, SeasonsResponse } from '../schemas';

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
}

export { SeasonsEndpoints };
