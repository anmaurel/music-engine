<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-size-1 has-text-white">{{ $t("menu.links[3]") }}</h1>
                <p class="subtitle has-text-weight-light has-text-white">
                    {{ $t("views.topArtists.title") }}
                </p>

                <!-- <font-awesome-icon
                    :icon="['fas', 'stopwatch']"
                    class="mr-2"
                    size="sm"
                /> -->

                <!-- <div class="control has-icons-left mt-6 mb-5"> -->
                <div class="control mt-6 mb-5">
                    <div class="select">
                        <select
                            @change="fillArtistList"
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
                            v-for="(artist, index) in artists"
                            :key="artist.id"
                            v-bind="{
                                type: type,
                                index: index + 1,
                                name: artist.name,
                                genres: artist.genres,
                                popularity: artist.popularity,
                                followers: artist.followers.total,
                                image: artist.images[0].url,
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
    name: "TopArtists",
    components: {
        TopStats,
    },
    data() {
        return {
            type: "artist",
            periods: [
                { name: this.$t("views.topArtists.periods[0]"), sname: "short_term", id: 1 },
                { name: this.$t("views.topArtists.periods[1]"), sname: "medium_term", id: 2 },
                { name: this.$t("views.topArtists.periods[2]"), sname: "long_term", id: 3 },
            ],
            periodSelected: "short_term",
            artists: [],
            ready: false,
        };
    },
    computed: {
        ...mapGetters("spotify", { topArtists: "getTopArtists" }),
    },
    methods: {
        async fillArtistList(event) {
            this.ready = false;

            const params = {
                limit: 20,
                time_range:
                    event.target.options[event.target.options.selectedIndex]
                        .value,
            };
            await this.$store.dispatch("spotify/getTopArtists", params);
            this.setupTopArtists();
        },
        setupTopArtists() {
            this.artists.splice(0, this.artists.length);
            this.topArtists.items.forEach((artist) => {
                this.artists.push(artist);
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
        await this.$store.dispatch("spotify/getTopArtists", params);
        this.setupTopArtists();
    },
};
</script>
