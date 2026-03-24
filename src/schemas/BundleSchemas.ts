import { z } from 'zod';

/** Schema for a single store bundle. */
export const BundleSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  displayNameSubText: z.string(),
  description: z.string(),
  extraDescription: z.string(),
  promoDescription: z.string(),
  useBackgroundGradient: z.boolean(),
  displayIcon: z.string(),
  displayIcon2: z.string(),
  verticalPromoImage: z.string(),
  assetPath: z.string(),
});
/** A single store bundle. */
export type BundleResponse = z.infer<typeof BundleSchema>;

/** Schema for a list of store bundles. */
export const BundlesSchema = z.array(BundleSchema);
/** A list of store bundles. */
export type BundlesResponse = z.infer<typeof BundlesSchema>;
