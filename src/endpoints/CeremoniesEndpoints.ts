import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { CeremonyResponse, CeremoniesResponse } from '../schemas';

class CeremoniesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all ceremonies
   * @returns Promise<CeremoniesResponse>
   */
  public async getCeremoniesV1(): Promise<CeremoniesResponse> {
    return this.requestValorantApi<CeremoniesResponse>('v1/ceremonies');
  }

  /**
   * Get ceremony by UUID
   * @param uuid Ceremony UUID
   * @returns Promise<CeremonyResponse>
   */
  public async getCeremonyByUuidV1(uuid: string): Promise<CeremonyResponse> {
    return this.requestValorantApi<CeremonyResponse>(`v1/ceremonies/${uuid}`);
  }
}

export { CeremoniesEndpoints };
