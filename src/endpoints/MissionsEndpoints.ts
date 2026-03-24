import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { MissionResponse, MissionsResponse } from '../schemas';

/**
 * Provides access to the Valorant API missions endpoints.
 */
class MissionsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all missions.
   * @returns A list of all missions.
   */
  public async getMissionsV1(): Promise<MissionsResponse> {
    return this.requestValorantApi<MissionsResponse>('v1/missions');
  }

  /**
   * Get a mission by its UUID.
   * @param uuid - The UUID of the mission.
   * @returns The mission matching the given UUID.
   */
  public async getMissionByUuidV1(uuid: string): Promise<MissionResponse> {
    return this.requestValorantApi<MissionResponse>(`v1/missions/${uuid}`);
  }
}

export { MissionsEndpoints };
