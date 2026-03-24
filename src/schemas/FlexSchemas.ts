import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

/** Schema for a single flex item. */
export const FlexSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  displayNameAllCaps: LocalizedStringSchema,
  displayIcon: z.string(),
  assetPath: z.string(),
});
/** A single flex item's data. */
export type FlexResponse = z.infer<typeof FlexSchema>;

/** Schema for a list of flex items. */
export const FlexsSchema = z.array(FlexSchema);
/** A list of flex items. */
export type FlexsResponse = z.infer<typeof FlexsSchema>;
