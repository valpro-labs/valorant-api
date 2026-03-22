import { z } from 'zod';

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
export type SeasonResponse = z.infer<typeof SeasonSchema>;

export const SeasonsSchema = z.array(SeasonSchema);
export type SeasonsResponse = z.infer<typeof SeasonsSchema>;

export const CompetitiveSeasonBorderSchema = z.object({
  uuid: z.string().uuid(),
  level: z.number().int(),
  winsRequired: z.number().int(),
  displayIcon: z.string().nullable(),
  smallIcon: z.string().nullable(),
  assetPath: z.string(),
});
export type CompetitiveSeasonBorderResponse = z.infer<typeof CompetitiveSeasonBorderSchema>;

export const CompetitiveSeasonSchema = z.object({
  uuid: z.string().uuid(),
  startTime: z.string(),
  endTime: z.string(),
  seasonUuid: z.string().uuid(),
  competitiveTiersUuid: z.string().uuid(),
  borders: z.array(CompetitiveSeasonBorderSchema).nullable(),
  assetPath: z.string(),
});
export type CompetitiveSeasonResponse = z.infer<typeof CompetitiveSeasonSchema>;

export const CompetitiveSeasonsSchema = z.array(CompetitiveSeasonSchema);
export type CompetitiveSeasonsResponse = z.infer<typeof CompetitiveSeasonsSchema>;
