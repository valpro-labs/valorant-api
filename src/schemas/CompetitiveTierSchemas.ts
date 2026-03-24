import { z } from 'zod';

/** Schema for a single competitive tier (rank). */
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
/** A single competitive tier (rank). */
export type TierResponse = z.infer<typeof TierSchema>;

/** Schema for a single competitive tier set. */
export const CompetitiveTierSetSchema = z.object({
  uuid: z.string().uuid(),
  assetObjectName: z.string(),
  tiers: z.array(TierSchema),
  assetPath: z.string(),
});
/** A single competitive tier set. */
export type CompetitiveTierSetResponse = z.infer<typeof CompetitiveTierSetSchema>;

/** Schema for a list of competitive tier sets. */
export const CompetitiveTiersSchema = z.array(CompetitiveTierSetSchema);
/** A list of competitive tier sets. */
export type CompetitiveTiersResponse = z.infer<typeof CompetitiveTiersSchema>;
