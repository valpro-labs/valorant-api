import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';
import { WeaponResponse, WeaponsResponse } from '../schemas';

class WeaponsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getWeaponsV1(): Promise<WeaponsResponse> {
    return this.requestValorantApi<WeaponsResponse>('v1/weapons');
  }

  public async getWeaponByUuidV1(uuid: string): Promise<WeaponResponse> {
    return this.requestValorantApi<WeaponResponse>(`v1/weapons/${uuid}`);
  }
}

export { WeaponsEndpoints };
