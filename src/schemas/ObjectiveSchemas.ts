import { z } from 'zod';

/** Schema for a single objective. */
export const ObjectiveSchema = z.object({
  uuid: z.string().uuid(),
  directive: z.string(),
  assetPath: z.string(),
});
/** A single objective's data. */
export type ObjectiveResponse = z.infer<typeof ObjectiveSchema>;

/** Schema for a list of objectives. */
export const ObjectivesSchema = z.array(ObjectiveSchema);
/** A list of objectives. */
export type ObjectivesResponse = z.infer<typeof ObjectivesSchema>;
