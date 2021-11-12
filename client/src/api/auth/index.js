import req from "./request.js";

export default {
    getLoginUrl: () => {
        return req.get("/login");
    },
    getRefreshTokenUrl: (refresh_token) => {
        return req.get(`/refresh-token?refresh_token=${refresh_token}`);
    },
};
