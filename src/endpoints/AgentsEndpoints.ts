import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { AgentResponse, AgentsResponse } from '../schemas';

class AgentsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getAgentsV1(isPlayableCharacter: boolean = true): Promise<AgentsResponse> {
    const url = new URL('v1/agents', 'https://valorant-api.com/')
    url.searchParams.set('isPlayableCharacter', isPlayableCharacter.toString());

    return this.requestValorantApi<AgentsResponse>(url.toString());
  }

  public async getAgentsByUuidV1(uuid: string): Promise<AgentResponse> {
    return this.requestValorantApi<AgentResponse>(`v1/agents/${uuid}`);
  }
}

export { AgentsEndpoints };
