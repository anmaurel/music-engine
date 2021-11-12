import { createApp, h } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import LoadScript from 'vue-plugin-load-script';
import * as echarts from 'echarts';
import { plugin } from 'echarts-for-vue';

import "./styles/main.scss";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(LoadScript)
    .use(plugin, { echarts, h })
    .mount('#app');
