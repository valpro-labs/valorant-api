import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';
import { LocalizedStringSchema } from '../schemas/SharedSchemas';

export const FlexSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  displayNameAllCaps: LocalizedStringSchema,
  displayIcon: z.string(),
  assetPath: z.string(),
});

export const FlexsSchema = z.array(FlexSchema);

export type FlexResponse = z.infer<typeof FlexSchema>;
export type FlexsResponse = z.infer<typeof FlexsSchema>;

class FlexEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getFlexV1(): Promise<FlexsResponse> {
    return this.requestValorantApi<FlexsResponse>('https://valorant-api.com/v1/flex');
  }

  public async getFlexByUuidV1(uuid: string): Promise<FlexResponse> {
    return this.requestValorantApi<FlexResponse>(`https://valorant-api.com/v1/flex/${uuid}`);
  }
}

export { FlexEndpoints };
