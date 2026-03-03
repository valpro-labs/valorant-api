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
