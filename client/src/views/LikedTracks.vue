<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-size-1 has-text-white">Liked tracks</h1>
                <p class="subtitle has-text-weight-light has-text-white">
                    Allows you to switch from liked tracks to your own playlists
                    with a drag & drop system
                </p>
                <div class="mt-6">
                    <div class="columns">
                        <div class="column is-5">
                            <div
                                class="card mb-2 block-custom-bg"
                                id="drag-card"
                                draggable="true"
                                v-for="(savedTrack, index) in savedTracks.items"
                                :key="savedTrack.track.id"
                                @dragstart="dragStart($event)"
                            >
                                <div class="card-content p-2">
                                    <div class="media">
                                        <div class="media-left">
                                            <figure class="image is-48x48">
                                                <img
                                                    :src="
                                                        savedTrack.track.album
                                                            .images[0].url
                                                    "
                                                    :alt="savedTrack.track.name"
                                                />
                                            </figure>
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
                                                {{ savedTrack.track.name }}
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
                                                    ) in savedTrack.track
                                                        .artists"
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
                        <div class="column is-2"></div>
                        <div class="column is-5 sticky">
                            <div
                                class="card mb-2 p-4 block-custom-bg"
                                v-for="(playlist, index) in playlists.items"
                                :key="playlist.id"
                                @dragenter="dragEnter($event)"
                                @dragover="dragOver($event)"
                                @dragleave="dragLeave($event)"
                                @drop="drop($event)"
                            >
                                <div class="card-content p-2">
                                    <div class="media">
                                        <div class="media-content">
                                            <p
                                                class="
                                                    title
                                                    is-4
                                                    has-text-white
                                                "
                                            >
                                                {{ playlist.name }}
                                            </p>
                                            <p
                                                class="
                                                    subtitle
                                                    is-6
                                                    has-text-white
                                                "
                                            >
                                                Playlist {{ index + 1 }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    name: "LikedTracks",
    data() {
        return {};
    },
    computed: {
        ...mapGetters("spotify", {
            savedTracks: "getSavedTracks",
            playlists: "getPlaylists",
        }),
    },
    methods: {
        nonDragZone() {
            return false;
        },
        dragStart(event) {
            event.dataTransfer.setData("text/plain", event.target.id);
            setTimeout(() => {
                event.target.classList.add("is-hidden");
            }, 0);
        },
        dragEnter(event) {
            event.preventDefault();
            event.target.classList.add("drag-over");
        },
        dragOver(event) {
            event.preventDefault();
            event.target.classList.add("drag-over");
        },
        dragLeave(event) {
            event.target.classList.remove("drag-over");
        },
        drop(event) {
            event.target.classList.remove("drag-over");

            const id = event.dataTransfer.getData("text/plain");
            const draggable = document.getElementById(id);

            event.target.appendChild(draggable);
            draggable.classList.remove("is-hidden");
            event.dataTransfer.clearData();
        },
    },
    async mounted() {
        await this.$store.dispatch("spotify/getSavedTracks", 50);
        await this.$store.dispatch("spotify/getPlaylists", 10);
    },
};
</script>