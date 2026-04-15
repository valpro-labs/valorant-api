# Valorant-API (unofficial)

[![npm](https://img.shields.io/npm/v/@valpro-labs/valorant-api.svg)](https://www.npmjs.com/package/@valpro-labs/valorant-api)

A typed TypeScript client for [valorant-api.com](https://valorant-api.com/). This library provides easy access to Valorant game data with full TypeScript support.

Full API reference is available at **[valpro-labs.github.io/valorant-api](https://valpro-labs.github.io/valorant-api/)**, auto-generated from source by [TypeDoc](https://typedoc.org/).

## Features

- **Full Type Safety**: All responses are typed for a better developer experience.
- **Zod Powered Types**: Use [Zod](https://zod.dev/) for robust schema definitions and type inference.
- **Comprehensive Coverage**: Supporting endpoints for Agents, Maps, Weapons, Contracts, and more.

- **Clean API**: Intuitive organizational structure for accessing different game resources.

## Installation

```bash
npm install @valpro-labs/valorant-api
```

## Example

```typescript
import { ValorantApi } from '@valpro-labs/valorant-api';

const valorantApi = new ValorantApi({ language: 'en-US' });

// Get all agents
const agents = await valorantApi.agentsEndpoints.getAgentsV1();

// Get version info
const version = await valorantApi.versionEndpoint.getVersionV1();
```

## Supported Endpoints

- Agents
- Maps
- Weapons & Skins
- Bundles
- Contracts
- Competitive Tiers
- And many more...

> **@valpro-labs/valorant-api** isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc..