import axios from 'axios';
import { ValorantApi } from '../../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WeaponsEndpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getWeaponsV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.weaponsEndpoints.getWeaponsV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/weapons'));
  });

  it('getWeaponByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.weaponsEndpoints.getWeaponByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/weapons/test-uuid'));
  });

  it('getWeaponSkinsV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: [], status: '200' } });

    await api.weaponsEndpoints.getWeaponSkinsV1();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/weapons/skins'));
  });

  it('getWeaponSkinByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.weaponsEndpoints.getWeaponSkinByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/weapons/skins/test-uuid'));
  });

  it('getWeaponSkinChromaByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.weaponsEndpoints.getWeaponSkinChromaByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/weapons/skinchromas/test-uuid'));
  });

  it('getWeaponSkinLevelByUuidV1 calls correct URL', async () => {
    const api = new ValorantApi();
    mockedAxios.get.mockResolvedValue({ data: { data: {}, status: '200' } });

    await api.weaponsEndpoints.getWeaponSkinLevelByUuidV1('test-uuid');
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('v1/weapons/skinlevels/test-uuid'));
  });
});
