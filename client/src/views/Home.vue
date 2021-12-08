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
                        data-onscroll-delay="x2"
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
                                    >Spotify</span
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
                                    >Data</span
                                >
                            </p>
                        </div>
                        <p
                            class="
                                is-size-5
                                has-text-weight-normal has-text-justified
                            "
                        >
                            Music Engine is a platform where you can find all
                            kinds of statistics about users and artists on
                            Spotify, displayed in graphical form for better
                            visualisation. Music Engine also allows you tox
                            follow the evolution of the artists' statistics and
                            their songs as an innovative graphical.
                        </p>
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
                                    >Playlist generation</span
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
                                    >Functionality</span
                                >
                            </p>
                        </div>
                        <p
                            class="
                                is-size-5
                                has-text-weight-normal has-text-justified
                            "
                        >
                            Music Engine is a platform where you can find all
                            kinds of statistics about users and artists on
                            Spotify, displayed in graphical form for better
                            visualisation. Music Engine also allows you tox
                            follow the evolution of the artists' statistics and
                            their songs as an innovative graphical.
                        </p>
                    </div>
                    <div
                        data-onscroll
                        data-onscroll-animation="travel-y"
                        data-onscroll-delay="x2"
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
                        data-onscroll-delay="x2"
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
                                    >Data visualization</span
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
                                    >Functionality</span
                                >
                            </p>
                        </div>
                        <p
                            class="
                                is-size-5
                                has-text-weight-normal has-text-justified
                            "
                        >
                            Music Engine is a platform where you can find all
                            kinds of statistics about users and artists on
                            Spotify, displayed in graphical form for better
                            visualisation. Music Engine also allows you tox
                            follow the evolution of the artists' statistics and
                            their songs as an innovative graphical.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero-foot mt-6"></div>
    </section>
    <!-- <section class="hero">
            <div class="hero-head mb-6">
                <img
                    src="@/assets/img/logo.svg"
                    alt="Logo"
                    style="width: 45%; margin: 0 auto"
                />
                <div class="pt-6" style="width: 80%; margin-left: 10%">
                    <p class="is-size-5 has-text-weight-light">
                        Music Engine is a platform where you can find all kinds
                        of statistics about users and artists on Spotify,
                        displayed in graphical form for better visualisation.
                        Music Engine also allows you to follow the evolution of
                        the artists' statistics and their songs as a innovative
                        graphical.
                    </p>
                    <button
                        class="
                            button
                            has-background-gradient-1 has-text-white
                            mt-6
                            has-text-weight-medium
                            is-size-5
                        "
                    >
                        <i class="fab fa-spotify mr-2"></i>
                        Join us now !
                    </button>
                </div>
            </div>
            <div class="hero-body mt-6">
                <div class="columns is-multiline">
                    <div class="column is-3">
                        <div class="card pt-2 px-2">
                            <div class="card-image home-card">
                                <figure class="image">
                                    <img
                                        src="@/assets/img/screen_recent_plays.png"
                                        alt="Placeholder image"
                                    />
                                </figure>
                            </div>
                            <footer class="card-footer">
                                <p
                                    class="
                                        card-footer-item
                                        has-text-weight-bold
                                    "
                                >
                                    <span
                                        ><i class="far fa-play-circle mr-2"></i
                                        >Recent plays</span
                                    >
                                </p>
                            </footer>
                        </div>
                    </div>
                    <div class="column is-3">
                        <div class="card pt-2 px-2">
                            <div class="card-image home-card">
                                <figure class="image">
                                    <img
                                        src="@/assets/img/screen_top_artists.png"
                                        alt="Placeholder image"
                                    />
                                </figure>
                            </div>
                            <footer class="card-footer">
                                <p
                                    class="
                                        card-footer-item
                                        has-text-weight-bold
                                    "
                                >
                                    <span
                                        ><i class="far fa-user mr-2"></i>Top
                                        artists</span
                                    >
                                </p>
                            </footer>
                        </div>
                    </div>
                    <div class="column is-3">
                        <div class="card pt-2 px-2">
                            <div class="card-image home-card">
                                <figure class="image">
                                    <img
                                        src="@/assets/img/screen_top_tracks.png"
                                        alt="Placeholder image"
                                    />
                                </figure>
                            </div>
                            <footer class="card-footer">
                                <p
                                    class="
                                        card-footer-item
                                        has-text-weight-bold
                                    "
                                >
                                    <span
                                        ><i class="far fa-file-audio mr-2"></i
                                        >Top tracks</span
                                    >
                                </p>
                            </footer>
                        </div>
                    </div>
                    <div class="column is-3">
                        <div class="card pt-2 px-2">
                            <div class="card-image home-card">
                                <figure class="image">
                                    <img
                                        src="@/assets/img/screen_devices.png"
                                        alt="Placeholder image"
                                    />
                                </figure>
                            </div>
                            <footer class="card-footer">
                                <p
                                    class="
                                        card-footer-item
                                        has-text-weight-bold
                                    "
                                >
                                    <span
                                        ><i class="fas fa-laptop-house mr-2"></i
                                        >Devices</span
                                    >
                                </p>
                            </footer>
                        </div>
                    </div>
                    <div class="column is-3">
                        <div class="card pt-2 px-2">
                            <div class="card-image home-card">
                                <figure class="image">
                                    <img
                                        src="@/assets/img/screen_historical.png"
                                        alt="Placeholder image"
                                    />
                                </figure>
                            </div>
                            <footer class="card-footer">
                                <p
                                    class="
                                        card-footer-item
                                        has-text-weight-bold
                                    "
                                >
                                    <span
                                        ><i class="fas fa-history mr-2"></i
                                        >Historical artists</span
                                    >
                                </p>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
</template>

<script>
import { mapGetters } from "vuex";

import MainLogo from "@/components/svg/MainLogo.vue";

export default {
    name: "Home",
    components: {
        MainLogo,
    },
    computed: {
        ...mapGetters("spotify", { profile: "getProfile" }),
    },
    methods: {
        hideScrollIndication(event) {
            event.target.style.display = "none";
            console.log("ok");
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