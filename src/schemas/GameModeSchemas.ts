import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

export const GameFeatureOverrideSchema = z.object({
  featureName: z.string(),
  state: z.boolean(),
});
export type GameFeatureOverrideResponse = z.infer<typeof GameFeatureOverrideSchema>;

export const GameRuleBoolOverrideSchema = z.object({
  ruleName: z.string(),
  state: z.boolean(),
});
export type GameRuleBoolOverrideResponse = z.infer<typeof GameRuleBoolOverrideSchema>;

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
export type GameModeResponse = z.infer<typeof GameModeSchema>;

export const GameModesSchema = z.array(GameModeSchema);
export type GameModesResponse = z.infer<typeof GameModesSchema>;
