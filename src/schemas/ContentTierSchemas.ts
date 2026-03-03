import { z } from 'zod';

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
export type ContentTierResponse = z.infer<typeof ContentTierSchema>;

export const ContentTiersSchema = z.array(ContentTierSchema);
export type ContentTiersResponse = z.infer<typeof ContentTiersSchema>;
