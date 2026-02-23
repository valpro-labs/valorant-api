import axios from 'axios';
import { ValorantApi } from '../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ContractsEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getContractsV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.contractsEndpoints.getContractsV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/contracts'));
  });

  it('getContractByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.contractsEndpoints.getContractByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/contracts/test-uuid'));
  });
});
