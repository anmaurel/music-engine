import api from "@/api";

const state = {
    profile: "",
    devices: "",
    recentlyPlayed: "",
    topArtists: "",
    topTracks: "",
    artist: "",
    recommendations: "",
    playlistGenStatus: "p1",
    playlistGenStartTracks: [],
    searchResults: "",
};

const getters = {
    getProfile: (state) => state.profile,
    getDevices: (state) => state.devices,
    getRecentlyPlayed: (state) => state.recentlyPlayed,
    getTopArtists: (state) => state.topArtists,
    getTopTracks: (state) => state.topTracks,
    getArtist: (state) => state.artist,
    getRecommendations: (state) => state.recommendations,
    getPlaylistGenStatus: (state) => state.playlistGenStatus,
    getPlaylistGenStartTracks: (state) => state.playlistGenStartTracks,
    getSearchResults: (state) => state.searchResults,
};

const mutations = {
    SET_PROFILE(state, profile) {
        state.profile = profile;
    },
    SET_DEVICES(state, devices) {
        state.devices = devices;
    },
    SET_RECENTLY_PLAYED(state, tracks) {
        state.recentlyPlayed = tracks;
    },
    SET_TOP_ARTISTS(state, artists) {
        state.topArtists = artists;
    },
    SET_TOP_TRACKS(state, tracks) {
        state.topTracks = tracks;
    },
    SET_ARTIST(state, artist) {
        state.artist = artist;
    },
    SET_RECOMMENDATIONS(state, recommendations) {
        state.recommendations = recommendations;
    },
    SET_PLAYLIST_GEN_STATUS(state, status) {
        state.playlistGenStatus = status;
    },
    SET_PLAYLIST_GEN_START_TRACKS(state, tracks) {
        state.playlistGenStartTracks.push(tracks);
    },
    SET_SEARCH_RESULTS(state, results) {
        state.searchResults = results;
    },
};

const actions = {
    async getProfile({ commit }) {
        try {
            const response = await api.spotify.getProfile();
            commit("SET_PROFILE", response.data);
        } catch (error) {
            console.log(error);
        }
    },
    async getDevices({ commit }) {
        try {
            const response = await api.spotify.getDevices();
            commit("SET_DEVICES", response.data);
        } catch (error) {
            console.log(error);
        }
    },
    async getRecentlyPlayed({ commit }, limit) {
        try {
            const response = await api.spotify.getRecentlyPlayed(limit);
            commit("SET_RECENTLY_PLAYED", response.data);
        } catch (error) {
            console.log(error);
        }
    },
    async getTopArtists({ commit }, { limit, time_range }) {
        try {
            const response = await api.spotify.getTopArtists(limit, time_range);
            commit("SET_TOP_ARTISTS", response.data);
        } catch (error) {
            console.log(error);
        }
    },
    async getTopTracks({ commit }, { limit, time_range }) {
        try {
            const response = await api.spotify.getTopTracks(limit, time_range);
            commit("SET_TOP_TRACKS", response.data);
        } catch (error) {
            console.log(error);
        }
    },
    async getArtist({ commit }, id) {
        try {
            const response = await api.spotify.getArtist(id);
            commit("SET_ARTIST", response.data);
        } catch (error) {
            console.log(error);
        }
    },
    async getRecommendations({ commit }, { limit, seed_artists, seed_genres, seed_tracks }) {
        try {
            const response = await api.spotify.getRecommendations(limit, seed_artists, seed_genres, seed_tracks);
            commit("SET_RECOMMENDATIONS", response.data);
        } catch (error) {
            console.log(error);
        }
    },
    async setPlaylistGenStatus({ commit }, status) {
        try {
            commit("SET_PLAYLIST_GEN_STATUS", status);
        } catch (error) {
            console.log(error);
        }
    },
    async setPlaylistGenStartTracks({ commit }, tracks) {
        try {
            commit("SET_PLAYLIST_GEN_START_TRACKS", tracks);
        } catch (error) {
            console.log(error);
        }
    },
    async createPlaylist({ commit }, { user_id, name }) {
        try {
            const response = await api.spotify.createPlaylist(user_id, name);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async addItemsPlaylist({ commit }, { playlist_id, uris }) {
        try {
            await api.spotify.addItemsPlaylist(playlist_id, uris);
        } catch (error) {
            console.log(error);
        }
    },
    async searchItem({ commit }, { q, type, limit }) {
        try {
            const response = await api.spotify.searchItem(q, type, limit);
            commit("SET_SEARCH_RESULTS", response.data);
        } catch (error) {
            console.log(error);
        }
    },
};

const module = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};

export default module;
