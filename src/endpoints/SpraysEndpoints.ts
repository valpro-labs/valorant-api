import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

export const SprayLevelSchema = z.object({
  uuid: z.string().uuid(),
  sprayUuid: z.string().uuid(),
  displayName: z.string(),
  displayIcon: z.string().nullable(),
  assetPath: z.string(),
});
export type SprayLevelResponse = z.infer<typeof SprayLevelSchema>;

export const SpraySchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  category: z.string().nullable(),
  themeUuid: z.string().uuid().nullable(),
  isNull: z.boolean(),
  displayIcon: z.string().nullable(),
  fullIcon: z.string().nullable(),
  fullTransparentIcon: z.string().nullable(),
  animationPng: z.string().nullable(),
  animationGif: z.string().nullable(),
  assetPath: z.string(),
  levels: z.array(SprayLevelSchema),
});

export const SpraysSchema = z.array(SpraySchema);

export type SprayResponse = z.infer<typeof SpraySchema>;
export type SpraysResponse = z.infer<typeof SpraysSchema>;

class SpraysEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getSpraysV1(): Promise<SpraysResponse> {
    return this.requestValorantApi<SpraysResponse>('v1/sprays');
  }

  public async getSprayByUuidV1(uuid: string): Promise<SprayResponse> {
    return this.requestValorantApi<SprayResponse>(`v1/sprays/${uuid}`);
  }
}

export { SpraysEndpoints };
