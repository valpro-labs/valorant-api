import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

export const VoiceLineMediaSchema = z.object({
  id: z.number().int(),
  wwise: z.string(),
  wave: z.string(),
});
export type VoiceLineMediaResponse = z.infer<typeof VoiceLineMediaSchema>;

export const VoiceLineSchema = z.object({
  minDuration: z.number(),
  maxDuration: z.number(),
  mediaList: z.array(VoiceLineMediaSchema),
});
export type VoiceLineResponse = z.infer<typeof VoiceLineSchema>;

export const AbilitySchema = z.object({
  slot: z.string(),
  displayName: LocalizedStringSchema,
  description: LocalizedStringSchema,
  displayIcon: z.string(),
  voiceLine: VoiceLineSchema,
});
export type AbilityResponse = z.infer<typeof AbilitySchema>;

export const RoleSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  description: LocalizedStringSchema,
  displayIcon: z.string(),
  assetPath: z.string(),
});
export type RoleResponse = z.infer<typeof RoleSchema>;

export const RecruitmentDataSchema = z.object({
  counterId: z.string().uuid(),
  milestoneId: z.string().uuid(),
  milestoneThreshold: z.number().int(),
  useLevelVpCostOverride: z.boolean(),
  levelVpCostOverride: z.number().int(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});
export type RecruitmentDataResponse = z.infer<typeof RecruitmentDataSchema>;

export const AgentSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  description: LocalizedStringSchema,
  developerName: z.string(),
  releaseDate: z.string().datetime(),
  characterTags: z.array(LocalizedStringSchema),
  displayIcon: z.string(),
  displayIconSmall: z.string(),
  bustPortrait: z.string(),
  fullPortrait: z.string(),
  fullPortraitV2: z.string(),
  killfeedPortrait: z.string(),
  minimapPortrait: z.string(),
  homeScreenPromoTileImage: z.string(),
  background: z.string(),
  backgroundGradientColors: z.array(z.string()),
  assetPath: z.string(),
  isFullPortraitRightFacing: z.boolean(),
  isPlayableCharacter: z.boolean(),
  isAvailableForTest: z.boolean(),
  isBaseContent: z.boolean(),
  role: RoleSchema,
  recruitmentData: RecruitmentDataSchema,
  abilities: z.array(AbilitySchema),
});
export type AgentResponse = z.infer<typeof AgentSchema>;

export const AgentsSchema = z.array(AgentSchema);
export type AgentsResponse = z.infer<typeof AgentsSchema>;
