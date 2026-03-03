import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ContentTierEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getContentTiersV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.contentTierEndpoints.getContentTiersV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/contenttiers'));
  });

  it('getContentTierByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.contentTierEndpoints.getContentTierByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/contenttiers/test-uuid'));
  });
});
