import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GameModesEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getGameModesV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.gameModesEndpoints.getGameModesV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/gamemodes'));
  });

  it('getGameModeByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.gameModesEndpoints.getGameModeByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/gamemodes/test-uuid'));
  });

  it('getGameModeEquippablesV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.gameModesEndpoints.getGameModeEquippablesV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/gamemodes/equippables'));
  });

  it('getGameModeEquippableByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.gameModesEndpoints.getGameModeEquippableByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/gamemodes/equippables/test-uuid'));
  });
});
