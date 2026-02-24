import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

export const SeasonSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  title: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  startTime: z.string(),
  endTime: z.string(),
  parentUuid: z.string().uuid().optional().nullable(),
  assetPath: z.string(),
});

export const SeasonsSchema = z.array(SeasonSchema);

export type SeasonResponse = z.infer<typeof SeasonSchema>;
export type SeasonsResponse = z.infer<typeof SeasonsSchema>;

class SeasonsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all seasons
   * @returns Promise<SeasonsResponse>
   */
  public async getSeasonsV1(): Promise<SeasonsResponse> {
    return this.requestValorantApi<SeasonsResponse>('https://valorant-api.com/v1/seasons');
  }

  /**
   * Get season by UUID
   * @param uuid Season UUID
   * @returns Promise<SeasonResponse>
   */
  public async getSeasonByUuidV1(uuid: string): Promise<SeasonResponse> {
    return this.requestValorantApi<SeasonResponse>(`https://valorant-api.com/v1/seasons/${uuid}`);
  }
}

export { SeasonsEndpoints };
