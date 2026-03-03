import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

export const AdsStatsSchema = z.object({
  zoomMultiplier: z.number(),
  fireRate: z.number(),
  runSpeedMultiplier: z.number(),
  burstCount: z.number().int(),
  firstBulletAccuracy: z.number(),
});
export type AdsStatsResponse = z.infer<typeof AdsStatsSchema>;

export const AltShotgunStatsSchema = z.object({
  shotgunPelletCount: z.number().int(),
  burstRate: z.number(),
});
export type AltShotgunStatsResponse = z.infer<typeof AltShotgunStatsSchema>;

export const AirBurstStatsSchema = z.object({
  shotgunPelletCount: z.number().int(),
  burstDistance: z.number(),
});
export type AirBurstStatsResponse = z.infer<typeof AirBurstStatsSchema>;

export const DamageRangeSchema = z.object({
  rangeStartMeters: z.number(),
  rangeEndMeters: z.number(),
  headDamage: z.number(),
  bodyDamage: z.number(),
  legDamage: z.number(),
});
export type DamageRangeResponse = z.infer<typeof DamageRangeSchema>;

export const WeaponStatsSchema = z.object({
  fireRate: z.number(),
  magazineSize: z.number().int(),
  runSpeedMultiplier: z.number(),
  equipTimeSeconds: z.number(),
  reloadTimeSeconds: z.number(),
  firstBulletAccuracy: z.number(),
  shotgunPelletCount: z.number().int(),
  wallPenetration: z.string(),
  feature: z.string(),
  fireMode: z.string(),
  altFireType: z.string(),
  adsStats: AdsStatsSchema,
  altShotgunStats: AltShotgunStatsSchema,
  airBurstStats: AirBurstStatsSchema,
  damageRanges: z.array(DamageRangeSchema),
});
export type WeaponStatsResponse = z.infer<typeof WeaponStatsSchema>;

export const GridPositionSchema = z.object({
  row: z.number().int(),
  column: z.number().int(),
});
export type GridPositionResponse = z.infer<typeof GridPositionSchema>;

export const ShopDataSchema = z.object({
  cost: z.number().int(),
  category: z.string(),
  shopOrderPriority: z.number().int(),
  categoryText: LocalizedStringSchema,
  gridPosition: GridPositionSchema,
  canBeTrashed: z.boolean(),
  image: z.string(),
  newImage: z.string(),
  newImage2: z.string(),
  assetPath: z.string(),
});
export type ShopDataResponse = z.infer<typeof ShopDataSchema>;

export const ChromaSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  displayIcon: z.string(),
  fullRender: z.string(),
  swatch: z.string(),
  streamedVideo: z.string(),
  assetPath: z.string(),
});
export type ChromaResponse = z.infer<typeof ChromaSchema>;

export const LevelSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  levelItem: z.string(),
  displayIcon: z.string(),
  streamedVideo: z.string(),
  assetPath: z.string(),
});
export type LevelResponse = z.infer<typeof LevelSchema>;

export const SkinSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  themeUuid: z.string().uuid(),
  contentTierUuid: z.string().uuid(),
  displayIcon: z.string(),
  wallpaper: z.string(),
  assetPath: z.string(),
  chromas: z.array(ChromaSchema),
  levels: z.array(LevelSchema),
});
export type SkinResponse = z.infer<typeof SkinSchema>;

export const WeaponSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  category: z.string(),
  defaultSkinUuid: z.string().uuid(),
  displayIcon: z.string(),
  killStreamIcon: z.string(),
  assetPath: z.string(),
  weaponStats: WeaponStatsSchema,
  shopData: ShopDataSchema,
  skins: z.array(SkinSchema),
});
export type WeaponResponse = z.infer<typeof WeaponSchema>;

export const WeaponsSchema = z.array(WeaponSchema);
export type WeaponsResponse = z.infer<typeof WeaponsSchema>;
