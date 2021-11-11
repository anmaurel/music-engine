import { createStore } from "vuex";

import auth from "./modules/auth";
import spotify from "./modules/spotify";

export default createStore({
    modules: {
        auth,
        spotify,
    },
});