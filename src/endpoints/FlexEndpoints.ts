import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { FlexResponse, FlexsResponse } from '../schemas';

/**
 * Provides access to the Valorant API flex endpoints.
 */
class FlexEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all flex items.
   * @returns A list of all flex items.
   */
  public async getFlexV1(): Promise<FlexsResponse> {
    return this.requestValorantApi<FlexsResponse>('v1/flex');
  }

  /**
   * Get a flex item by its UUID.
   * @param uuid - The UUID of the flex item.
   * @returns The flex item matching the given UUID.
   */
  public async getFlexByUuidV1(uuid: string): Promise<FlexResponse> {
    return this.requestValorantApi<FlexResponse>(`v1/flex/${uuid}`);
  }
}

export { FlexEndpoints };
