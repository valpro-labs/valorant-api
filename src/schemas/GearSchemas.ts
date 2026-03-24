import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';
import { GridPositionSchema } from './WeaponSchemas';

/** Schema for a gear item's shop data. */
export const GearShopDataSchema = z.object({
  cost: z.number().int(),
  category: z.string(),
  shopOrderPriority: z.number().int(),
  categoryText: LocalizedStringSchema,
  gridPosition: GridPositionSchema.nullable(),
  canBeTrashed: z.boolean(),
  image: z.string().nullable(),
  newImage: z.string(),
  newImage2: z.string().nullable(),
  assetPath: z.string(),
});
/** A gear item's shop data. */
export type GearShopDataResponse = z.infer<typeof GearShopDataSchema>;

/** Schema for a single gear item. */
export const GearSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  description: LocalizedStringSchema,
  displayIcon: z.string(),
  assetPath: z.string(),
  shopData: GearShopDataSchema,
});
/** A single gear item's data. */
export type GearResponse = z.infer<typeof GearSchema>;

/** Schema for a list of gear items. */
export const GearsSchema = z.array(GearSchema);
/** A list of gear items. */
export type GearsResponse = z.infer<typeof GearsSchema>;
