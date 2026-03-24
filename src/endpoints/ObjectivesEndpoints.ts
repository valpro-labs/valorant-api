import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { ObjectiveResponse, ObjectivesResponse } from '../schemas';

/**
 * Provides access to the Valorant API objectives endpoints.
 */
class ObjectivesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all objectives.
   * @returns A list of all objectives.
   */
  public async getObjectivesV1(): Promise<ObjectivesResponse> {
    return this.requestValorantApi<ObjectivesResponse>('v1/objectives');
  }

  /**
   * Get an objective by its UUID.
   * @param uuid - The UUID of the objective.
   * @returns The objective matching the given UUID.
   */
  public async getObjectiveByUuidV1(uuid: string): Promise<ObjectiveResponse> {
    return this.requestValorantApi<ObjectiveResponse>(`v1/objectives/${uuid}`);
  }
}

export { ObjectivesEndpoints };
