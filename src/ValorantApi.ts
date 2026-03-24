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

class ValorantApi {
  public versionEndpoint: VersionEndpoint;
  public mapsEndpoints: MapsEndpoints;
  public agentsEndpoints: AgentsEndpoints;
  public weaponsEndpoints: WeaponsEndpoints;
  public contentTierEndpoints: ContentTierEndpoints;
  public currenciesEndpoints: CurrenciesEndpoints;
  public bundlesEndpoints: BundlesEndpoints;
  public missionsEndpoints: MissionsEndpoints;
  public objectivesEndpoints: ObjectivesEndpoints;
  public playerCardsEndpoints: PlayerCardsEndpoints;
  public playerTitlesEndpoints: PlayerTitlesEndpoints;
  public levelBordersEndpoints: LevelBordersEndpoints;
  public buddiesEndpoints: BuddiesEndpoints;
  public spraysEndpoints: SpraysEndpoints;
  public competitiveTiersEndpoints: CompetitiveTiersEndpoints;
  public flexEndpoints: FlexEndpoints;
  public gameModesEndpoints: GameModesEndpoints;
  public contractsEndpoints: ContractsEndpoints;
  public eventsEndpoints: EventsEndpoints;
  public seasonsEndpoints: SeasonsEndpoints;
  public ceremoniesEndpoints: CeremoniesEndpoints;
  public gearEndpoints: GearEndpoints;
  public themesEndpoints: ThemesEndpoints;

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
