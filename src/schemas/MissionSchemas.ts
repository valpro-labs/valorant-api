import { z } from 'zod';
import { LocalizedStringSchema } from './SharedSchemas';

/** Schema for a single mission objective. */
export const MissionObjectiveSchema = z.object({
  objectiveUuid: z.string().uuid(),
  value: z.number().int(),
});
/** A single mission objective's data. */
export type MissionObjectiveResponse = z.infer<typeof MissionObjectiveSchema>;

/** Schema for a single mission. */
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
/** A single mission's data. */
export type MissionResponse = z.infer<typeof MissionSchema>;

/** Schema for a list of missions. */
export const MissionsSchema = z.array(MissionSchema);
/** A list of missions. */
export type MissionsResponse = z.infer<typeof MissionsSchema>;
