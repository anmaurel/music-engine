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
    createPlaylist: (user_id, name, description) => {
        return req.post(`/users/${user_id}/playlists`, {
            params: {
                name,
                description
            },
        });
    },
};
