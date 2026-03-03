import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { CurrencyResponse, CurrenciesResponse } from '../schemas';

class CurrenciesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getCurrenciesV1(): Promise<CurrenciesResponse> {
    return this.requestValorantApi<CurrenciesResponse>('v1/currencies');
  }

  public async getCurrencyByUuidV1(uuid: string): Promise<CurrencyResponse> {
    return this.requestValorantApi<CurrencyResponse>(`v1/currencies/${uuid}`);
  }
}

export { CurrenciesEndpoints };
