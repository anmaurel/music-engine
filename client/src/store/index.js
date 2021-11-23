import { createStore } from "vuex";

import app from "./modules/app";
import auth from "./modules/auth";
import spotify from "./modules/spotify";

export default createStore({
    modules: {
        app,
        auth,
        spotify,
    },
});