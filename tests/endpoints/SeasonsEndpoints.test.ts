import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SeasonsEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getSeasonsV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: 200 } });

    await api.seasonsEndpoints.getSeasonsV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/seasons'));
  });

  it('getSeasonByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: 200 } });

    await api.seasonsEndpoints.getSeasonByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/seasons/test-uuid'));
  });

  it('getCompetitiveSeasonsV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: 200 } });

    await api.seasonsEndpoints.getCompetitiveSeasonsV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/seasons/competitive'));
  });

  it('getCompetitiveSeasonByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: 200 } });

    await api.seasonsEndpoints.getCompetitiveSeasonByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/seasons/competitive/test-uuid'));
  });
});
