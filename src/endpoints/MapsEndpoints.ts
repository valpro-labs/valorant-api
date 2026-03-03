import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';
import { LocalizedStringSchema } from '../schemas/SharedSchemas';

export const LocationSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
export type LocationResponse = z.infer<typeof LocationSchema>;

export const Scale3DSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
export type Scale3DResponse = z.infer<typeof Scale3DSchema>;

export const RotationSchema = z.object({
  pitch: z.number(),
  yaw: z.number(),
  roll: z.number(),
});
export type RotationResponse = z.infer<typeof RotationSchema>;

export const CalloutSchema = z.object({
  regionName: LocalizedStringSchema,
  superRegion: z.string(),
  superRegionName: LocalizedStringSchema,
  location: LocationSchema,
  scale3D: Scale3DSchema,
  rotation: RotationSchema,
});
export type CalloutResponse = z.infer<typeof CalloutSchema>;

export const MapSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  narrativeDescription: LocalizedStringSchema,
  tacticalDescription: LocalizedStringSchema,
  coordinates: LocalizedStringSchema,
  displayIcon: z.string(),
  listViewIcon: z.string(),
  listViewIconTall: z.string(),
  splash: z.string(),
  stylizedBackgroundImage: z.string(),
  premierBackgroundImage: z.string(),
  assetPath: z.string(),
  mapUrl: z.string(),
  xMultiplier: z.number(),
  yMultiplier: z.number(),
  xScalarToAdd: z.number(),
  yScalarToAdd: z.number(),
  callouts: z.array(CalloutSchema),
});

export const MapsSchema = z.array(MapSchema);

export type MapResponse = z.infer<typeof MapSchema>;
export type MapsResponse = z.infer<typeof MapsSchema>;

class MapsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getMapsV1(): Promise<MapsResponse> {
    return this.requestValorantApi<MapsResponse>('v1/maps');
  }

  public async getMapByUuidV1(uuid: string): Promise<MapResponse> {
    return this.requestValorantApi<MapResponse>(`v1/maps/${uuid}`);
  }
}

export { MapsEndpoints };
