<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-size-1 has-text-white">
                    Playlist generation
                </h1>
                <p class="subtitle has-text-weight-light has-text-white">
                    Allows you to generate a playlist of 30 tracks from your musical preferences.
                </p>
                <div class="mt-6" v-if="playlistGenStatus == 'p1'">
                    <div class="columns is-centered">
                        <div class="column is-half">
                            <p
                                class="
                                    is-size-5
                                    has-text-weight-medium has-text-white
                                    pb-2
                                "
                            >
                                <font-awesome-icon
                                    :icon="['fa', 'search']"
                                    class="mr-1"
                                    size="md"
                                />
                                Select up to 5 tracks that will be used to
                                generate a playlist
                            </p>
                            <SearchAutocomplete />
                        </div>
                    </div>
                    <div v-if="playlistStartTracks.length">
                        <div class="columns is-multiline is-centered">
                            <TopStats
                                class="
                                    column
                                    is-2-fullhd
                                    is-3-widescreen
                                    is-4-desktop
                                    is-6-tablet
                                "
                                v-for="(track, index) in playlistStartTracks"
                                :key="track.id"
                                v-bind="{
                                    type: type,
                                    playlistGen: true,
                                    index: index + 1,
                                    name: track.name,
                                    popularity: track.popularity,
                                    image: track.album.images[0].url,
                                    artists: track.artists,
                                    duration: track.duration_ms,
                                }"
                            ></TopStats>
                        </div>
                        <button
                            id="btnGenerate"
                            class="
                                button
                                is-large
                                has-background-gradient-1
                                has-text-weight-medium
                                has-text-white
                                mt-4
                            "
                            @click="generateRecommendations()"
                        >
                            Generate a playlist
                        </button>
                    </div>
                    <p v-else class="is-size-7 has-text-weight-light">
                        <font-awesome-icon
                            :icon="['fa', 'exclamation-circle']"
                            class="mr-1"
                            size="sm"
                        />Please select at least one track
                    </p>
                </div>
                <div
                    class="m-6-tablet my-4-mobile mx-0-mobile"
                    v-if="playlistGenStatus == 'p2'"
                >
                    <div class="columns is-centered my-5 pt-5">
                        <div class="column is-narrow field m-0">
                            <!-- <label class="label has-text-white"
                                >Playlist name</label
                            > -->
                            <div class="control">
                                <input
                                    v-model="playlistName"
                                    class="input is-medium is-success"
                                    type="text has-text-weight-light"
                                    placeholder="Playlist name ..."
                                />
                            </div>
                        </div>
                        <div class="column is-narrow field">
                            <p class="control">
                                <button
                                    id="btnCreate"
                                    class="
                                        button
                                        is-medium
                                        has-background-gradient-1
                                        has-text-weight-medium
                                        has-text-white
                                    "
                                    @click="createPlaylist(playlistName)"
                                >
                                    Create playlist
                                </button>
                                <button
                                    id="btnGenerate"
                                    class="
                                        mx-4
                                        button
                                        is-medium
                                        has-background-gradient-1
                                        has-text-weight-medium
                                        has-text-white
                                    "
                                    @click="generateRecommendations()"
                                >
                                    Regenerate
                                </button>
                            </p>
                        </div>
                    </div>
                    <p class="is-size-7 has-text-weight-light py-3">
                        ↓ tracks generated ↓
                    </p>
                    <div
                        class="
                            columns
                            is-multiline is-mobile
                            px-1
                            py-1
                            block-custom-bg
                        "
                    >
                        <div
                            class="column is-2-tablet is-3-mobile"
                            v-for="track in recommendations.tracks"
                            :key="track.id"
                        >
                            <a class="box" :href="track.uri">
                                <div class="card">
                                    <p
                                        class="
                                            has-background-dark has-text-white
                                            is-size-6
                                            has-text-weight-medium
                                            py-2
                                        "
                                    >
                                        <font-awesome-icon
                                            :icon="['far', 'user']"
                                            class="mr-2"
                                            size="sm"
                                        />{{ track.artists[0].name }}
                                    </p>
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <img
                                                :src="track.album.images[1].url"
                                                alt="Placeholder image"
                                            />
                                        </figure>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchAutocomplete from "@/components/SearchAutocomplete.vue";
import TopStats from "@/components/TopStats.vue";

import router from "@/router";

export default {
    name: "PlaylistGeneration",
    components: {
        SearchAutocomplete,
        TopStats,
    },
    data() {
        return {
            playlistName: "",
            type: "track",
        };
    },
    computed: {
        ...mapGetters("spotify", {
            recentlyPlayed: "getRecentlyPlayed",
            artist: "getArtist",
            recommendations: "getRecommendations",
            playlistGenStatus: "getPlaylistGenStatus",
            userAuthProfile: "getProfile",
            playlistStartTracks: "getPlaylistGenStartTracks",
        }),
    },
    methods: {
        async generateRecommendations() {
            const btnGenerate = document.getElementById("btnGenerate");
            btnGenerate.setAttribute("disabled", "");
            btnGenerate.classList.add("is-loading");

            let tracks = [];

            this.playlistStartTracks.forEach((track) => {
                tracks.push(track.id);
            });

            await this.$store.dispatch("spotify/getRecommendations", {
                limit: 30,
                seed_artists: "",
                seed_genres: "",
                seed_tracks: tracks.slice(0, 5).join(),
            });

            this.$gtag.event("Generate recommendations", {
                event_category: "playlist_generation",
                event_label: "Playlist generation",
                value: 1,
            });

            btnGenerate.removeAttribute("disabled");
            btnGenerate.classList.remove("is-loading");

            this.$store.dispatch("spotify/setPlaylistGenStatus", "p2");
        },
        async createPlaylist(playlistName) {
            if (playlistName.length !== 0) {
                const btnGenerate = document.getElementById("btnCreate");
                btnGenerate.setAttribute("disabled", "");
                btnGenerate.classList.add("is-loading");

                await this.$store.dispatch("spotify/getProfile");

                const newPlaylist = await this.$store.dispatch(
                    "spotify/createPlaylist",
                    {
                        user_id: this.userAuthProfile.id,
                        name: playlistName,
                    }
                );

                let uris = [];
                this.recommendations.tracks.forEach((track) => {
                    uris.push(track.uri);
                });

                await this.$store.dispatch("spotify/addItemsPlaylist", {
                    playlist_id: newPlaylist.id,
                    uris: uris,
                });

                this.$gtag.event("Create playlist", {
                    event_category: "playlist_generation",
                    event_label: "Playlist generation",
                    value: 1,
                });

                await this.$store.dispatch("app/setPopupNotif", {
                    text: `Playlist ${playlistName} successfully created !`,
                    status: true,
                });
                document.getElementById("popup-notif").style.display = "block";

                router.push({ path: "/" });

                this.$store.dispatch("spotify/setPlaylistGenStatus", "p1");

                window.location.href = newPlaylist.uri;
            }
        },
    },
};
</script>
