import { BaseEndpoint, ValorantApiConfig } from './BaseEndpoint';

import { ContractResponse, ContractsResponse } from '../schemas';

// Types already defined above

/**
 * Provides access to the Valorant API contracts endpoints.
 */
class ContractsEndpoints extends BaseEndpoint {
  constructor(config?: ValorantApiConfig) {
    super(config);
  }

  /**
   * Get all contracts.
   * @returns An array of {@link ContractResponse} objects.
   */
  public async getContractsV1(): Promise<ContractsResponse> {
    return this.requestValorantApi<ContractsResponse>('v1/contracts');
  }

  /**
   * Get a contract by UUID.
   * @param uuid - The UUID of the contract.
   * @returns The {@link ContractResponse} matching the given UUID.
   */
  public async getContractByUuidV1(uuid: string): Promise<ContractResponse> {
    return this.requestValorantApi<ContractResponse>(`v1/contracts/${uuid}`);
  }
}

export { ContractsEndpoints };
