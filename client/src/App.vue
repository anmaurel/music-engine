<template>
    <section class="hero is-dark">
        <div class="hero-head">
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
                        <router-link class="navbar-item" to="/"
                            ><i class="fas fa-file-medical-alt mr-2"></i
                            >Home</router-link
                        >
                        <router-link
                            v-if="isAuth"
                            class="navbar-item"
                            to="/recent-plays"
                            ><i class="far fa-play-circle mr-2"></i>Recent
                            plays</router-link
                        >
                        <router-link
                            v-if="isAuth"
                            class="navbar-item"
                            to="/top-artists"
                            ><i class="far fa-user mr-2"></i>Top
                            artists</router-link
                        >
                        <router-link
                            v-if="isAuth"
                            class="navbar-item"
                            to="/top-tracks"
                            ><i class="far fa-file-audio mr-2"></i>Top
                            tracks</router-link
                        >
                        <router-link
                            v-if="isAuth"
                            class="navbar-item"
                            to="/historical-artists"
                            ><i class="fas fa-history mr-2"></i>Historical
                            artist data</router-link
                        >
                    </div>
                    <div class="navbar-end">
                        <a
                            v-if="!isAuth"
                            class="navbar-item"
                            :href="`${loginUrl}`"
                        >
                            <button
                                class="
                                    button
                                    has-background-gradient-1 has-text-white
                                "
                            >
                                <i class="fab fa-spotify mr-2"></i>
                                Login
                            </button>
                        </a>
                        <div v-else class="navbar-item">
                            <!-- <img class="is-b-rounded mr-2" :src="userInfo[0]['images'][0]['url']" />
                            <h1 class="is-primary has-text-weight-semibold mr-3">
                                {{ userInfo[0]['display_name'] }}
                            </h1> -->
                            <router-link class="navbar-item" to="/devices"
                                ><i class="fas fa-laptop-house mr-2"></i
                                >Devices</router-link
                            >
                            <a class="ml-3" @click="logout()">
                                <button
                                    class="
                                        button
                                        has-background-gradient-1 has-text-white
                                    "
                                >
                                    <i class="fab fa-spotify mr-2"></i>
                                    Logout
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <div class="hero-body">
            <div class="container mt-6">
                <router-view />
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "App",
    data() {
        return {
            showNav: false,
            loginUrl: "http://localhost:9000/login",
        };
    },
    computed: {
        ...mapGetters("auth", { isAuth: "getAuthStatus" }),
    },
    methods: {
        ...mapActions("auth", ["logout"]),
    },
    mounted() {
        if (window.localStorage.getItem("spotify_access_token") !== null) {
            this.$store.dispatch("auth/setAuthStatus", true);
        }
    },
};
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";

#app {
    font-family: "Poppins", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: $size-normal;
    color: $light !important;
}
</style>
