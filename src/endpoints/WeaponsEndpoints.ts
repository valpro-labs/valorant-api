import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';
import { WeaponResponse, WeaponsResponse, SkinResponse, ChromaResponse, LevelResponse } from '../schemas';

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

  /**
   * Get all weapon skins
   * @returns Promise<SkinResponse[]>
   */
  public async getWeaponSkinsV1(): Promise<SkinResponse[]> {
    return this.requestValorantApi<SkinResponse[]>('v1/weapons/skins');
  }

  /**
   * Get weapon skin by UUID
   * @param uuid Weapon skin UUID
   * @returns Promise<SkinResponse>
   */
  public async getWeaponSkinByUuidV1(uuid: string): Promise<SkinResponse> {
    return this.requestValorantApi<SkinResponse>(`v1/weapons/skins/${uuid}`);
  }

  /**
   * Get weapon skin chroma by UUID
   * @param uuid Weapon skin chroma UUID
   * @returns Promise<ChromaResponse>
   */
  public async getWeaponSkinChromaByUuidV1(uuid: string): Promise<ChromaResponse> {
    return this.requestValorantApi<ChromaResponse>(`v1/weapons/skinchromas/${uuid}`);
  }

  /**
   * Get weapon skin level by UUID
   * @param uuid Weapon skin level UUID
   * @returns Promise<LevelResponse>
   */
  public async getWeaponSkinLevelByUuidV1(uuid: string): Promise<LevelResponse> {
    return this.requestValorantApi<LevelResponse>(`v1/weapons/skinlevels/${uuid}`);
  }
}

export { WeaponsEndpoints };
