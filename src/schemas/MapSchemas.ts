import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

/** Schema for a 3D location. */
export const LocationSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
/** A 3D location's data. */
export type LocationResponse = z.infer<typeof LocationSchema>;

/** Schema for a 3D scale. */
export const Scale3DSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
/** A 3D scale's data. */
export type Scale3DResponse = z.infer<typeof Scale3DSchema>;

/** Schema for a 3D rotation. */
export const RotationSchema = z.object({
  pitch: z.number(),
  yaw: z.number(),
  roll: z.number(),
});
/** A 3D rotation's data. */
export type RotationResponse = z.infer<typeof RotationSchema>;

/** Schema for a single map callout. */
export const CalloutSchema = z.object({
  regionName: LocalizedStringSchema,
  superRegion: z.string(),
  superRegionName: LocalizedStringSchema,
  location: LocationSchema,
  scale3D: Scale3DSchema,
  rotation: RotationSchema,
});
/** A single map callout's data. */
export type CalloutResponse = z.infer<typeof CalloutSchema>;

/** Schema for a single map. */
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
/** A single map's data. */
export type MapResponse = z.infer<typeof MapSchema>;

/** Schema for a list of maps. */
export const MapsSchema = z.array(MapSchema);
/** A list of maps. */
export type MapsResponse = z.infer<typeof MapsSchema>;
