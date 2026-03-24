import { z } from 'zod';

/** Schema for a single content tier (rarity level). */
export const ContentTierSchema = z.object({
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
/** A single content tier (rarity level). */
export type ContentTierResponse = z.infer<typeof ContentTierSchema>;

/** Schema for a list of content tiers. */
export const ContentTiersSchema = z.array(ContentTierSchema);
/** A list of content tiers. */
export type ContentTiersResponse = z.infer<typeof ContentTiersSchema>;
