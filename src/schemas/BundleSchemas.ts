import { z } from 'zod';

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
export type BundleResponse = z.infer<typeof BundleSchema>;

export const BundlesSchema = z.array(BundleSchema);
export type BundlesResponse = z.infer<typeof BundlesSchema>;
