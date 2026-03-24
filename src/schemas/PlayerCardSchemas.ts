import { z } from 'zod';

/** Schema for a single player card. */
export const PlayerCardSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  isHiddenIfNotOwned: z.boolean(),
  themeUuid: z.string().uuid(),
  displayIcon: z.string(),
  smallArt: z.string(),
  wideArt: z.string(),
  largeArt: z.string(),
  assetPath: z.string(),
});
/** A single player card's data. */
export type PlayerCardResponse = z.infer<typeof PlayerCardSchema>;

/** Schema for a list of player cards. */
export const PlayerCardsSchema = z.array(PlayerCardSchema);
/** A list of player cards. */
export type PlayerCardsResponse = z.infer<typeof PlayerCardsSchema>;
