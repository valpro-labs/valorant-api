import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

export const GameModeEquippableSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  category: z.string().nullable(),
  displayIcon: z.string(),
  killStreamIcon: z.string(),
  assetPath: z.string(),
});
export type GameModeEquippableResponse = z.infer<typeof GameModeEquippableSchema>;

export const GameModeEquippablesSchema = z.array(GameModeEquippableSchema);
export type GameModeEquippablesResponse = z.infer<typeof GameModeEquippablesSchema>;
