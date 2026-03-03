import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BundlesEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getBundlesV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.bundlesEndpoints.getBundlesV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/bundles'));
  });

  it('getBundleByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.bundlesEndpoints.getBundleByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/bundles/test-uuid'));
  });
});
