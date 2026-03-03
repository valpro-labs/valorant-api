import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PlayerTitlesEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getPlayerTitlesV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.playerTitlesEndpoints.getPlayerTitlesV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/playertitles'));
  });

  it('getPlayerTitleByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.playerTitlesEndpoints.getPlayerTitleByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/playertitles/test-uuid'));
  });
});
