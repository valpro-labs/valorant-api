import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';
import { LocalizedStringSchema } from '../schemas/SharedSchemas';

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
export const GameModesSchema = z.array(GameModeSchema);

export type GameModeResponse = z.infer<typeof GameModeSchema>;
export type GameModesResponse = z.infer<typeof GameModesSchema>;

class GameModesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getGameModesV1(): Promise<GameModesResponse> {
    return this.requestValorantApi<GameModesResponse>('https://valorant-api.com/v1/gamemodes');
  }

  public async getGameModeByUuidV1(uuid: string): Promise<GameModeResponse> {
    return this.requestValorantApi<GameModeResponse>(`https://valorant-api.com/v1/gamemodes/${uuid}`);
  }
}

export { GameModesEndpoints };
