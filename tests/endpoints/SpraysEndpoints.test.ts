import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SpraysEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getSpraysV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.spraysEndpoints.getSpraysV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/sprays'));
  });

  it('getSprayByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.spraysEndpoints.getSprayByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/sprays/test-uuid'));
  });
});
