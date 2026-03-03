import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EventsEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getEventsV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.eventsEndpoints.getEventsV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/events'));
  });

  it('getEventByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.eventsEndpoints.getEventByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/events/test-uuid'));
  });
});
