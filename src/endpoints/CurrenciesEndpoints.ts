import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { CurrencyResponse, CurrenciesResponse } from '../schemas';

/**
 * Provides access to the Valorant API currencies endpoints.
 */
class CurrenciesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all currencies.
   * @returns A list of all currencies.
   */
  public async getCurrenciesV1(): Promise<CurrenciesResponse> {
    return this.requestValorantApi<CurrenciesResponse>('v1/currencies');
  }

  /**
   * Get a currency by UUID.
   * @param uuid - The UUID of the currency.
   * @returns The currency matching the given UUID.
   */
  public async getCurrencyByUuidV1(uuid: string): Promise<CurrencyResponse> {
    return this.requestValorantApi<CurrencyResponse>(`v1/currencies/${uuid}`);
  }
}

export { CurrenciesEndpoints };
