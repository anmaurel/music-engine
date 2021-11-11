import api from "@/api";
import router from "@/router";

const state = {
    accessToken: "",
    refreshToken: "",
    expiryTime: "",
    isAuth: false,
};

const getters = {
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken,
    getExpiryTime: (state) => state.expiryTime,
    getAuthStatus: (state) => state.isAuth,
};

const mutations = {
    SET_ACCESS_TOKEN(state, token) {
        state.accessToken = token;
        window.localStorage.setItem("spotify_access_token", token);
    },
    SET_REFRESH_TOKEN(state, token) {
        state.refreshToken = token;
        window.localStorage.setItem("spotify_refresh_token", token);
    },
    SET_EXPIRY_TIME(state, time) {
        state.expiryTime = time;
        window.localStorage.setItem("spotify_expiry_time", time);
    },
    SET_AUTH_STATUS(state, status) {
        state.isAuth = status;
    },
};

const actions = {
    refreshToken: async ({ commit, state, dispatch }) => {
        try {
            if (state.refreshToken) {
                const response = await api.auth.getRefreshTokenUrl(
                    state.refreshToken
                );
                commit("SET_ACCESS_TOKEN", response.data.access_token);

                const accessToken = response.data.access_token;

                dispatch("setAccessToken", accessToken);
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    },
    logout: () => {
        let script = document.createElement("script");

        script.src = "https://www.spotify.com/logout/";
        document.getElementById("app").appendChild(script);

        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_refresh_token');
        localStorage.removeItem('spotify_expiry_time');

        state.isAuth = false;

        router.push("/");

        setTimeout(() => {
            window.location.reload();
        }, 100);
    },
    setAccessToken({ commit }, token) {
        commit("SET_ACCESS_TOKEN", token);
    },
    setRefreshToken({ commit }, token) {
        commit("SET_REFRESH_TOKEN", token);
    },
    setExpiryTime({ commit }, time) {
        commit("SET_EXPIRY_TIME", time);
    },
    setAuthStatus({ commit }, status) {
        commit("SET_AUTH_STATUS", status);
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
