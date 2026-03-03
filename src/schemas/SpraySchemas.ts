import { z } from 'zod';

export const SprayLevelSchema = z.object({
  uuid: z.string().uuid(),
  sprayUuid: z.string().uuid(),
  displayName: z.string(),
  displayIcon: z.string().nullable(),
  assetPath: z.string(),
});
export type SprayLevelResponse = z.infer<typeof SprayLevelSchema>;

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
export type SprayResponse = z.infer<typeof SpraySchema>;

export const SpraysSchema = z.array(SpraySchema);
export type SpraysResponse = z.infer<typeof SpraysSchema>;
