import { z } from 'zod';

export const LevelBorderSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  startingLevel: z.number().int(),
  levelNumber: z.number().int(),
  levelNumberAppearance: z.string(),
  smallPlayerCardAppearance: z.string(),
  assetPath: z.string(),
});
export type LevelBorderResponse = z.infer<typeof LevelBorderSchema>;

export const LevelBordersSchema = z.array(LevelBorderSchema);
export type LevelBordersResponse = z.infer<typeof LevelBordersSchema>;
