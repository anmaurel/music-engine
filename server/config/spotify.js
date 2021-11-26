import SpotifyWebApi from 'spotify-web-api-node';

export default {
    spotifyAccountsAPI: "https://accounts.spotify.com",
    scope: "user-read-recently-played user-top-read user-read-playback-state user-library-read",
    api: new SpotifyWebApi({
        clientId: process.env.SPOTIFY_ID,
        clientSecret: process.env.SPOTIFY_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URL,
    })
}