import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

const LevelBorderSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  startingLevel: z.number().int(),
  levelNumber: z.number().int(),
  levelNumberAppearance: z.string(),
  smallPlayerCardAppearance: z.string(),
  assetPath: z.string(),
});

const LevelBordersSchema = z.array(LevelBorderSchema);

export type LevelBorderResponse = z.infer<typeof LevelBorderSchema>;
export type LevelBordersResponse = z.infer<typeof LevelBordersSchema>;

class LevelBordersEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getLevelBordersV1(): Promise<LevelBordersResponse> {
    return this.requestValorantApi<LevelBordersResponse>('https://valorant-api.com/v1/levelborders');
  }

  public async getLevelBorderByUuidV1(uuid: string): Promise<LevelBorderResponse> {
    return this.requestValorantApi<LevelBorderResponse>(`https://valorant-api.com/v1/levelborders/${uuid}`);
  }
}

export { LevelBordersEndpoints };
