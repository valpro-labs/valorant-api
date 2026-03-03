import { z } from 'zod';

export const EventSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  shortDisplayName: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  assetPath: z.string(),
});
export type EventResponse = z.infer<typeof EventSchema>;

export const EventsSchema = z.array(EventSchema);
export type EventsResponse = z.infer<typeof EventsSchema>;
