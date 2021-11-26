import SpotifyWebApi from "spotify-web-api-node";

export default {
    spotifyAccountsAPI: "https://accounts.spotify.com",
    scope: "ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-private user-read-email user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public",
    api: new SpotifyWebApi({
        clientId: process.env.SPOTIFY_ID,
        clientSecret: process.env.SPOTIFY_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URL,
    }),
};