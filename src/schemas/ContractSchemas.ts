import { z } from 'zod';

/** Schema for a single contract reward. */
export const RewardSchema = z.object({
  type: z.string(),
  uuid: z.string().uuid(),
  amount: z.number().int(),
  isHighlighted: z.boolean(),
});
/** A single contract reward. */
export type RewardResponse = z.infer<typeof RewardSchema>;

/** Schema for a single contract level. */
export const ContractLevelSchema = z.object({
  reward: RewardSchema,
  xp: z.number().int(),
  vpCost: z.number().int(),
  isPurchasableWithVP: z.boolean(),
  doughCost: z.number().int(),
  isPurchasableWithDough: z.boolean(),
});
/** A single contract level. */
export type ContractLevelResponse = z.infer<typeof ContractLevelSchema>;

/** Schema for a single contract chapter. */
export const ChapterSchema = z.object({
  isEpilogue: z.boolean(),
  levels: z.array(ContractLevelSchema),
  freeRewards: z.array(RewardSchema).nullable(),
});
/** A single contract chapter. */
export type ChapterResponse = z.infer<typeof ChapterSchema>;

/** Schema for a contract's content data. */
export const ContractContentSchema = z.object({
  relationType: z.string().nullable(),
  relationUuid: z.string().uuid().nullable(),
  chapters: z.array(ChapterSchema),
  premiumRewardScheduleUuid: z.string().uuid().nullable(),
  premiumVPCost: z.number().int(),
});
/** A contract's content data. */
export type ContractContentResponse = z.infer<typeof ContractContentSchema>;

/** Schema for a single contract. */
export const ContractSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  displayIcon: z.string().nullable(),
  shipIt: z.boolean(),
  useLevelVPCostOverride: z.boolean(),
  levelVPCostOverride: z.number().int(),
  freeRewardScheduleUuid: z.string().uuid().nullable(),
  content: ContractContentSchema,
  assetPath: z.string(),
});
/** A single contract. */
export type ContractResponse = z.infer<typeof ContractSchema>;

/** Schema for a list of contracts. */
export const ContractsSchema = z.array(ContractSchema);
/** A list of contracts. */
export type ContractsResponse = z.infer<typeof ContractsSchema>;
