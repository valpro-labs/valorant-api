import { z } from 'zod';

/** Schema for a single buddy level. */
export const BuddyLevelSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  displayIcon: z.string(),
  assetPath: z.string(),
});
/** A single buddy level. */
export type BuddyLevelResponse = z.infer<typeof BuddyLevelSchema>;

/** Schema for a single buddy (gun charm). */
export const BuddySchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  isHiddenIfNotOwned: z.boolean(),
  themeUuid: z.string().uuid().nullable(),
  displayIcon: z.string(),
  assetPath: z.string(),
  levels: z.array(BuddyLevelSchema),
});
/** A single buddy (gun charm). */
export type BuddyResponse = z.infer<typeof BuddySchema>;

/** Schema for a list of buddies. */
export const BuddiesSchema = z.array(BuddySchema);
/** A list of buddies. */
export type BuddiesResponse = z.infer<typeof BuddiesSchema>;

/** Schema for a list of buddy levels. */
export const BuddyLevelsSchema = z.array(BuddyLevelSchema);
/** A list of buddy levels. */
export type BuddyLevelsResponse = z.infer<typeof BuddyLevelsSchema>;
