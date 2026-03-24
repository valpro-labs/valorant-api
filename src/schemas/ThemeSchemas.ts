import { z } from 'zod';

export const ThemeSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  displayIcon: z.string().nullable(),
  storeFeaturedImage: z.string().nullable(),
  assetPath: z.string(),
});
export type ThemeResponse = z.infer<typeof ThemeSchema>;

export const ThemesSchema = z.array(ThemeSchema);
export type ThemesResponse = z.infer<typeof ThemesSchema>;
