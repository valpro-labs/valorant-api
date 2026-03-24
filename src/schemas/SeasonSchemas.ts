import { z } from 'zod';

/** Schema for a single season. */
export const SeasonSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  title: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  startTime: z.string(),
  endTime: z.string(),
  parentUuid: z.string().uuid().optional().nullable(),
  assetPath: z.string(),
});
/** A single season's data. */
export type SeasonResponse = z.infer<typeof SeasonSchema>;

/** Schema for a list of seasons. */
export const SeasonsSchema = z.array(SeasonSchema);
/** A list of seasons. */
export type SeasonsResponse = z.infer<typeof SeasonsSchema>;

/** Schema for a single competitive season border. */
export const CompetitiveSeasonBorderSchema = z.object({
  uuid: z.string().uuid(),
  level: z.number().int(),
  winsRequired: z.number().int(),
  displayIcon: z.string().nullable(),
  smallIcon: z.string().nullable(),
  assetPath: z.string(),
});
/** A single competitive season border's data. */
export type CompetitiveSeasonBorderResponse = z.infer<typeof CompetitiveSeasonBorderSchema>;

/** Schema for a single competitive season. */
export const CompetitiveSeasonSchema = z.object({
  uuid: z.string().uuid(),
  startTime: z.string(),
  endTime: z.string(),
  seasonUuid: z.string().uuid(),
  competitiveTiersUuid: z.string().uuid(),
  borders: z.array(CompetitiveSeasonBorderSchema).nullable(),
  assetPath: z.string(),
});
/** A single competitive season's data. */
export type CompetitiveSeasonResponse = z.infer<typeof CompetitiveSeasonSchema>;

/** Schema for a list of competitive seasons. */
export const CompetitiveSeasonsSchema = z.array(CompetitiveSeasonSchema);
/** A list of competitive seasons. */
export type CompetitiveSeasonsResponse = z.infer<typeof CompetitiveSeasonsSchema>;
