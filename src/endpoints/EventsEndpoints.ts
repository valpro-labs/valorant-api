import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { EventResponse, EventsResponse } from '../schemas';

class EventsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all events
   * @returns Promise<EventsResponse>
   */
  public async getEventsV1(): Promise<EventsResponse> {
    return this.requestValorantApi<EventsResponse>('v1/events');
  }

  /**
   * Get event by UUID
   * @param uuid Event UUID
   * @returns Promise<EventResponse>
   */
  public async getEventByUuidV1(uuid: string): Promise<EventResponse> {
    return this.requestValorantApi<EventResponse>(`v1/events/${uuid}`);
  }
}

export { EventsEndpoints };
