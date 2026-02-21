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

import { ValorantApiConfig } from './endpoints/BaseEndpoint';

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
  }
}

export * from './endpoints/AgentsEndpoints';
export * from './endpoints/BaseEndpoint';
export * from './endpoints/BuddiesEndpoints';
export * from './endpoints/BundlesEndpoints';
export * from './endpoints/CompetitiveTiersEndpoints';
export * from './endpoints/ContentTierEndpoints';
export * from './endpoints/CurrenciesEndpoints';
export * from './endpoints/LevelBordersEndpoints';
export * from './endpoints/MapsEndpoints';
export * from './endpoints/MissionsEndpoints';
export * from './endpoints/ObjectivesEndpoints';
export * from './endpoints/PlayerCardsEndpoints';
export * from './endpoints/PlayerTitlesEndpoints';
export * from './endpoints/SpraysEndpoints';
export * from './endpoints/VersionEndpoint';
export * from './endpoints/WeaponsEndpoints';

export { ValorantApi };
