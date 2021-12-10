import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import RecentPlays from "@/views/RecentPlays.vue";
import TopArtists from "@/views/TopArtists.vue";
import TopTracks from "@/views/TopTracks.vue";
import Devices from "@/views/Devices.vue";
import NotFound from "@/views/NotFound.vue";
import HistoricalArtists from "@/views/HistoricalArtists.vue";
import PlaylistGeneration from "@/views/PlaylistGeneration.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/recent-plays",
        name: "RecentPlays",
        component: RecentPlays,
        meta: { requiresAuth: true },
    },
    {
        path: "/top-artists",
        name: "TopArtists",
        component: TopArtists,
        meta: { requiresAuth: true },
    },
    {
        path: "/top-tracks",
        name: "TopTracks",
        component: TopTracks,
        meta: { requiresAuth: true },
    },
    {
        path: "/devices",
        name: "Devices",
        component: Devices,
        meta: { requiresAuth: true },
    },
    {
        path: "/historical-artists",
        name: "HistoricalArtists",
        component: HistoricalArtists,
        meta: { requiresAuth: true },
    },
    {
        path: "/playlist-generation",
        name: "PlaylistGeneration",
        component: PlaylistGeneration,
        meta: { requiresAuth: true },
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    if (
        to.meta.requiresAuth &&
        !window.localStorage.getItem("spotify_access_token")
    ) {
        return {
            path: "/",
            query: { redirect: to.fullPath },
        };
    }
});

export default router;
