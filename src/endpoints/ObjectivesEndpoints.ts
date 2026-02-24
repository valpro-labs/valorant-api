import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

export const ObjectiveSchema = z.object({
  uuid: z.string().uuid(),
  directive: z.string(),
  assetPath: z.string(),
});

export const ObjectivesSchema = z.array(ObjectiveSchema);

export type ObjectiveResponse = z.infer<typeof ObjectiveSchema>;
export type ObjectivesResponse = z.infer<typeof ObjectivesSchema>;

class ObjectivesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getObjectivesV1(): Promise<ObjectivesResponse> {
    return this.requestValorantApi<ObjectivesResponse>('https://valorant-api.com/v1/objectives');
  }

  public async getObjectiveByUuidV1(uuid: string): Promise<ObjectiveResponse> {
    return this.requestValorantApi<ObjectiveResponse>(`https://valorant-api.com/v1/objectives/${uuid}`);
  }
}

export { ObjectivesEndpoints };
