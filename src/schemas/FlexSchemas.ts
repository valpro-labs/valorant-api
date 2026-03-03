import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

export const FlexSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  displayNameAllCaps: LocalizedStringSchema,
  displayIcon: z.string(),
  assetPath: z.string(),
});
export type FlexResponse = z.infer<typeof FlexSchema>;

export const FlexsSchema = z.array(FlexSchema);
export type FlexsResponse = z.infer<typeof FlexsSchema>;
