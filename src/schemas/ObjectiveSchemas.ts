import { z } from 'zod';

export const ObjectiveSchema = z.object({
  uuid: z.string().uuid(),
  directive: z.string(),
  assetPath: z.string(),
});
export type ObjectiveResponse = z.infer<typeof ObjectiveSchema>;

export const ObjectivesSchema = z.array(ObjectiveSchema);
export type ObjectivesResponse = z.infer<typeof ObjectivesSchema>;
