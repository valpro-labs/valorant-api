import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

const ContentTierSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  devName: z.string(),
  rank: z.number().int(),
  juiceValue: z.number().int(),
  juiceCost: z.number().int(),
  highlightColor: z.string(),
  displayIcon: z.string().url(),
  assetPath: z.string(),
});

const ContentTiersSchema = z.array(ContentTierSchema);

export type ContentTierResponse = z.infer<typeof ContentTierSchema>;
export type ContentTiersResponse = z.infer<typeof ContentTiersSchema>;

class ContentTierEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getContentTiersV1(): Promise<ContentTiersResponse> {
    return this.requestValorantApi<ContentTiersResponse>('https://valorant-api.com/v1/contenttiers');
  }

  public async getContentTierByUuidV1(uuid: string): Promise<ContentTierResponse> {
    return this.requestValorantApi<ContentTierResponse>(`https://valorant-api.com/v1/contenttiers/${uuid}`);
  }
}

export { ContentTierEndpoints };
