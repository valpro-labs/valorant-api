import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CurrenciesEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getCurrenciesV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.currenciesEndpoints.getCurrenciesV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/currencies'));
  });

  it('getCurrencyByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.currenciesEndpoints.getCurrencyByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/currencies/test-uuid'));
  });
});
