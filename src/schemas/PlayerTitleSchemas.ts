import { z } from 'zod';

/** Schema for a single player title. */
export const PlayerTitleSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  titleText: z.string(),
  isHiddenIfNotOwned: z.boolean(),
  assetPath: z.string(),
});
/** A single player title's data. */
export type PlayerTitleResponse = z.infer<typeof PlayerTitleSchema>;

/** Schema for a list of player titles. */
export const PlayerTitlesSchema = z.array(PlayerTitleSchema);
/** A list of player titles. */
export type PlayerTitlesResponse = z.infer<typeof PlayerTitlesSchema>;
