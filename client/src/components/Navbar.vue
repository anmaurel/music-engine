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
                    />{{ $t("menu.links[0]") }}</router-link
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
                    />{{ $t("menu.links[1]") }}</router-link
                >
                <router-link
                    v-if="isAuth"
                    class="navbar-item has-text-white is-hidden-mobile"
                    to="/liked-tracks"
                    @click="analyticsLinkClicked('Liked tracks')"
                    ><font-awesome-icon
                        :icon="['fas', 'random']"
                        class="mr-2"
                        size="sm"
                    />{{ $t("menu.links[2]") }}</router-link
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
                    />{{ $t("menu.links[3]") }}</router-link
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
                    />{{ $t("menu.links[4]") }}</router-link
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
                    />{{ $t("menu.links[5]") }}</router-link
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
                <div class="navbar-item">
                    <div class="locale-changer select is-small is-info">
                        <select
                            v-model="$i18n.locale"
                            class="has-text-weight-bold"
                            @change="onChangeLanguage"
                        >
                            <option
                                v-for="(lang, i) in $i18n.availableLocales"
                                :key="`Lang${i}`"
                                :value="lang"
                            >
                                {{ displayLanguageFlag(lang) }}
                            </option>
                        </select>
                    </div>
                </div>
                <a v-if="!isAuth" class="navbar-item" :href="`${loginUrl}`">
                    <button
                        class="button has-background-gradient-1 has-text-white"
                    >
                        <font-awesome-icon
                            :icon="['fab', 'spotify']"
                            class="mr-2"
                            size="sm"
                        />{{ $t("menu.buttons[0]") }}
                    </button>
                </a>
                <div v-else class="navbar-item">
                    <!-- <router-link
                        class="navbar-item has-text-white"
                        to="/devices"
                        @click="analyticsLinkClicked('Devices')"
                        ><font-awesome-icon
                            :icon="['fas', 'tablet-alt']"
                            class="mr-2"
                            size="sm"
                        />Devices</router-link
                    > -->
                    <a class="ml-3" @click="logout()">
                        <button
                            class="
                                button
                                has-text-white
                            "
                        >
                            <font-awesome-icon
                                :icon="['fab', 'spotify']"
                                class="mr-2"
                                size="sm"
                            />{{ $t("menu.buttons[1]") }}
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
        onChangeLanguage(event) {
            localStorage.lang = event.target.value
        },
        displayLanguageFlag(lang) {
            switch (lang) {
                case "fr":
                    return "🇫🇷"
                case "en":
                    return "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
            }
        }
    },
    mounted() {
        if (window.localStorage.getItem("spotify_access_token") !== null) {
            this.$store.dispatch("auth/setAuthStatus", true);
        }
    },
};
</script>