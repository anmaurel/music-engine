<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-size-1 has-text-white">Top artists</h1>
                <p class="subtitle has-text-weight-light has-text-white">
                    The top 20 most listened artists displayed by spotify
                    popularity
                </p>
                <ECharts
                    v-if="ready"
                    ref="chart"
                    :option="options"
                    :setOptionOpts="{ notMerge: true }"
                    :loading="loading"
                    :loadingOpts="{ text: 'Wait for 0.5s' }"
                    style="width: 80%; height: 700px; margin: 0 auto"
                />
            </div>
        </div>
    </section>
</template>

<script>
import * as echarts from "echarts";
import { h, markRaw } from "vue";
import { createComponent } from "echarts-for-vue";
import { mapGetters } from "vuex";

export default {
    name: "TopArtists",
    components: {
        ECharts: createComponent({ echarts, h }),
    },
    data() {
        return {
            artists: [],
            ready: false,
            loading: false,
            options: markRaw({
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "value",
                },
                yAxis: {
                    type: "category",
                    data: [],
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontWeight: "600",
                            fontSize: "14",
                            fontFamily: "Poppins",
                        },
                    },
                },
                visualMap: {
                    orient: "horizontal",
                    left: "center",
                    min: 0,
                    max: 100,
                    dimension: 0,
                    inRange: {
                        color: ["#E67D00", "#E9486C"],
                    },
                    hoverLink: true,
                    itemHeight: 400,
                    top: 10,
                    textStyle: {
                        color: "#fff",
                        fontWeight: "400",
                        fontFamily: "Poppins",
                    },
                    text: ["High", "Low"],
                },
                series: [
                    {
                        name: "Top artists",
                        type: "bar",
                        barWidth: "85%",
                        stack: "总量",
                        label: {
                            show: true,
                            position: "insideRight",
                            fontWeight: "600",
                            fontSize: "14",
                            fontFamily: "Poppins",
                            verticalAlign: "middle",
                            offset: [-4, 2],
                            color: "#fff",
                        },
                        itemStyle: {
                            normal: {
                                color: "#E9486C",
                            },
                        },
                        data: [],
                    },
                ],
            }),
        };
    },
    computed: {
        ...mapGetters("spotify", { topArtists: "getTopArtists" }),
    },
    methods: {
        resetContent() {
            const removeElements = (elms) => elms.forEach((el) => el.remove());
            removeElements(document.querySelectorAll(".home"));
        },
        setupTopArtists() {
            this.loading = false;

            this.topArtists.items.forEach((artist) => {
                this.artists.push(artist);
            });
            this.artists.sort((a, b) => {
                return a.popularity - b.popularity;
            });
            this.artists.forEach((artist) => {
                this.options.series[0].data.push(artist.popularity);
                this.options.yAxis.data.push(artist.name);
            });

            this.ready = true;
        },
    },
    async mounted() {
        const params = { limit: 20, time_range: "long_term"}
        await this.$store.dispatch("spotify/getTopArtists", params);
        this.resetContent();
        this.setupTopArtists();
    },
};
</script>
