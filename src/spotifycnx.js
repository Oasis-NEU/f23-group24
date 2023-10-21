import { SpotifyWebApi } from '@spotify/web-api-ts-sdk';

const sdk = SpotifyApi.withClientCredentials("client-id", "secret", ["scope1", "scope2"]);