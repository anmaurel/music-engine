import { createApp, h } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import LoadScript from 'vue-plugin-load-script';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import * as echarts from 'echarts';
import { plugin } from 'echarts-for-vue';
// import * as echarts from 'echarts/esm/echarts';
// import 'echarts/esm/chart/line';
// import 'echarts/esm/chart/bar';
// import 'echarts/esm/component/title';
// import 'echarts/esm/component/tooltip';
// import 'echarts/esm/component/legend';
// import 'echarts/esm/component/toolbox';

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(LoadScript)
    .use(plugin, { echarts, h })
    .mount('#app');
