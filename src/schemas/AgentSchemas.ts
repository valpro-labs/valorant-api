import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

/** Schema for a single agent's voice line media data. */
export const VoiceLineMediaSchema = z.object({
  id: z.number().int(),
  wwise: z.string(),
  wave: z.string(),
});
/** A single agent's voice line media data. */
export type VoiceLineMediaResponse = z.infer<typeof VoiceLineMediaSchema>;

/** Schema for a single agent's voice line. */
export const VoiceLineSchema = z.object({
  minDuration: z.number(),
  maxDuration: z.number(),
  mediaList: z.array(VoiceLineMediaSchema),
});
/** A single agent's voice line. */
export type VoiceLineResponse = z.infer<typeof VoiceLineSchema>;

/** Schema for a single agent ability. */
export const AbilitySchema = z.object({
  slot: z.string(),
  displayName: LocalizedStringSchema,
  description: LocalizedStringSchema,
  displayIcon: z.string(),
  voiceLine: VoiceLineSchema,
});
/** A single agent ability. */
export type AbilityResponse = z.infer<typeof AbilitySchema>;

/** Schema for a single agent role. */
export const RoleSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  description: LocalizedStringSchema,
  displayIcon: z.string(),
  assetPath: z.string(),
});
/** A single agent role. */
export type RoleResponse = z.infer<typeof RoleSchema>;

/** Schema for an agent's recruitment data. */
export const RecruitmentDataSchema = z.object({
  counterId: z.string().uuid(),
  milestoneId: z.string().uuid(),
  milestoneThreshold: z.number().int(),
  useLevelVpCostOverride: z.boolean(),
  levelVpCostOverride: z.number().int(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});
/** An agent's recruitment data. */
export type RecruitmentDataResponse = z.infer<typeof RecruitmentDataSchema>;

/** Schema for a single agent. */
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
/** A single agent's data. */
export type AgentResponse = z.infer<typeof AgentSchema>;

/** Schema for a list of agents. */
export const AgentsSchema = z.array(AgentSchema);
/** A list of agents. */
export type AgentsResponse = z.infer<typeof AgentsSchema>;
