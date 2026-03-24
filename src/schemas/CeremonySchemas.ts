import { z } from 'zod';

/** Schema for a single ceremony. */
export const CeremonySchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  assetPath: z.string(),
});
/** A single ceremony. */
export type CeremonyResponse = z.infer<typeof CeremonySchema>;

/** Schema for a list of ceremonies. */
export const CeremoniesSchema = z.array(CeremonySchema);
/** A list of ceremonies. */
export type CeremoniesResponse = z.infer<typeof CeremoniesSchema>;
