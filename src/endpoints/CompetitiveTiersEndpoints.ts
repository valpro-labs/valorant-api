import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

export const TierSchema = z.object({
  tier: z.number().int(),
  tierName: z.string(),
  division: z.string(),
  divisionName: z.string(),
  color: z.string(),
  backgroundColor: z.string(),
  smallIcon: z.string().nullable(),
  largeIcon: z.string().nullable(),
  rankTriangleDownIcon: z.string().nullable(),
  rankTriangleUpIcon: z.string().nullable(),
});

export const CompetitiveTierSetSchema = z.object({
  uuid: z.string().uuid(),
  assetObjectName: z.string(),
  tiers: z.array(TierSchema),
  assetPath: z.string(),
});

export const CompetitiveTiersSchema = z.array(CompetitiveTierSetSchema);

export type TierResponse = z.infer<typeof TierSchema>;
export type CompetitiveTierSetResponse = z.infer<typeof CompetitiveTierSetSchema>;
export type CompetitiveTiersResponse = z.infer<typeof CompetitiveTiersSchema>;

class CompetitiveTiersEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getCompetitiveTiersV1(): Promise<CompetitiveTiersResponse> {
    return this.requestValorantApi<CompetitiveTiersResponse>('v1/competitivetiers');
  }

  public async getCompetitiveTiersByUuidV1(uuid: string): Promise<CompetitiveTierSetResponse> {
    return this.requestValorantApi<CompetitiveTierSetResponse>(`v1/competitivetiers/${uuid}`);
  }
}

export { CompetitiveTiersEndpoints };
