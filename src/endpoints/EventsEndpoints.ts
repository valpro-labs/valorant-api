import { z } from 'zod';

import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

export const EventSchema = z.object({
  uuid: z.string().uuid(),
  displayName: z.string(),
  shortDisplayName: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  assetPath: z.string(),
});

export const EventsSchema = z.array(EventSchema);

export type EventResponse = z.infer<typeof EventSchema>;
export type EventsResponse = z.infer<typeof EventsSchema>;

class EventsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all events
   * @returns Promise<EventsResponse>
   */
  public async getEventsV1(): Promise<EventsResponse> {
    return this.requestValorantApi<EventsResponse>('https://valorant-api.com/v1/events');
  }

  /**
   * Get event by UUID
   * @param uuid Event UUID
   * @returns Promise<EventResponse>
   */
  public async getEventByUuidV1(uuid: string): Promise<EventResponse> {
    return this.requestValorantApi<EventResponse>(`https://valorant-api.com/v1/events/${uuid}`);
  }
}

export { EventsEndpoints };
