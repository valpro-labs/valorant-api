import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

/** Schema for a single game mode equippable. */
export const GameModeEquippableSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  category: z.string().nullable(),
  displayIcon: z.string(),
  killStreamIcon: z.string(),
  assetPath: z.string(),
});
/** A single game mode equippable's data. */
export type GameModeEquippableResponse = z.infer<typeof GameModeEquippableSchema>;

/** Schema for a list of game mode equippables. */
export const GameModeEquippablesSchema = z.array(GameModeEquippableSchema);
/** A list of game mode equippables. */
export type GameModeEquippablesResponse = z.infer<typeof GameModeEquippablesSchema>;
