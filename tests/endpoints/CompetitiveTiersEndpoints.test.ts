import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CompetitiveTiersEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getCompetitiveTiersV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.competitiveTiersEndpoints.getCompetitiveTiersV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/competitivetiers'));
  });

  it('getCompetitiveTiersByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.competitiveTiersEndpoints.getCompetitiveTiersByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/competitivetiers/test-uuid'));
  });
});
