import { z } from 'zod';

/** Schema for a single theme. */
export const ThemeSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  displayIcon: z.string().nullable(),
  storeFeaturedImage: z.string().nullable(),
  assetPath: z.string(),
});
/** A single theme's data. */
export type ThemeResponse = z.infer<typeof ThemeSchema>;

/** Schema for a list of themes. */
export const ThemesSchema = z.array(ThemeSchema);
/** A list of themes. */
export type ThemesResponse = z.infer<typeof ThemesSchema>;
