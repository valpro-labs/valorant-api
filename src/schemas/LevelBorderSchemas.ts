import { z } from 'zod';

/** Schema for a single level border. */
export const LevelBorderSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  startingLevel: z.number().int(),
  levelNumber: z.number().int(),
  levelNumberAppearance: z.string(),
  smallPlayerCardAppearance: z.string(),
  assetPath: z.string(),
});
/** A single level border's data. */
export type LevelBorderResponse = z.infer<typeof LevelBorderSchema>;

/** Schema for a list of level borders. */
export const LevelBordersSchema = z.array(LevelBorderSchema);
/** A list of level borders. */
export type LevelBordersResponse = z.infer<typeof LevelBordersSchema>;
