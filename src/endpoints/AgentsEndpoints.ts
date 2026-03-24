import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { AgentResponse, AgentsResponse } from '../schemas';

/**
 * Provides access to the Valorant API agents endpoints.
 */
class AgentsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all agents.
   * @param isPlayableCharacter - Filter to only playable characters. Defaults to `true`.
   * @returns A list of all agents.
   */
  public async getAgentsV1(isPlayableCharacter: boolean = true): Promise<AgentsResponse> {
    let endpointUrl = 'v1/agents';
    if (isPlayableCharacter) {
      endpointUrl += '?isPlayableCharacter=true'
    }

    return this.requestValorantApi<AgentsResponse>(endpointUrl);
  }

  /**
   * Get an agent by UUID.
   * @param uuid - The UUID of the agent.
   * @returns The agent matching the given UUID.
   */
  public async getAgentsByUuidV1(uuid: string): Promise<AgentResponse> {
    return this.requestValorantApi<AgentResponse>(`v1/agents/${uuid}`);
  }
}

export { AgentsEndpoints };
