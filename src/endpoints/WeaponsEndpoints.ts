import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';
import { WeaponResponse, WeaponsResponse, SkinResponse, ChromaResponse, LevelResponse } from '../schemas';

/**
 * Provides access to the Valorant API weapons endpoints.
 */
class WeaponsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all weapons.
   * @returns An array of {@link WeaponResponse} objects.
   */
  public async getWeaponsV1(): Promise<WeaponsResponse> {
    return this.requestValorantApi<WeaponsResponse>('v1/weapons');
  }

  /**
   * Get a weapon by its UUID.
   * @param uuid - The UUID of the weapon.
   * @returns The {@link WeaponResponse} matching the given UUID.
   */
  public async getWeaponByUuidV1(uuid: string): Promise<WeaponResponse> {
    return this.requestValorantApi<WeaponResponse>(`v1/weapons/${uuid}`);
  }

  /**
   * Get all weapon skins.
   * @returns An array of {@link SkinResponse} objects.
   */
  public async getWeaponSkinsV1(): Promise<SkinResponse[]> {
    return this.requestValorantApi<SkinResponse[]>('v1/weapons/skins');
  }

  /**
   * Get a weapon skin by its UUID.
   * @param uuid - The UUID of the weapon skin.
   * @returns The {@link SkinResponse} matching the given UUID.
   */
  public async getWeaponSkinByUuidV1(uuid: string): Promise<SkinResponse> {
    return this.requestValorantApi<SkinResponse>(`v1/weapons/skins/${uuid}`);
  }

  /**
   * Get a weapon skin chroma by its UUID.
   * @param uuid - The UUID of the weapon skin chroma.
   * @returns The {@link ChromaResponse} matching the given UUID.
   */
  public async getWeaponSkinChromaByUuidV1(uuid: string): Promise<ChromaResponse> {
    return this.requestValorantApi<ChromaResponse>(`v1/weapons/skinchromas/${uuid}`);
  }

  /**
   * Get a weapon skin level by its UUID.
   * @param uuid - The UUID of the weapon skin level.
   * @returns The {@link LevelResponse} matching the given UUID.
   */
  public async getWeaponSkinLevelByUuidV1(uuid: string): Promise<LevelResponse> {
    return this.requestValorantApi<LevelResponse>(`v1/weapons/skinlevels/${uuid}`);
  }
}

export { WeaponsEndpoints };
