<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-size-1 has-text-white">Top tracks</h1>
                <p class="subtitle has-text-weight-light has-text-white">
                    The top 20 most listened tracks filtered by period and
                    classified by number of listenings
                </p>

                <div class="control mt-6 mb-5">
                    <div class="select">
                        <select
                            @change="fillTrackList"
                            v-model="periodSelected"
                        >
                            <option
                                v-for="period in periods"
                                :value="period.sname"
                            >
                                {{ period.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <font-awesome-icon
                    :icon="['fas', 'circle-notch']"
                    size="2x"
                    spin
                    v-if="!ready"
                />
                <div v-if="ready">
                    <div class="columns is-multiline is-centered">
                        <TopStats
                            class="
                                column
                                is-2-fullhd
                                is-3-widescreen
                                is-4-desktop
                                is-6-tablet
                            "
                            v-for="(track, index) in tracks"
                            :key="track.id"
                            v-bind="{
                                type: type,
                                index: index + 1,
                                name: track.name,
                                popularity: track.popularity,
                                image: track.album.images[0].url,
                                artists: track.artists,
                                duration: track.duration_ms,
                            }"
                        ></TopStats>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from "vuex";

import TopStats from "@/components/TopStats.vue";

export default {
    name: "TopTracks",
    components: {
        TopStats,
    },
    data() {
        return {
            type: "track",
            periods: [
                { name: "last month", sname: "short_term", id: 1 },
                { name: "last 6 months", sname: "medium_term", id: 2 },
                { name: "all time", sname: "long_term", id: 3 },
            ],
            periodSelected: "short_term",
            tracks: [],
            ready: false,
        };
    },
    computed: {
        ...mapGetters("spotify", { topTracks: "getTopTracks" }),
    },
    methods: {
        async fillTrackList(event) {
            this.ready = false;

            const params = {
                limit: 20,
                time_range:
                    event.target.options[event.target.options.selectedIndex]
                        .value,
            };
            await this.$store.dispatch("spotify/getTopTracks", params);
            this.setupTopTracks();
        },
        setupTopTracks() {
            this.tracks.splice(0, this.tracks.length);
            this.topTracks.items.forEach((track) => {
                this.tracks.push(track);
            });

            this.ready = true;
        },
    },
    async mounted() {
        this.ready = false;

        const params = {
            limit: 20,
            time_range: "short_term",
        };
        await this.$store.dispatch("spotify/getTopTracks", params);
        this.setupTopTracks();
    },
};
</script>
