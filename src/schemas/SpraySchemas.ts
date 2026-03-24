import { z } from 'zod';

/** Schema for a single spray level. */
export const SprayLevelSchema = z.object({
  uuid: z.string().uuid(),
  sprayUuid: z.string().uuid(),
  displayName: z.string(),
  displayIcon: z.string().nullable(),
  assetPath: z.string(),
});
/** A single spray level's data. */
export type SprayLevelResponse = z.infer<typeof SprayLevelSchema>;

/** Schema for a single spray. */
export const SpraySchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  category: z.string().nullable(),
  themeUuid: z.string().uuid().nullable(),
  isNull: z.boolean(),
  displayIcon: z.string().nullable(),
  fullIcon: z.string().nullable(),
  fullTransparentIcon: z.string().nullable(),
  animationPng: z.string().nullable(),
  animationGif: z.string().nullable(),
  assetPath: z.string(),
  levels: z.array(SprayLevelSchema),
});
/** A single spray's data. */
export type SprayResponse = z.infer<typeof SpraySchema>;

/** Schema for a list of sprays. */
export const SpraysSchema = z.array(SpraySchema);
/** A list of sprays. */
export type SpraysResponse = z.infer<typeof SpraysSchema>;
