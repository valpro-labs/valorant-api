import { z } from 'zod';

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
export type TierResponse = z.infer<typeof TierSchema>;

export const CompetitiveTierSetSchema = z.object({
  uuid: z.string().uuid(),
  assetObjectName: z.string(),
  tiers: z.array(TierSchema),
  assetPath: z.string(),
});
export type CompetitiveTierSetResponse = z.infer<typeof CompetitiveTierSetSchema>;

export const CompetitiveTiersSchema = z.array(CompetitiveTierSetSchema);
export type CompetitiveTiersResponse = z.infer<typeof CompetitiveTiersSchema>;
