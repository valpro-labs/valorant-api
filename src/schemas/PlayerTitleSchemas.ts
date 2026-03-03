import { z } from 'zod';

export const PlayerTitleSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  titleText: z.string(),
  isHiddenIfNotOwned: z.boolean(),
  assetPath: z.string(),
});
export type PlayerTitleResponse = z.infer<typeof PlayerTitleSchema>;

export const PlayerTitlesSchema = z.array(PlayerTitleSchema);
export type PlayerTitlesResponse = z.infer<typeof PlayerTitlesSchema>;
