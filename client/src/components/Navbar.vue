<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <img
                    src="@/assets/img/logo-color.svg"
                    alt="Logo"
                    style="width: auto; height: 1.4rem"
                />
            </router-link>
            <div
                class="navbar-burger"
                @click="showNav = !showNav"
                :class="{ 'is-active': showNav }"
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': showNav }">
            <div class="navbar-start">
                <router-link
                    class="navbar-item has-text-white"
                    to="/"
                    @click="analyticsLinkClicked('Home')"
                    ><font-awesome-icon
                        :icon="['fas', 'laptop-house']"
                        class="mr-2"
                        size="sm"
                    />Home</router-link
                >
                <router-link
                    v-if="isAuth"
                    class="navbar-item has-text-white"
                    to="/playlist-generation"
                    @click="analyticsLinkClicked('Playlist generation')"
                    ><font-awesome-icon
                        :icon="['far', 'list-alt']"
                        class="mr-2"
                        size="sm"
                    />Playlist generation</router-link
                >
                <router-link
                    v-if="isAuth"
                    class="navbar-item has-text-white"
                    to="/recent-plays"
                    @click="analyticsLinkClicked('Recent Plays')"
                    ><font-awesome-icon
                        :icon="['far', 'play-circle']"
                        class="mr-2"
                        size="sm"
                    />Recent plays</router-link
                >
                <router-link
                    v-if="isAuth"
                    class="navbar-item has-text-white"
                    to="/top-artists"
                    @click="analyticsLinkClicked('Top artists')"
                    ><font-awesome-icon
                        :icon="['far', 'id-badge']"
                        class="mr-2"
                        size="sm"
                    />Top artists</router-link
                >
                <router-link
                    v-if="isAuth"
                    class="navbar-item has-text-white"
                    to="/top-tracks"
                    @click="analyticsLinkClicked('Top tracks')"
                    ><font-awesome-icon
                        :icon="['far', 'file-audio']"
                        class="mr-2"
                        size="sm"
                    />Top tracks</router-link
                >
                <!-- <router-link
                    v-if="isAuth"
                    class="navbar-item has-text-white"
                    to="/historical-artists"
                    ><font-awesome-icon
                        :icon="['fas', 'history']"
                        class="mr-2"
                        size="sm"
                    />Historical artist data</router-link
                > -->
            </div>
            <div class="navbar-end">
                <a v-if="!isAuth" class="navbar-item" :href="`${loginUrl}`">
                    <button
                        class="button has-background-gradient-1 has-text-white"
                    >
                        <font-awesome-icon
                            :icon="['fab', 'spotify']"
                            class="mr-2"
                            size="sm"
                        />Login
                    </button>
                </a>
                <div v-else class="navbar-item">
                    <router-link
                        class="navbar-item has-text-white"
                        to="/devices"
                        @click="analyticsLinkClicked('Devices')"
                        ><font-awesome-icon
                            :icon="['fas', 'tablet-alt']"
                            class="mr-2"
                            size="sm"
                        />Devices</router-link
                    >
                    <a class="ml-3" @click="logout()">
                        <button
                            class="
                                button
                                has-background-gradient-1 has-text-white
                            "
                        >
                            <font-awesome-icon
                                :icon="['fab', 'spotify']"
                                class="mr-2"
                                size="sm"
                            />Logout
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            showNav: false,
            loginUrl: `${import.meta.env.VITE_BACK_URL}/login`,
        };
    },
    computed: {
        ...mapGetters("auth", { isAuth: "getAuthStatus" }),
    },
    methods: {
        ...mapActions("auth", ["logout"]),
        analyticsLinkClicked(btnName) {
            this.$gtag.event(`Access to ${btnName} page`, {
                event_category: "navbar_link",
                event_label: "Navbar link",
                value: 1,
            });
        },
    },
    mounted() {
        if (window.localStorage.getItem("spotify_access_token") !== null) {
            this.$store.dispatch("auth/setAuthStatus", true);
        }
    },
};
</script>