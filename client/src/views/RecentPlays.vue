<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-size-1 has-text-white">Recent plays</h1>
                <p class="subtitle has-text-weight-light has-text-white">
                    History of the last 50 tracks listened to and classification
                    by artists present
                </p>
                <div class="mt-6">
                    <font-awesome-icon
                        :icon="['fas', 'circle-notch']"
                        size="2x"
                        spin
                        v-if="!ready"
                    />
                    <div class="columns" v-if="ready">
                        <div class="column is-6 px-6">
                            <div
                                class="card mb-2 block-custom-bg"
                                v-for="(played, index) in recentlyPlayed.items"
                                :key="played.track.id"
                            >
                                <div class="card-content p-2">
                                    <div class="media">
                                        <div
                                            class="
                                                media-left
                                                has-text-left has-text-white
                                            "
                                        >
                                            <p>
                                                {{
                                                    dateFormat(
                                                        played.played_at
                                                    )[1]
                                                }}
                                            </p>
                                            <p>
                                                {{
                                                    dateFormat(
                                                        played.played_at
                                                    )[0]
                                                }}
                                            </p>
                                        </div>
                                        <div class="media-content">
                                            <p
                                                class="
                                                    title
                                                    is-4
                                                    has-text-white
                                                    pb-1
                                                "
                                            >
                                                {{ played.track.name }}
                                            </p>
                                            <p
                                                class="
                                                    subtitle
                                                    is-7
                                                    has-text-white
                                                "
                                            >
                                                <span
                                                    v-for="(
                                                        artist, index
                                                    ) in played.track.artists"
                                                    :key="artist.id"
                                                    class="
                                                        has-background-gradient-1
                                                        p-stickers
                                                        is-inline-block
                                                        has-text-white
                                                        py-1
                                                        px-2
                                                    "
                                                    ><font-awesome-icon
                                                        :icon="['far', 'user']"
                                                        class="mr-1"
                                                        size="sm"
                                                    />{{ artist.name }}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column is-6">
                            <ECharts
                                class="block-custom-bg"
                                v-if="ready"
                                ref="chart"
                                :option="chartOptionsBar"
                                :setOptionOpts="{ notMerge: true }"
                                :loadingOpts="{ text: 'Wait for 0.5s' }"
                                style="width: 100%; height: 600px"
                            />
                            <!-- <p
                                v-for="(artist, index) in artistsCount"
                                :key="artist.name"
                            >
                                {{ artist.value }} {{ artist.name }}
                            </p> -->
                        </div>
                    </div>
                </div>
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
            artistsCount: [],
            chartOptionsBar: markRaw({
                textStyle: {
                    fontFamily: "Poppins",
                },
                dataset: {
                    source: [["amount", "artist"]],
                },
                grid: { containLabel: true },
                xAxis: { type: "value" },
                yAxis: {
                    type: "category",
                    axisLabel: {
                        color: "rgba(255, 255, 255, 1)",
                        fontWeight: "bold",
                        fontSize: "16",
                    },
                },
                series: [
                    {
                        type: "bar",
                        encode: {
                            x: "amount",
                            y: "artist",
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
                                x2: 1,
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
                            shadowBlur: 200,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                ],
            }),
        };
    },
    computed: {
        ...mapGetters("spotify", { recentlyPlayed: "getRecentlyPlayed" }),
    },
    methods: {
        dateFormat(dateString) {
            let result = [];

            const dateSplit1 = dateString.split("T");
            result.push(dateSplit1[0]);
            const dateSplit2 = dateSplit1[1].split(".");
            result.push(dateSplit2[0]);

            return result;
        },
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
                this.artistsCount.push({
                    value: 1,
                    name: element,
                });
            });

            duplicatesData.forEach((element) => {
                this.artistsCount.forEach((elem) => {
                    if (elem["name"] === element) {
                        elem["value"]++;
                    }
                });
            });

            this.artistsCount.sort((a, b) => {
                return a.value - b.value;
            });

            this.artistsCount.forEach((artist) => {
                this.chartOptionsBar.dataset.source.push([
                    artist.value,
                    artist.name,
                ]);
            });

            this.ready = true;
        },
    },
    async mounted() {
        await this.$store.dispatch("spotify/getRecentlyPlayed", 50);
        this.resetContent();
        this.setupRecentlyPayed();
    },
};
</script>
