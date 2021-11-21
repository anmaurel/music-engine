<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-size-1 has-text-white">
                    Playlist generation
                </h1>
                <p class="subtitle has-text-weight-light has-text-white">...</p>
                <div>
                    <!-- {{ recentlyPlayed.items[0] }} -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "PlaylistGeneration",
    computed: {
        ...mapGetters("spotify", {
            recentlyPlayed: "getRecentlyPlayed",
            artist: "getArtist",
            recommendations: "getRecommendations",
        }),
    },
    methods: {
        async formatData() {
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
            const params = {
                limit: 10,
                seed_artists: "",
                seed_genres: "",
                seed_tracks: tracks.slice(0, 5).join(),
            };
            
            await this.$store.dispatch("spotify/getRecommendations", params);
            console.log(this.recommendations);
        },
    },
    mounted() {
        this.formatData();
    },
};
</script>
