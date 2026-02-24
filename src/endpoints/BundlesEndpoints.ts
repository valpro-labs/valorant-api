import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

export const BundleSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  displayNameSubtext: z.string(),
  description: z.string(),
  extraDescription: z.string(),
  promoDescription: z.string(),
  useBackgroundGradient: z.boolean(),
  displayIcon: z.string(),
  displayIcon2: z.string(),
  verticalPromoImage: z.string(),
  assetPath: z.string(),
});

export const BundlesSchema = z.array(BundleSchema);

export type BundleResponse = z.infer<typeof BundleSchema>;
export type BundlesResponse = z.infer<typeof BundlesSchema>;

class BundlesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getBundlesV1(): Promise<BundlesResponse> {
    return this.requestValorantApi<BundlesResponse>('https://valorant-api.com/v1/bundles');
  }

  public async getBundleByUuidV1(uuid: string): Promise<BundleResponse> {
    return this.requestValorantApi<BundleResponse>(`https://valorant-api.com/v1/bundles/${uuid}`);
  }
}

export { BundlesEndpoints };
