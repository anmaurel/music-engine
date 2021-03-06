import { createApp, h } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import LoadScript from "vue-plugin-load-script";
import * as echarts from "echarts";
import { plugin } from "echarts-for-vue";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
    faFileMedical,
    faUser,
    faHistory,
    faLaptopHouse,
    faTabletAlt,
    faStopwatch,
    faCircleNotch,
    faPlus,
    faExclamationCircle,
    faSearch,
    faRandom,
} from "@fortawesome/free-solid-svg-icons";
import {
    faInstagram,
    faLinkedin,
    faSpotify,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
    faFileAudio,
    faIdBadge,
    faPlayCircle,
    faListAlt,
    faClock,
    faUser as faUserLight,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueGtag from "vue-gtag";
import i18n from "./utils/i18n";

import "./styles/main.scss";

library.add(
    faFileMedical,
    faPlayCircle,
    faUser,
    faFileAudio,
    faHistory,
    faSpotify,
    faLaptopHouse,
    faIdBadge,
    faTabletAlt,
    faListAlt,
    faInstagram,
    faTwitter,
    faLinkedin,
    faStopwatch,
    faCircleNotch,
    faClock,
    faUserLight,
    faPlus,
    faExclamationCircle,
    faSearch,
    faRandom,
);

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(store)
    .use(router)
    .use(i18n)
    .use(VueAxios, axios)
    .use(LoadScript)
    .use(plugin, { echarts, h })
    .use(
        VueGtag,
        {
            config: { id: "UA-156805620-2" },
            appName: "Music Engine",
            pageTrackerScreenviewEnabled: true,
        },
        router
    )
    .mount("#app");
