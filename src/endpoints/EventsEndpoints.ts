import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { EventResponse, EventsResponse } from '../schemas';

/**
 * Provides access to the Valorant API events endpoints.
 */
class EventsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all events.
   * @returns An array of {@link EventResponse} objects.
   */
  public async getEventsV1(): Promise<EventsResponse> {
    return this.requestValorantApi<EventsResponse>('v1/events');
  }

  /**
   * Get an event by its UUID.
   * @param uuid - The UUID of the event.
   * @returns The {@link EventResponse} matching the given UUID.
   */
  public async getEventByUuidV1(uuid: string): Promise<EventResponse> {
    return this.requestValorantApi<EventResponse>(`v1/events/${uuid}`);
  }
}

export { EventsEndpoints };
