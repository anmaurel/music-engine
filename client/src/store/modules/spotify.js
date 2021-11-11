import api from "@/api";

const state = {
    profile: "",
    devices: "",
    recentlyPlayed: "",
    topArtists: "",
    topTracks: "",
};

const getters = {
    getProfile: (state) => state.profile,
    getDevices: (state) => state.devices,
    getRecentlyPlayed: (state) => state.recentlyPlayed,
    getTopArtists: (state) => state.topArtists,
    getTopTracks: (state) => state.topTracks,
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
    async getTopArtists({ commit }, limit, time_range) {
        try {
            const response = await api.spotify.getTopArtists(limit, time_range);
            commit("SET_TOP_ARTISTS", response.data);
        } catch (error) {
            console.log(error);
        }
    },
    async getTopTracks({ commit }, limit, time_range) {
        try {
            const response = await api.spotify.getTopTracks(limit, time_range);
            commit("SET_TOP_TRACKS", response.data);
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
