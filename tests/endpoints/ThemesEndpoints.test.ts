import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ThemesEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getThemesV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.themesEndpoints.getThemesV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/themes'));
  });

  it('getThemeByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.themesEndpoints.getThemeByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/themes/test-uuid'));
  });
});
