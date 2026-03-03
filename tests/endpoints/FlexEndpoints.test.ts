import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FlexEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getFlexV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.flexEndpoints.getFlexV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/flex'));
  });

  it('getFlexByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.flexEndpoints.getFlexByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/flex/test-uuid'));
  });
});
