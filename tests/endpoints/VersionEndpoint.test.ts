import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('VersionEndpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getVersionV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.versionEndpoint.getVersionV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/version'));
  });
});
