import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

export const RewardSchema = z.object({
  type: z.string(),
  uuid: z.string().uuid(),
  amount: z.number().int(),
  isHighlighted: z.boolean(),
});
export type RewardResponse = z.infer<typeof RewardSchema>;

export const ContractLevelSchema = z.object({
  reward: RewardSchema,
  xp: z.number().int(),
  vpCost: z.number().int(),
  isPurchasableWithVP: z.boolean(),
  doughCost: z.number().int(),
  isPurchasableWithDough: z.boolean(),
});
export type ContractLevelResponse = z.infer<typeof ContractLevelSchema>;

export const ChapterSchema = z.object({
  isEpilogue: z.boolean(),
  levels: z.array(ContractLevelSchema),
  freeRewards: z.array(RewardSchema).nullable(),
});
export type ChapterResponse = z.infer<typeof ChapterSchema>;

export const ContractContentSchema = z.object({
  relationType: z.string().nullable(),
  relationUuid: z.string().uuid().nullable(),
  chapters: z.array(ChapterSchema),
  premiumRewardScheduleUuid: z.string().uuid().nullable(),
  premiumVPCost: z.number().int(),
});
export type ContractContentResponse = z.infer<typeof ContractContentSchema>;

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
export type ContractResponse = z.infer<typeof ContractSchema>;

export const ContractsSchema = z.array(ContractSchema);
export type ContractsResponse = z.infer<typeof ContractsSchema>;

// Types already defined above

class ContractsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all contracts
   * @returns Promise<ContractsResponse>
   */
  public async getContractsV1(): Promise<ContractsResponse> {
    return this.requestValorantApi<ContractsResponse>('https://valorant-api.com/v1/contracts');
  }

  /**
   * Get contract by UUID
   * @param uuid Contract UUID
   * @returns Promise<ContractResponse>
   */
  public async getContractByUuidV1(uuid: string): Promise<ContractResponse> {
    return this.requestValorantApi<ContractResponse>(`https://valorant-api.com/v1/contracts/${uuid}`);
  }
}

export { ContractsEndpoints };
