import { z } from 'zod';

/** Schema for a single in-game event. */
export const EventSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  shortDisplayName: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  assetPath: z.string(),
});
/** A single in-game event's data. */
export type EventResponse = z.infer<typeof EventSchema>;

/** Schema for a list of in-game events. */
export const EventsSchema = z.array(EventSchema);
/** A list of in-game events. */
export type EventsResponse = z.infer<typeof EventsSchema>;
