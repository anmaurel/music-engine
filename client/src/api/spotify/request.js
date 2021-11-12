import axios from "axios";

import store from "@/store";

// const token = window.localStorage.getItem("spotify_access_token");

const req = axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
        // "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

req.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem("spotify_access_token");
        if (token) {
            config.headers.common["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

req.interceptors.response.use(
    (res) => {
        return res;
    },
    async (error) => {
        const { status, data } = error.response;

        if (status === 401) {
            try {
                store.dispatch("auth/refreshToken");
            } catch (_error) {
                return Promise.reject(_error);
            }
        }

        if (status === 403 && data) {
            return Promise.reject(data);
        }
    }
);

export default req;
