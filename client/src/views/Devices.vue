<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-size-1 has-text-white">Devices</h1>
                <p class="subtitle has-text-weight-light has-text-white">
                    The User's Available Devices
                </p>
                <div class="columns is-centered">
                    <div
                        class="column is-3"
                        v-for="device in devices.devices"
                        :key="device.id"
                    >
                        <div class="card" style="margin: 0 auto">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4 has-text-black">
                                            {{ device.name }}
                                        </p>
                                        <p class="subtitle is-6 has-text-black">
                                            {{ device.type }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <footer
                                class="
                                    card-footer
                                    has-background-gradient-1
                                    has-text-white
                                    has-text-centered
                                "
                            >
                                <div class="card-footer-item">
                                    {{ device.volume_percent
                                    }}<i
                                        class="
                                            fas
                                            fa-volume-down fa-lg
                                            ml-1
                                            mb-1
                                        "
                                    ></i>
                                </div>
                                <div class="card-footer-item">
                                    <i
                                        class="
                                            fas
                                            fa-headphones fa-lg fa-pulse-custom
                                        "
                                    ></i>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Devices",
    computed: {
        ...mapGetters("spotify", { devices: "getDevices" }),
    },
    async mounted() {
        await this.$store.dispatch("spotify/getDevices");
    },
};
</script>