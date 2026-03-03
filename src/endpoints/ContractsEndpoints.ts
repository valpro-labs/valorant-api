import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { ContractResponse, ContractsResponse } from '../schemas';

// Types already defined above

class ContractsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all contracts
   * @returns Promise<ContractsResponse>
   */
  public async getContractsV1(): Promise<ContractsResponse> {
    return this.requestValorantApi<ContractsResponse>('v1/contracts');
  }

  /**
   * Get contract by UUID
   * @param uuid Contract UUID
   * @returns Promise<ContractResponse>
   */
  public async getContractByUuidV1(uuid: string): Promise<ContractResponse> {
    return this.requestValorantApi<ContractResponse>(`v1/contracts/${uuid}`);
  }
}

export { ContractsEndpoints };
