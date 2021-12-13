<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-size-1 has-text-white">
                    Playlist generation
                </h1>
                <p class="subtitle has-text-weight-light has-text-white">
                    Generate a playlist with tracks inspired by recently played
                    tracks.
                </p>
                <div class="mt-6" v-if="playlistGenStatus == 'p1'">
                    <button
                        id="btnGenerate"
                        class="
                            button
                            is-large
                            has-background-gradient-1
                            has-text-weight-medium
                            has-text-white
                        "
                        @click="generateRecommendations()"
                    >
                        Generate
                    </button>
                </div>
                <div class="m-6" v-if="playlistGenStatus == 'p2'">
                    <div class="columns is-centered my-5">
                        <div class="column is-narrow field m-0">
                            <!-- <label class="label has-text-white"
                                >Playlist name</label
                            > -->
                            <div class="control">
                                <input
                                    v-model="playlistName"
                                    class="input is-medium is-success"
                                    type="text has-text-weight-light"
                                    placeholder="playlist name"
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
                    <div class="columns is-multiline is-mobile">
                        <div
                            class="column is-2"
                            v-for="track in recommendations.tracks"
                            :key="track.id"
                        >
                            <a class="box" :href="track.uri">
                                <div class="card">
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

import router from "@/router";

export default {
    name: "PlaylistGeneration",
    data() {
        return {
            playlistName: "",
        };
    },
    computed: {
        ...mapGetters("spotify", {
            recentlyPlayed: "getRecentlyPlayed",
            artist: "getArtist",
            recommendations: "getRecommendations",
            playlistGenStatus: "getPlaylistGenStatus",
            userAuthProfile: "getProfile",
        }),
    },
    methods: {
        async generateRecommendations() {
            const btnGenerate = document.getElementById("btnGenerate");
            btnGenerate.setAttribute("disabled", "");
            btnGenerate.classList.add("is-loading");

            await this.$store.dispatch("spotify/getRecentlyPlayed", 20);

            let tracks = [],
                artists = [],
                genres = [];

            this.recentlyPlayed.items.forEach((item) => {
                tracks.push(item.track.id);

                let artistsGrp = "";
                let genresGrp = "";

                item.track.artists.forEach(async (artist) => {
                    artistsGrp = artistsGrp + "," + artist.id;

                    await this.$store.dispatch("spotify/getArtist", artist.id);

                    if (this.artist.genres !== undefined) {
                        this.artist.genres.forEach((genre) => {
                            genresGrp = genresGrp + "," + genre;
                        });
                    }

                    // console.log(item.track.id + " // " + genresGrp.slice(1));
                });

                artists.push(artistsGrp.slice(1));
                genres.push(genresGrp.slice(1));
            });

            const tracksShuffled = tracks.sort(() => 0.5 - Math.random());

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
        },
    },
};
</script>
