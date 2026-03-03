import { z } from 'zod';

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
export type PlayerCardResponse = z.infer<typeof PlayerCardSchema>;

export const PlayerCardsSchema = z.array(PlayerCardSchema);
export type PlayerCardsResponse = z.infer<typeof PlayerCardsSchema>;
