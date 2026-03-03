import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BuddiesEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getBuddiesV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.buddiesEndpoints.getBuddiesV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/buddies'));
  });

  it('getBuddyByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.buddiesEndpoints.getBuddyByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/buddies/test-uuid'));
  });

  it('getBuddyLevelByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.buddiesEndpoints.getBuddyLevelByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/buddies/levels/test-uuid'));
  });
});
