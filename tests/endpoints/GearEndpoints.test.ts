import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GearEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getGearV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.gearEndpoints.getGearV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/gear'));
  });

  it('getGearByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.gearEndpoints.getGearByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/gear/test-uuid'));
  });
});
