import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

const LocalizedStringSchema = z.string();

const LocationSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

const Scale3DSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

const RotationSchema = z.object({
  pitch: z.number(),
  yaw: z.number(),
  roll: z.number(),
});

const CalloutSchema = z.object({
  regionName: LocalizedStringSchema,
  superRegion: z.string(),
  superRegionName: LocalizedStringSchema,
  location: LocationSchema,
  scale3D: Scale3DSchema,
  rotation: RotationSchema,
});

const MapSchema = z.object({
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

const MapsSchema = z.array(MapSchema);

export type MapResponse = z.infer<typeof MapSchema>;
export type MapsResponse = z.infer<typeof MapsSchema>;

class MapsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getMapsV1(): Promise<MapsResponse> {
    return this.requestValorantApi<MapsResponse>('https://valorant-api.com/v1/maps');
  }

  public async getMapByUuidV1(uuid: string): Promise<MapResponse> {
    return this.requestValorantApi<MapResponse>(`https://valorant-api.com/v1/maps/${uuid}`);
  }
}

export { MapsEndpoints };
