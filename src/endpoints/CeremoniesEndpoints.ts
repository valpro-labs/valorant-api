import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { CeremonyResponse, CeremoniesResponse } from '../schemas';

/**
 * Provides access to the Valorant API ceremonies endpoints.
 */
class CeremoniesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all ceremonies.
   * @returns An array of {@link CeremonyResponse} objects.
   */
  public async getCeremoniesV1(): Promise<CeremoniesResponse> {
    return this.requestValorantApi<CeremoniesResponse>('v1/ceremonies');
  }

  /**
   * Get a ceremony by UUID.
   * @param uuid - The UUID of the ceremony.
   * @returns The {@link CeremonyResponse} matching the given UUID.
   */
  public async getCeremonyByUuidV1(uuid: string): Promise<CeremonyResponse> {
    return this.requestValorantApi<CeremonyResponse>(`v1/ceremonies/${uuid}`);
  }
}

export { CeremoniesEndpoints };
