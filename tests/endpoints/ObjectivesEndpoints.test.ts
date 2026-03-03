import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ObjectivesEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getObjectivesV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.objectivesEndpoints.getObjectivesV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/objectives'));
  });

  it('getObjectiveByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.objectivesEndpoints.getObjectiveByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/objectives/test-uuid'));
  });
});
