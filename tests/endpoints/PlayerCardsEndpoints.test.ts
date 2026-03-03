import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PlayerCardsEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getPlayerCardsV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.playerCardsEndpoints.getPlayerCardsV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/playercards'));
  });

  it('getPlayerCardByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.playerCardsEndpoints.getPlayerCardByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/playercards/test-uuid'));
  });
});
