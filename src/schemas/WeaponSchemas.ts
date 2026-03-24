import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

/** Schema for ADS (aim down sights) stats. */
export const AdsStatsSchema = z.object({
  zoomMultiplier: z.number(),
  fireRate: z.number(),
  runSpeedMultiplier: z.number(),
  burstCount: z.number().int(),
  firstBulletAccuracy: z.number(),
});
/** ADS stats data. */
export type AdsStatsResponse = z.infer<typeof AdsStatsSchema>;

/** Schema for alternate shotgun stats. */
export const AltShotgunStatsSchema = z.object({
  shotgunPelletCount: z.number().int(),
  burstRate: z.number(),
});
/** Alternate shotgun stats data. */
export type AltShotgunStatsResponse = z.infer<typeof AltShotgunStatsSchema>;

/** Schema for air burst stats. */
export const AirBurstStatsSchema = z.object({
  shotgunPelletCount: z.number().int(),
  burstDistance: z.number(),
});
/** Air burst stats data. */
export type AirBurstStatsResponse = z.infer<typeof AirBurstStatsSchema>;

/** Schema for a single damage range. */
export const DamageRangeSchema = z.object({
  rangeStartMeters: z.number(),
  rangeEndMeters: z.number(),
  headDamage: z.number(),
  bodyDamage: z.number(),
  legDamage: z.number(),
});
/** A single damage range's data. */
export type DamageRangeResponse = z.infer<typeof DamageRangeSchema>;

/** Schema for weapon stats. */
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
/** Weapon stats data. */
export type WeaponStatsResponse = z.infer<typeof WeaponStatsSchema>;

/** Schema for a grid position. */
export const GridPositionSchema = z.object({
  row: z.number().int(),
  column: z.number().int(),
});
/** A grid position's data. */
export type GridPositionResponse = z.infer<typeof GridPositionSchema>;

/** Schema for shop data. */
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
/** Shop data for a weapon. */
export type ShopDataResponse = z.infer<typeof ShopDataSchema>;

/** Schema for a single skin chroma. */
export const ChromaSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  displayIcon: z.string(),
  fullRender: z.string(),
  swatch: z.string(),
  streamedVideo: z.string(),
  assetPath: z.string(),
});
/** A single skin chroma's data. */
export type ChromaResponse = z.infer<typeof ChromaSchema>;

/** Schema for a skin level item type. */
export const LevelItemSchema = z.enum([
  'EEquippableSkinLevelItem::VFX',
  'EEquippableSkinLevelItem::Animation',
  'EEquippableSkinLevelItem::Finisher',
  'EEquippableSkinLevelItem::Voiceover',
  'EEquippableSkinLevelItem::SoundEffects',
  'EEquippableSkinLevelItem::FishAnimation',
  'EEquippableSkinLevelItem::KillBanner',
  'EEquippableSkinLevelItem::TopFrag',
  'EEquippableSkinLevelItem::KillCounter',
  'EEquippableSkinLevelItem::InspectAndKill',
  'EEquippableSkinLevelItem::KillEffect',
  'EEquippableSkinLevelItem::AttackerDefenderSwap',
  'EEquippableSkinLevelItem::Randomizer',
]);
/** A skin level item type value. */
export type LevelItem = z.infer<typeof LevelItemSchema>;

/** Schema for a single skin level. */
export const LevelSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  levelItem: LevelItemSchema.or(z.string()).nullable(),
  displayIcon: z.string(),
  streamedVideo: z.string(),
  assetPath: z.string(),
});
/** A single skin level's data. */
export type LevelResponse = z.infer<typeof LevelSchema>;

/** Schema for a single weapon skin. */
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
/** A single weapon skin's data. */
export type SkinResponse = z.infer<typeof SkinSchema>;

/** Schema for a single weapon. */
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
/** A single weapon's data. */
export type WeaponResponse = z.infer<typeof WeaponSchema>;

/** Schema for a list of weapons. */
export const WeaponsSchema = z.array(WeaponSchema);
/** A list of weapons. */
export type WeaponsResponse = z.infer<typeof WeaponsSchema>;
