import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AgentsEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAgentsV1 calls correct URL with default isPlayableCharacter=true', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.agentsEndpoints.getAgentsV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/agents'));
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('isPlayableCharacter=true'));
  });

  it('getAgentsV1 calls correct URL with isPlayableCharacter=false', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.agentsEndpoints.getAgentsV1(false);
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('isPlayableCharacter=false'));
  });

  it('getAgentsByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.agentsEndpoints.getAgentsByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/agents/test-uuid'));
  });
});
