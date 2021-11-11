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
};
