# Valorant-API (unofficial)

## Installation

```bash
npm install @valpro-labs/valorant-api
```

## Example
```js
import { ValorantApi } from '@valpro-labs/valorant-api';

const valorantApi = new ValorantApi({ language: 'en-US' });

const version = await valorantApi.versionEndpoint.getVersionV1();
```

> **@valpro-labs/valorant-api** isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.