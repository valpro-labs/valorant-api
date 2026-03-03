import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

export const MissionObjectiveSchema = z.object({
  objectiveUuid: z.string().uuid(),
  value: z.number().int(),
});
export type MissionObjectiveResponse = z.infer<typeof MissionObjectiveSchema>;

export const MissionSchema = z.object({
  uuid: z.string().uuid(),
  displayName: LocalizedStringSchema,
  title: LocalizedStringSchema,
  type: z.string(),
  xpGrant: z.number().int(),
  progressToComplete: z.number().int(),
  activationDate: z.string().datetime(),
  expirationDate: z.string().datetime(),
  assetPath: z.string(),
  objectives: z.array(MissionObjectiveSchema),
});
export type MissionResponse = z.infer<typeof MissionSchema>;

export const MissionsSchema = z.array(MissionSchema);
export type MissionsResponse = z.infer<typeof MissionsSchema>;
