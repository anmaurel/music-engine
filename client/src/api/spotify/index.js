import req from "./request.js";

export default {
    getProfile: () => {
        return req.get("/me");
    },
    getRecentlyPlayed: (limit) => {
        return req.get("/me/player/recently-played", {
            params: {
                limit
            },
        });
    },
    getTopArtists: (limit, time_range) => {
        return req.get("/me/top/artists", {
            params: {
                limit,
                time_range
            },
        });
    },
    getTopTracks: (limit, time_range) => {
        return req.get("/me/top/tracks", {
            params: {
                limit,
                time_range
            },
        });
    },
    getDevices: () => {
        return req.get("/me/player/devices");
    },
    getArtist: (id) => {
        return req.get(`/artists/${id}`);
    },
    getRecommendations: (limit, seed_artists, seed_genres, seed_tracks) => {
        return req.get("/recommendations", {
            params: {
                limit,
                seed_artists,
                seed_genres,
                seed_tracks
            },
        });
    },
    createPlaylist: (user_id, name) => {
        return req.post(`/users/${user_id}/playlists`, {
            name: name,
        });
    },
    addItemsPlaylist: (playlist_id, uris) => {
        return req.post(`/playlists/${playlist_id}/tracks`, {
            uris: uris,
        });
    },
    searchItem: (q, type, limit) => {
        return req.get("/search", {
            params: {
                q,
                type,
                limit,
            },
        });
    }
};
