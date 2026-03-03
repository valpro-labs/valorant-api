import { z } from 'zod';

export const BuddyLevelSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  displayIcon: z.string(),
  assetPath: z.string(),
});
export type BuddyLevelResponse = z.infer<typeof BuddyLevelSchema>;

export const BuddySchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  isHiddenIfNotOwned: z.boolean(),
  themeUuid: z.string().uuid().nullable(),
  displayIcon: z.string(),
  assetPath: z.string(),
  levels: z.array(BuddyLevelSchema),
});
export type BuddyResponse = z.infer<typeof BuddySchema>;

export const BuddiesSchema = z.array(BuddySchema);
export type BuddiesResponse = z.infer<typeof BuddiesSchema>;

export const BuddyLevelsSchema = z.array(BuddyLevelSchema);
export type BuddyLevelsResponse = z.infer<typeof BuddyLevelsSchema>;
