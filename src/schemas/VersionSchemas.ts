import { z } from 'zod';

export const VersionSchema = z.object({
  manifestId: z.string(),
  branch: z.string(),
  version: z.string(),
  buildVersion: z.string(),
  engineVersion: z.string(),
  riotClientVersion: z.string(),
  riotClientBuild: z.string(),
  buildDate: z.string().datetime().pipe(z.coerce.date()),
});
export type VersionResponse = z.infer<typeof VersionSchema>;
