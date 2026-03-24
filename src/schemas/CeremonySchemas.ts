import { z } from 'zod';

export const CeremonySchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  assetPath: z.string(),
});
export type CeremonyResponse = z.infer<typeof CeremonySchema>;

export const CeremoniesSchema = z.array(CeremonySchema);
export type CeremoniesResponse = z.infer<typeof CeremoniesSchema>;
