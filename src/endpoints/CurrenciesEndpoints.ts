import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

const CurrencySchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  displayNameSingular: z.string(),
  displayIcon: z.string().url(),
  largeIcon: z.string().url(),
  rewardPreviewIcon: z.string().url(),
  assetPath: z.string(),
});

const CurrenciesSchema = z.array(CurrencySchema);

export type CurrencyResponse = z.infer<typeof CurrencySchema>;
export type CurrenciesResponse = z.infer<typeof CurrenciesSchema>;

class CurrenciesEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getCurrenciesV1(): Promise<CurrenciesResponse> {
    return this.requestValorantApi<CurrenciesResponse>('https://valorant-api.com/v1/currencies');
  }

  public async getCurrencyByUuidV1(uuid: string): Promise<CurrencyResponse> {
    return this.requestValorantApi<CurrencyResponse>(`https://valorant-api.com/v1/currencies/${uuid}`);
  }
}

export { CurrenciesEndpoints };
