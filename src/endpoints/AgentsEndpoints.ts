import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { AgentResponse, AgentsResponse } from '../schemas';

class AgentsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  public async getAgentsV1(isPlayableCharacter: boolean = true): Promise<AgentsResponse> {
    let endpointUrl = 'v1/agents';
    if (isPlayableCharacter) {
      endpointUrl += '?isPlayableCharacter=true'
    }

    return this.requestValorantApi<AgentsResponse>(endpointUrl);
  }

  public async getAgentsByUuidV1(uuid: string): Promise<AgentResponse> {
    return this.requestValorantApi<AgentResponse>(`v1/agents/${uuid}`);
  }
}

export { AgentsEndpoints };
