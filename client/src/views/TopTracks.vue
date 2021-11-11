<template>
    <div class="top-tracks">
        <h1 class="title is-size-1">Top tracks</h1>
        <p class="subtitle has-text-weight-light">
            The top 20 most listened tracks displayed by spotify popularity
        </p>
        <ECharts
            v-if="ready"
            ref="chart"
            :option="options"
            :setOptionOpts="{ notMerge: true }"
            :loading="loading"
            :loadingOpts="{ text: 'Wait for 0.5s' }"
            style="width: 100%; height: 700px; margin: 0 auto"
        />
    </div>
</template>

<script>
import * as echarts from "echarts";
import { h, markRaw } from "vue";
import { createComponent } from "echarts-for-vue";
import { mapGetters } from "vuex";

export default {
    name: "TopTracks",
    components: {
        ECharts: createComponent({ echarts, h }),
    },
    data() {
        return {
            tracks: [],
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
                        name: "Top tracks",
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
        ...mapGetters("spotify", { topTracks: "getTopTracks" }),
    },
    methods: {
        resetContent() {
            const removeElements = (elms) => elms.forEach((el) => el.remove());
            removeElements(document.querySelectorAll(".home"));
        },
        setupTopTracks() {
            this.loading = false;

            this.topTracks.items.forEach((track) => {
                this.tracks.push(track);
            });
            this.tracks.sort((a, b) => {
                return a.popularity - b.popularity;
            });
            this.tracks.forEach((track) => {
                this.options.series[0].data.push(track.popularity);
                this.options.yAxis.data.push(
                    track.name + " (" + track.artists[0].name + ")"
                );
            });

            this.ready = true;
        },
    },
    async mounted() {
        await this.$store.dispatch("spotify/getTopTracks", 20, "long_term");
        this.resetContent();
        this.setupTopTracks();
    },
};
</script>
