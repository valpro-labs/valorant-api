import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

/** Schema for a single game feature override. */
export const GameFeatureOverrideSchema = z.object({
  featureName: z.string(),
  state: z.boolean(),
});
/** A single game feature override's data. */
export type GameFeatureOverrideResponse = z.infer<typeof GameFeatureOverrideSchema>;

/** Schema for a single game rule boolean override. */
export const GameRuleBoolOverrideSchema = z.object({
  ruleName: z.string(),
  state: z.boolean(),
});
/** A single game rule boolean override's data. */
export type GameRuleBoolOverrideResponse = z.infer<typeof GameRuleBoolOverrideSchema>;

/** Schema for a single game mode, including {@link GameFeatureOverrideResponse | feature overrides} and {@link GameRuleBoolOverrideResponse | rule overrides}. */
export const GameModeSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  description: LocalizedStringSchema.nullable(),
  duration: z.string().nullable(),
  economyType: z.string().nullable(),
  allowsMatchTimeouts: z.boolean(),
  allowsCustomGameReplays: z.boolean(),
  isTeamVoiceAllowed: z.boolean(),
  isMinimapHidden: z.boolean(),
  orbCount: z.number(),
  roundsPerHalf: z.number(),
  teamRoles: z.array(z.string()).nullable(),
  gameFeatureOverrides: z.array(GameFeatureOverrideSchema).nullable().optional(),
  gameRuleBoolOverrides: z.array(GameRuleBoolOverrideSchema).nullable().optional(),
  displayIcon: z.string().nullable(),
  listViewIconTall: z.string().nullable().optional(),
  assetPath: z.string(),
});
/** A single game mode's data. */
export type GameModeResponse = z.infer<typeof GameModeSchema>;

/** Schema for a list of game modes. */
export const GameModesSchema = z.array(GameModeSchema);
/** A list of game modes. */
export type GameModesResponse = z.infer<typeof GameModesSchema>;
