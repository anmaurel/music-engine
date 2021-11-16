<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-size-1 has-text-white">Recent plays</h1>
                <p class="subtitle has-text-weight-light has-text-white">
                    The most present artists among the last 20 tracks listened
                </p>
                <ECharts
                    v-if="ready"
                    ref="chart"
                    :option="chartOptionsBar"
                    :setOptionOpts="{ notMerge: true }"
                    :loading="loading"
                    :loadingOpts="{ text: 'Wait for 0.5s' }"
                    style="width: 100%; height: 600px"
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
    name: "RecentPlays",
    components: {
        ECharts: createComponent({ echarts, h }),
    },
    data() {
        return {
            ready: false,
            loading: false,
            chartOptionsBar: markRaw({
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                },
                series: [
                    {
                        name: "Recent plays",
                        type: "pie",
                        radius: ["20%", "70%"],
                        avoidLabelOverlap: false,
                        roseType: "radius",
                        label: {
                            formatter: "{b|{b}} {d|({d}%)}",
                            position: "outer",
                            alignTo: "labelLine",
                            bleedMargin: 5,
                            color: "rgba(255, 255, 255, 1)",

                            rich: {
                                b: {
                                    color: "#fff",
                                    fontSize: "18",
                                    fontWeight: "600",
                                    fontFamily: "Poppins",
                                    lineHeight: 33,
                                },
                                d: {
                                    color: "#fff",
                                    fontSize: "14",
                                    fontWeight: "600",
                                    fontFamily: "Poppins",
                                    lineHeight: 33,
                                },
                            },
                        },
                        labelLine: {
                            lineStyle: {
                                color: "rgba(255, 255, 255, 1)",
                            },
                            smooth: 0.2,
                            length: 15,
                            length2: 10,
                        },
                        itemStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "#E67D00",
                                    },
                                    {
                                        offset: 1,
                                        color: "#E9486C",
                                    },
                                ],
                                global: false,
                            },
                            borderColor: "#fff",
                            borderWidth: 1,
                            borderType: "solid",
                            shadowBlur: 200,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                        data: [],
                    },
                ],
            }),
        };
    },
    computed: {
        ...mapGetters("spotify", { recentlyPlayed: "getRecentlyPlayed" }),
    },
    methods: {
        resetContent() {
            const removeElements = (elms) => elms.forEach((el) => el.remove());
            removeElements(document.querySelectorAll(".home"));
        },
        setupRecentlyPayed() {
            this.loading = false;

            const data = [];

            this.recentlyPlayed.items.forEach((element) => {
                element.track.artists.forEach((artistName) => {
                    const artist_name = artistName.name;
                    data.push(artist_name);
                });
            });

            const duplicatesData = data.filter((e, i, a) => a.indexOf(e) !== i);
            const withoutDuplicatesData = data.filter(
                (e, i, a) => a.indexOf(e) === i
            );

            withoutDuplicatesData.forEach((element) => {
                this.chartOptionsBar.series[0].data.push({
                    value: 1,
                    name: element,
                });
            });

            duplicatesData.forEach((element) => {
                this.chartOptionsBar.series[0].data.forEach((elem) => {
                    if (elem["name"] === element) {
                        elem["value"]++;
                    }
                });
            });

            this.chartOptionsBar.series[0].data.sort((a, b) => {
                return b.value - a.value;
            });

            this.ready = true;
        },
    },
    async mounted() {
        await this.$store.dispatch("spotify/getRecentlyPlayed", 20);
        this.resetContent();
        this.setupRecentlyPayed();
    },
};
</script>
