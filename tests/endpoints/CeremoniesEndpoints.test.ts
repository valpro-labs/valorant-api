import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CeremoniesEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getCeremoniesV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.ceremoniesEndpoints.getCeremoniesV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/ceremonies'));
  });

  it('getCeremonyByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.ceremoniesEndpoints.getCeremonyByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/ceremonies/test-uuid'));
  });
});
