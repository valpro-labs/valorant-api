import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

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

class VersionEndpoint extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getVersionV1(): Promise<VersionResponse> {
    return this.requestValorantApi<VersionResponse>('https://valorant-api.com/v1/version');
  }
}

export { VersionEndpoint };
