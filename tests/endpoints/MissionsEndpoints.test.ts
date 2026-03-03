import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MissionsEndpoints', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('getMissionsV1 calls correct URL', async () => {
        const api = new ValorantApi();
        mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

        await api.missionsEndpoints.getMissionsV1();
        expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/missions'));
    });

    it('getMissionByUuidV1 calls correct URL', async () => {
        const api = new ValorantApi();
        mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

        await api.missionsEndpoints.getMissionByUuidV1('test-uuid');
        expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/missions/test-uuid'));
    });
});
