import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

const RewardSchema = z.object({
  type: z.string(),
  uuid: z.string().uuid(),
  amount: z.number().int(),
  isHighlighted: z.boolean(),
});

const LevelSchema = z.object({
  reward: RewardSchema,
  xp: z.number().int(),
  vpCost: z.number().int(),
  isPurchasableWithVP: z.boolean(),
  doughCost: z.number().int(),
  isPurchasableWithDough: z.boolean(),
});

const ChapterSchema = z.object({
  isEpilogue: z.boolean(),
  levels: z.array(LevelSchema),
  freeRewards: z.array(RewardSchema).nullable(),
});

const ContractContentSchema = z.object({
  relationType: z.string().nullable(),
  relationUuid: z.string().uuid().nullable(),
  chapters: z.array(ChapterSchema),
  premiumRewardScheduleUuid: z.string().uuid().nullable(),
  premiumVPCost: z.number().int(),
});

const ContractSchema = z.object({
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

const ContractsSchema = z.array(ContractSchema);

export type RewardResponse = z.infer<typeof RewardSchema>;
export type LevelResponse = z.infer<typeof LevelSchema>;
export type ChapterResponse = z.infer<typeof ChapterSchema>;
export type ContractContentResponse = z.infer<typeof ContractContentSchema>;
export type ContractResponse = z.infer<typeof ContractSchema>;
export type ContractsResponse = z.infer<typeof ContractsSchema>;

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
