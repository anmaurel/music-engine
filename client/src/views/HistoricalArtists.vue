<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-size-1 has-text-white">Historical artist data</h1>
                <p class="subtitle has-text-weight-light has-text-white">
                    Number of followers of some artists retrieved from Spotify
                    api and stored on our own database given each day (cron
                    job). The left graph evolves according to hover data on the
                    right graph and by clicking on the name of an artist you can
                    remove it from the two graphics below.
                </p>
                <ECharts
                    v-if="ready"
                    ref="chart"
                    :option="options"
                    :setOptionOpts="{ notMerge: true }"
                    :loading="loading"
                    :loadingOpts="{ text: 'Wait for 0.5s' }"
                    :events="[updateAxisPointer, Function]"
                    style="width: 100%; height: 600px; margin: 0 auto"
                    @updateAxisPointer="updateAxisPointer"
                />
            </div>
        </div>
    </section>
</template>

<script>
import * as echarts from "echarts";
import { h, markRaw } from "vue";
import { createComponent } from "echarts-for-vue";
import updatedData from "../data/updated.json";

export default {
    name: "HistoricalArtists",
    components: {
        ECharts: createComponent({ echarts, h }),
    },
    data() {
        return {
            ready: false,
            loading: false,
            options: markRaw({
                legend: {
                    textStyle: {
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "14",
                        fontFamily: "Poppins",
                    },
                    inactiveColor: "#696969",
                },
                tooltip: {
                    trigger: "axis",
                    showContent: false,
                    textStyle: {
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "12",
                        fontFamily: "Poppins",
                    },
                },
                dataset: {
                    source: [
                        // ['artist', '21/07', '22/07', '23/07'],
                        // ['Booba', 2132903, 2133936, 2135050],
                        // ['Naps', 1262793, 1262825, 1262825],
                        // ['PLK', 854342, 854394, 854394],
                        // ['DTF', 494142, 494157, 494434],
                        // ['Sneazzy', 268301, 268328, 268328],
                        // ['JSX', 5423, 5447, 5469],
                        [
                            "artist",
                            "21/07",
                            "22/07",
                            "23/07",
                            "24/07",
                            "25/07",
                            "26/07",
                            "27/07",
                            "28/07",
                            "29/07",
                            "30/07",
                            "31/07",
                            "01/08",
                            "02/08",
                            "03/08",
                            "04/08",
                            "05/08",
                            "06/08",
                            "07/08",
                            "08/08",
                            "09/08",
                            "10/08",
                            "11/08",
                            "12/08",
                            "13/08",
                            "14/08",
                            "15/08",
                            "16/08",
                            "17/08",
                            "18/08",
                            "19/08",
                        ],
                        ["Booba"],

                        ["Naps"],
                        ["PLK"],
                        ["DTF"],
                        ["Sneazzy"],
                        ["JSX"],
                    ],
                },
                xAxis: {
                    type: "category",
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontWeight: "600",
                            fontSize: "12",
                            fontFamily: "Poppins",
                        },
                    },
                    boundaryGap: ["5%", "5%"],
                },
                yAxis: {
                    gridIndex: 0,
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontWeight: "600",
                            fontSize: "12",
                            fontFamily: "Poppins",
                        },
                    },
                },
                grid: {
                    top: "20%",
                    bottom: "20%",
                    left: "60%",
                    width: "40%",
                    height: "60%",
                },
                series: [
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" },
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" },
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" },
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" },
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" },
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" },
                    },
                    {
                        type: "pie",
                        id: "pie",
                        radius: ["20%", "60%"],
                        center: ["25%", "50%"],
                        roseType: "radius",
                        emphasis: { focus: "data" },
                        label: {
                            formatter: "{name|{b}}\n{stat|{@19/08}}",
                            position: "outer",
                            alignTo: "labelLine",
                            color: "rgba(255, 255, 255, 1)",
                            margin: 10,
                            rich: {
                                name: {
                                    color: "#fff",
                                    fontSize: "18",
                                    fontWeight: "600",
                                    fontFamily: "Poppins",
                                    lineHeight: 20,
                                },
                                stat: {
                                    color: "#fff",
                                    fontSize: "14",
                                    fontWeight: "600",
                                    fontFamily: "Poppins",
                                    lineHeight: 20,
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
                        encode: {
                            itemName: "artist",
                            value: "19/08",
                            tooltip: "19/08",
                        },
                    },
                ],
            }),
        };
    },
    methods: {
        getUpdatedData() {
            const gData = updatedData[0].data;
            console.log(gData);

            for (let i = 1; i <= 6; i++) {
                // this['resultId' + i] = gData.filter((element) => element.artistId === '' + i + '');
                let res = gData.filter(
                    (element) => element.artistId === "" + i + ""
                );

                res.forEach((element) => {
                    this.options.dataset.source[i].push(element.followers);
                });
            }

            // duplicatesData.forEach((element) => {
            //     this.chartOptionsBar.series[0].data.forEach((elem) => {
            //         if (elem['name'] === element) {
            //             elem['value']++;
            //         }
            //     });
            // });

            // this.resultId1.forEach((element) => {
            //     this.options.dataset.source[1].push(element.followers);
            // });

            this.ready = true;
        },
        updateAxisPointer(params) {
            let xAxisInfo = params.axesInfo[0];
            if (xAxisInfo) {
                let dimension = xAxisInfo.value + 1;
                this.options.series = [
                    {
                        id: "pie",
                        label: {
                            formatter:
                                "{name|{b}}\n{stat|{@" + dimension + "}}",
                            position: "outer",
                            alignTo: "labelLine",
                            color: "rgba(255, 255, 255, 1)",
                            margin: 10,
                            rich: {
                                name: {
                                    color: "#fff",
                                    fontSize: "18",
                                    fontWeight: "600",
                                    fontFamily: "Poppins",
                                    lineHeight: 20,
                                },
                                stat: {
                                    color: "#fff",
                                    fontSize: "14",
                                    fontWeight: "600",
                                    fontFamily: "Poppins",
                                    lineHeight: 20,
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
                        encode: {
                            value: dimension,
                            tooltip: dimension,
                        },
                    },
                ];
            }

            this.$refs.chart.inst.setOption(this.options);
        },
    },
    beforeMount() {
        this.getUpdatedData();
        // this.$refs.chart.inst.on('updateAxisPointer', this.updateAxisPointer);
    },
    mounted() {
        // this.getUpdatedData();
        this.$refs.chart.inst.on("updateAxisPointer", this.updateAxisPointer);
    },
};
</script>
