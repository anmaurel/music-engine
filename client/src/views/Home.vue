<template>
    <section class="hero is-fullheight-with-navbar">
        <div class="hero-body">
            <div class="container mb-6">
                <MainLogo id="mainLogo" width="45%" />
            </div>
        </div>
        <div id="scroll_indication" class="hero-foot">
            <p class="is-size-7 has-text-weight-light pb-4">scroll</p>
            <div class="scroll-bar"></div>
        </div>
    </section>
    <section id="home_prez" class="hero">
        <div class="hero-body">
            <!-- Box1 -->
            <div class="container is-max-widescreen">
                <div class="columns is-vcentered">
                    <div
                        data-onscroll
                        data-onscroll-animation="travel-y"
                        data-onscroll-delay="x4"
                        class="column is-4 is-hidden-mobile"
                    >
                        <figure class="image">
                            <img
                                src="./../assets/img/icon-spotify.png"
                                style="
                                    max-width: 55% !important;
                                    margin: 0 auto;
                                "
                            />
                        </figure>
                    </div>
                    <div
                        data-onscroll
                        data-onscroll-animation="travel-y"
                        data-onscroll-delay="x2"
                        class="column is-8 home-block-left"
                    >
                        <div class="columns is-vcentered m-0">
                            <p
                                class="
                                    column
                                    has-text-left
                                    is-size-4
                                    has-text-weight-bold
                                    px-0
                                    pt-0
                                    pb-2
                                "
                            >
                                <span class="has-text-primary-gradient"
                                    >{{ $t("home.blocks[0].title") }}</span
                                >
                            </p>
                            <p
                                class="
                                    column
                                    has-text-right
                                    is-size-6 is-uppercase
                                    has-text-weight-semibold has-text-primary
                                    px-0
                                    pt-0
                                    pb-2
                                "
                            >
                                <span class="has-text-primary-gradient"
                                    >{{ $t("home.blocks[0].categorie") }}</span
                                >
                            </p>
                        </div>
                        <p
                            class="
                                is-size-5
                                has-text-weight-normal has-text-justified
                            "
                        >{{ $t("home.blocks[0].content") }}</p>
                    </div>
                </div>
            </div>
            <!-- Box2 -->
            <div class="container is-max-widescreen">
                <div class="columns is-vcentered">
                    <div
                        data-onscroll
                        data-onscroll-animation="travel-y"
                        data-onscroll-delay="x2"
                        class="column is-8 home-block-right"
                    >
                        <div class="columns is-vcentered m-0">
                            <p
                                class="
                                    column
                                    has-text-left
                                    is-size-4
                                    has-text-weight-bold has-text-info
                                    px-0
                                    pt-0
                                    pb-2
                                "
                            >
                                <span class="has-text-primary-gradient"
                                    >{{ $t("home.blocks[1].title") }}</span
                                >
                            </p>
                            <p
                                class="
                                    column
                                    has-text-right
                                    is-size-6 is-uppercase
                                    has-text-weight-semibold has-text-primary
                                    px-0
                                    pt-0
                                    pb-2
                                "
                            >
                                <span class="has-text-primary-gradient"
                                    >{{ $t("home.blocks[1].categorie") }}</span
                                >
                            </p>
                        </div>
                        <p
                            class="
                                is-size-5
                                has-text-weight-normal has-text-justified
                            "
                        >{{ $t("home.blocks[1].content") }}</p>
                    </div>
                    <div
                        data-onscroll
                        data-onscroll-animation="travel-y"
                        data-onscroll-delay="x4"
                        class="column is-4 is-hidden-mobile"
                    >
                        <figure class="image">
                            <img
                                src="./../assets/img/icon-playlist.png"
                                style="
                                    max-width: 55% !important;
                                    margin: 0 auto;
                                "
                            />
                        </figure>
                    </div>
                </div>
            </div>
            <!-- Box3 -->
            <div class="container is-max-widescreen">
                <div class="columns is-vcentered">
                    <div
                        data-onscroll
                        data-onscroll-animation="travel-y"
                        data-onscroll-delay="x4"
                        class="column is-4 is-hidden-mobile"
                    >
                        <figure class="image">
                            <img
                                src="./../assets/img/icon-dataviz.png"
                                style="
                                    max-width: 55% !important;
                                    margin: 0 auto;
                                "
                            />
                        </figure>
                    </div>
                    <div
                        data-onscroll
                        data-onscroll-animation="travel-y"
                        data-onscroll-delay="x2"
                        class="column is-8 home-block-left"
                    >
                        <div class="columns is-vcentered m-0">
                            <p
                                class="
                                    column
                                    has-text-left
                                    is-size-4
                                    has-text-weight-bold has-text-info
                                    px-0
                                    pt-0
                                    pb-2
                                "
                            >
                                <span class="has-text-primary-gradient"
                                    >{{ $t("home.blocks[2].title") }}</span
                                >
                            </p>
                            <p
                                class="
                                    column
                                    has-text-right
                                    is-size-6 is-uppercase
                                    has-text-weight-semibold has-text-primary
                                    px-0
                                    pt-0
                                    pb-2
                                "
                            >
                                <span class="has-text-primary-gradient"
                                    >{{ $t("home.blocks[2].categorie") }}</span
                                >
                            </p>
                        </div>
                        <p
                            class="
                                is-size-5
                                has-text-weight-normal has-text-justified
                            "
                        >{{ $t("home.blocks[2].content") }}</p>
                    </div>
                </div>
            </div>
            <div class="container is-max-widescreen" v-if="!isAuth">
                <div class="columns is-centered">
                    <div
                        data-onscroll
                        data-onscroll-animation="travel-y"
                        data-onscroll-delay="x4"
                        class="column is-half"
                    >
                        <a
                            :href="`${loginUrl}`"
                        >
                            <button
                                class="
                                    button
                                    is-large
                                    has-background-gradient-1
                                    has-text-weight-medium
                                    has-text-white
                                "
                            >
                                <!-- <font-awesome-icon
                                    :icon="['fab', 'spotify']"
                                    class="mr-2"
                                    size="sm"
                                /> -->
                                {{ $t("home.login") }}</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero-foot mt-6"></div>
    </section>
    <section class="hero">
        <div class="hero-foot">
            <Footer />
        </div>
    </section>
</template>

<script>
import { mapGetters } from "vuex";

import Footer from "@/components/Footer.vue";
import MainLogo from "@/components/svg/MainLogo.vue";

export default {
    name: "Home",
    components: {
        Footer,
        MainLogo,
    },
    data() {
        return {
            loginUrl: `${import.meta.env.VITE_BACK_URL}/login`,
        };
    },
    computed: {
        ...mapGetters("spotify", { profile: "getProfile" }),
        ...mapGetters("auth", { isAuth: "getAuthStatus" }),
    },
    methods: {
        hideScrollIndication(event) {
            event.target.style.display = "none";
        },
    },
    created() {
        const { access_token, refresh_token, expires_in } = this.$route.query;

        if (access_token && refresh_token && expires_in) {
            this.$store.dispatch("auth/setAccessToken", access_token);
            this.$store.dispatch("auth/setRefreshToken", refresh_token);
            this.$store.dispatch("auth/setExpiryTime", expires_in);
            this.$store.dispatch("auth/setAuthStatus", true);
        }

        this.$store.dispatch("spotify/getProfile");
    },
    mounted() {
        let oldValue = 0;
        let newValue = 0;

        window.addEventListener("scroll", () => {
            const element = document.querySelector("#scroll_indication");

            newValue = window.pageYOffset;

            if (oldValue - newValue < 0) {
                if (window.scrollY > 100) {
                    element.style.opacity = 0;
                }
            } else if (oldValue - newValue > 0) {
                if (window.scrollY <= 100) {
                    element.style.opacity = 1;
                }
            }

            oldValue = newValue;
        });

        const scrollProperties = [
            {
                selector: "[data-onscroll-animation='travel-y']",
                class: "travel-y",
            },
        ];

        scrollProperties.forEach((property) => {
            const selectors = document.querySelectorAll(property.selector);

            const callback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.intersectionRatio === 1) {
                            // visible = 100%
                        } else if (entry.intersectionRatio > 0.1) {
                            // visible > 5%
                            entry.target.classList.add(
                                `${property.class}-${entry.target.dataset.onscrollDelay}`
                            );
                        } else {
                            // visible < 5%
                            entry.target.classList.remove(
                                `${property.class}-${entry.target.dataset.onscrollDelay}`
                            );
                        }
                    } else {
                        // visible = 0%
                    }
                });
            };

            const options = { threshold: [0, 0.1, 1] };
            const observer = new IntersectionObserver(callback, options);

            selectors.forEach((selector) => {
                observer.observe(selector);
            });
        });
    },
};
</script>