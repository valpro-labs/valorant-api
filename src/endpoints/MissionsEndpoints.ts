import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

const LocalizedStringSchema = z.string();

const MissionSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  title: LocalizedStringSchema,
  type: z.string(),
  xpGrant: z.number().int(),
  progressToComplete: z.number().int(),
  activationDate: z.string().datetime(),
  expirationDate: z.string().datetime(),
  assetPath: z.string(),
  objectives: z.array(z.object({
    objectiveUuid: z.string().uuid(),
    value: z.number().int(),
  })),
});
const MissionsSchema = z.array(MissionSchema);

export type MissionResponse = z.infer<typeof MissionSchema>;
export type MissionsResponse = z.infer<typeof MissionsSchema>;

class MissionsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getMissionsV1(): Promise<MissionsResponse> {
    return this.requestValorantApi<MissionsResponse>('https://valorant-api.com/v1/missions');
  }

  public async getMissionByUuidV1(uuid: string): Promise<MissionResponse> {
    return this.requestValorantApi<MissionResponse>(`https://valorant-api.com/v1/missions/${uuid}`);
  }
}

export { MissionsEndpoints };
