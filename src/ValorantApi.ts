import { ValorantApiConfig } from './endpoints/BaseEndpoint';
import { VersionEndpoint } from './endpoints/VersionEndpoint';
import { MapsEndpoints } from './endpoints/MapsEndpoints';
import { AgentsEndpoints } from './endpoints/AgentsEndpoints';
import { WeaponsEndpoints } from './endpoints/WeaponsEndpoints';
import { ContentTierEndpoints } from './endpoints/ContentTierEndpoints';
import { CurrenciesEndpoints } from './endpoints/CurrenciesEndpoints';
import { BundlesEndpoints } from './endpoints/BundlesEndpoints';
import { MissionsEndpoints } from './endpoints/MissionsEndpoints';
import { ObjectivesEndpoints } from './endpoints/ObjectivesEndpoints';
import { PlayerCardsEndpoints } from './endpoints/PlayerCardsEndpoints';
import { PlayerTitlesEndpoints } from './endpoints/PlayerTitlesEndpoints';
import { LevelBordersEndpoints } from './endpoints/LevelBordersEndpoints';
import { BuddiesEndpoints } from './endpoints/BuddiesEndpoints';
import { SpraysEndpoints } from './endpoints/SpraysEndpoints';
import { CompetitiveTiersEndpoints } from './endpoints/CompetitiveTiersEndpoints';
import { FlexEndpoints } from './endpoints/FlexEndpoints';
import { GameModesEndpoints } from './endpoints/GameModesEndpoints';
import { ContractsEndpoints } from './endpoints/ContractsEndpoints';
import { EventsEndpoints } from './endpoints/EventsEndpoints';
import { SeasonsEndpoints } from './endpoints/SeasonsEndpoints';
import { CeremoniesEndpoints } from './endpoints/CeremoniesEndpoints';
import { GearEndpoints } from './endpoints/GearEndpoints';
import { ThemesEndpoints } from './endpoints/ThemesEndpoints';

/**
 * Main client for the Valorant API.
 * Provides access to all available API endpoints through dedicated endpoint properties.
 *
 * @example
 * ```ts
 * import { ValorantApi } from '@valpro-labs/valorant-api';
 *
 * const api = new ValorantApi({ language: 'en-US' });
 * const agents = await api.agentsEndpoints.getAgentsV1();
 * ```
 */
class ValorantApi {
  /** Endpoint for retrieving the current Valorant build version. */
  public versionEndpoint: VersionEndpoint;
  /** Endpoints for retrieving map data. */
  public mapsEndpoints: MapsEndpoints;
  /** Endpoints for retrieving agent data. */
  public agentsEndpoints: AgentsEndpoints;
  /** Endpoints for retrieving weapon, skin, chroma, and level data. */
  public weaponsEndpoints: WeaponsEndpoints;
  /** Endpoints for retrieving content tier (rarity) data. */
  public contentTierEndpoints: ContentTierEndpoints;
  /** Endpoints for retrieving in-game currency data. */
  public currenciesEndpoints: CurrenciesEndpoints;
  /** Endpoints for retrieving store bundle data. */
  public bundlesEndpoints: BundlesEndpoints;
  /** Endpoints for retrieving mission data. */
  public missionsEndpoints: MissionsEndpoints;
  /** Endpoints for retrieving objective data. */
  public objectivesEndpoints: ObjectivesEndpoints;
  /** Endpoints for retrieving player card data. */
  public playerCardsEndpoints: PlayerCardsEndpoints;
  /** Endpoints for retrieving player title data. */
  public playerTitlesEndpoints: PlayerTitlesEndpoints;
  /** Endpoints for retrieving level border data. */
  public levelBordersEndpoints: LevelBordersEndpoints;
  /** Endpoints for retrieving buddy (gun charm) data. */
  public buddiesEndpoints: BuddiesEndpoints;
  /** Endpoints for retrieving spray data. */
  public spraysEndpoints: SpraysEndpoints;
  /** Endpoints for retrieving competitive tier data. */
  public competitiveTiersEndpoints: CompetitiveTiersEndpoints;
  /** Endpoints for retrieving flex data. */
  public flexEndpoints: FlexEndpoints;
  /** Endpoints for retrieving game mode and equippable data. */
  public gameModesEndpoints: GameModesEndpoints;
  /** Endpoints for retrieving contract data. */
  public contractsEndpoints: ContractsEndpoints;
  /** Endpoints for retrieving event data. */
  public eventsEndpoints: EventsEndpoints;
  /** Endpoints for retrieving season and competitive season data. */
  public seasonsEndpoints: SeasonsEndpoints;
  /** Endpoints for retrieving ceremony data. */
  public ceremoniesEndpoints: CeremoniesEndpoints;
  /** Endpoints for retrieving gear (armor) data. */
  public gearEndpoints: GearEndpoints;
  /** Endpoints for retrieving theme data. */
  public themesEndpoints: ThemesEndpoints;

  /**
   * Creates a new Valorant API client.
   * @param config - Optional configuration for the API client.
   */
  constructor(config?: ValorantApiConfig) {
    this.versionEndpoint = new VersionEndpoint(config);
    this.mapsEndpoints = new MapsEndpoints(config);
    this.agentsEndpoints = new AgentsEndpoints(config);
    this.weaponsEndpoints = new WeaponsEndpoints(config);
    this.contentTierEndpoints = new ContentTierEndpoints(config);
    this.currenciesEndpoints = new CurrenciesEndpoints(config);
    this.bundlesEndpoints = new BundlesEndpoints(config);
    this.missionsEndpoints = new MissionsEndpoints(config);
    this.objectivesEndpoints = new ObjectivesEndpoints(config);
    this.playerCardsEndpoints = new PlayerCardsEndpoints(config);
    this.playerTitlesEndpoints = new PlayerTitlesEndpoints(config);
    this.levelBordersEndpoints = new LevelBordersEndpoints(config);
    this.buddiesEndpoints = new BuddiesEndpoints(config);
    this.spraysEndpoints = new SpraysEndpoints(config);
    this.competitiveTiersEndpoints = new CompetitiveTiersEndpoints(config);
    this.flexEndpoints = new FlexEndpoints(config);
    this.gameModesEndpoints = new GameModesEndpoints(config);
    this.contractsEndpoints = new ContractsEndpoints(config);
    this.eventsEndpoints = new EventsEndpoints(config);
    this.seasonsEndpoints = new SeasonsEndpoints(config);
    this.ceremoniesEndpoints = new CeremoniesEndpoints(config);
    this.gearEndpoints = new GearEndpoints(config);
    this.themesEndpoints = new ThemesEndpoints(config);
  }
}

export { ValorantApi };
