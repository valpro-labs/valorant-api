import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LevelBordersEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getLevelBordersV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.levelBordersEndpoints.getLevelBordersV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/levelborders'));
  });

  it('getLevelBorderByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.levelBordersEndpoints.getLevelBorderByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/levelborders/test-uuid'));
  });
});
