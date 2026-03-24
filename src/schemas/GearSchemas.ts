import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';
import { GridPositionSchema } from './WeaponSchemas';

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
export type GearShopDataResponse = z.infer<typeof GearShopDataSchema>;

export const GearSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  description: LocalizedStringSchema,
  displayIcon: z.string(),
  assetPath: z.string(),
  shopData: GearShopDataSchema,
});
export type GearResponse = z.infer<typeof GearSchema>;

export const GearsSchema = z.array(GearSchema);
export type GearsResponse = z.infer<typeof GearsSchema>;
