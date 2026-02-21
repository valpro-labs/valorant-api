import axios from 'axios';

import { ValorantApi } from '../src/index';
import { BaseEndpoint } from '../src/endpoints/BaseEndpoint';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ValorantApi & BaseEndpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('BaseEndpoint', () => {
    it('initializes with default language en-US', async () => {
      mockedAxios.get.mockResolvedValue({ data: { data: 'test-data', status: '200' } });
      const endpoint = new BaseEndpoint();

      const res = await endpoint.requestValorantApi('https://valorant-api.com/v1/test');

      expect(res).toBe('test-data');
      expect(mockedAxios.get).toHaveBeenCalledWith('https://valorant-api.com/v1/test?language=en-US');
    });

    it('accepts custom language', async () => {
      mockedAxios.get.mockResolvedValue({ data: { data: 'test-data', status: '200' } });
      const endpoint = new BaseEndpoint({ language: 'zh-TW' });

      await endpoint.requestValorantApi('https://valorant-api.com/v1/test');

      expect(mockedAxios.get).toHaveBeenCalledWith('https://valorant-api.com/v1/test?language=zh-TW');
    });
  });

  describe('ValorantApi', () => {
    it('constructs all endpoints internally', () => {
      const api = new ValorantApi();
      expect(api.agentsEndpoints).toBeDefined();
      expect(api.weaponsEndpoints).toBeDefined();
      expect(api.mapsEndpoints).toBeDefined();
    });

    it('passes language config to endpoints', async () => {
      const api = new ValorantApi({ language: 'ja-JP' });

      mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

      await api.agentsEndpoints.getAgentsV1();

      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('language=ja-JP'));
    });
  });

  describe('Various Endpoints', () => {
    it('AgentsEndpoints calls correct URL', async () => {
      const api = new ValorantApi();
      mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

      await api.agentsEndpoints.getAgentsV1();
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/agents'));

      await api.agentsEndpoints.getAgentsByUuidV1('test-uuid');
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/agents/test-uuid'));
    });

    it('WeaponsEndpoints calls correct URL', async () => {
      const api = new ValorantApi();
      mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

      await api.weaponsEndpoints.getWeaponsV1();
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/weapons'));

      await api.weaponsEndpoints.getWeaponByUuidV1('test-uuid');
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/weapons/test-uuid'));
    });
  });
});
