<template>
    <div class="card m-2 block-custom-bg">
        <div class="card-image">
            <figure class="image is-1by1">
                <img :src="image" :alt="name" />
            </figure>
        </div>
        <div class="card-content px-2 py-4">
            <div class="media">
                <div
                    class="
                        media-left
                        has-background-gradient-1
                        px-1
                        border-radius-sm
                    "
                    v-if="!playlistGen"
                >
                    <p class="title is-3 has-text-white">.{{ index }}</p>
                </div>
                <div class="media-content">
                    <p
                        class="title is-5 has-text-white"
                        @mouseover="isNameHovered = true"
                        @mouseleave="isNameHovered = false"
                    >
                        {{ isNameHovered ? name : truncate(name, 14, "...") }}
                    </p>
                </div>
            </div>
        </div>
        <div class="card-footer is-block p-2">
            <p
                class="has-text-left has-text-black has-text-weight-medium pb-2"
                v-if="type === 'track'"
                @mouseover="isArtistHovered = true"
                @mouseleave="isArtistHovered = false"
            >
                <span
                    v-if="!isArtistHovered"
                    v-for="(artist, index) in artists"
                    class="has-background-gradient-1 p-stickers is-inline-block has-text-white"
                    ><font-awesome-icon
                        :icon="['far', 'user']"
                        v-if="!isTooManyArtist(index)"
                        class="mr-1"
                        size="sm"
                    />{{ isTooManyArtist(index) ? "" : artist.name
                    }}<font-awesome-icon
                        :icon="['fas', 'plus']"
                        v-if="index == 2"
                        size="sm"
                    />
                </span>
                <span
                    v-if="isArtistHovered"
                    v-for="artist in artists"
                    class="has-background-gradient-1 p-stickers is-inline-block has-text-white"
                    ><font-awesome-icon
                        :icon="['far', 'user']"
                        class="mr-1"
                        size="sm"
                    />{{ artist.name }}
                </span>
            </p>
            <nav class="level is-mobile" v-if="!playlistGen">
                <div class="level-item has-text-centered">
                    <div v-if="type === 'artist'">
                        <p class="heading has-text-white">followers</p>
                        <p
                            class="
                                has-text-weight-semibold
                                has-text-black
                                has-background-gradient-1
                                p-sticker
                                is-size-6
                            "
                        >
                            {{
                                followers
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }}
                        </p>
                    </div>
                    <div v-if="type === 'track'">
                        <p class="heading has-text-white">duration</p>
                        <p
                            class="
                                has-text-weight-semibold
                                has-text-black
                                has-background-gradient-1
                                p-sticker
                                is-size-6
                            "
                        >
                            {{ millisToMin(duration) }}
                        </p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading has-text-white">popularity</p>
                        <p
                            class="
                                has-text-weight-semibold
                                has-text-black
                                has-background-gradient-1
                                p-sticker
                                is-size-6
                            "
                        >
                            {{ popularity }}%
                        </p>
                    </div>
                </div>
            </nav>
            <!-- <div class="columns mb-0">
                <div class="column is-7 has-text-left">
                    <p class="has-text-white is-size-7">followers</p>
                    <p class="has-text-black has-text-weight-medium">
                        <span
                            class="
                                has-background-gradient-1
                                p-sticker
                                is-size-6
                            "
                            >{{
                                followers
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }}</span
                        >
                    </p>
                </div>
                <div class="column is-5 has-text-left">
                    <p class="has-text-white is-size-7">popularity</p>
                    <p class="has-text-black has-text-weight-semibold">
                        <span
                            class="
                                has-background-gradient-1
                                p-sticker
                                is-size-6
                            "
                            >{{ popularity }}%</span
                        >
                    </p>
                </div>
            </div> -->
            <!-- <p class="has-text-left has-text-white is-size-7">popularity</p>
            <progress class="progress is-small has-background-gradient-1 mb-2" :value="popularity" max="100"></progress> -->
            <!-- <p class="has-text-left has-text-white is-size-7">genres</p>
            <p class="has-text-left has-text-black has-text-weight-medium">
                <span
                    v-for="genre in genres"
                    class="has-background-gradient-1 p-stickers"
                    >{{ genre }}</span
                >
            </p> -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        playlistGen: {
            type: Boolean,
            default: false
        },
        index: Number,
        name: String,
        genres: Array,
        popularity: Number,
        followers: Number,
        image: String,
        artists: Array,
        duration: Number,
    },
    data() {
        return {
            isNameHovered: false,
            isArtistHovered: false,
        };
    },
    methods: {
        truncate(text, length, suffix) {
            if (text.length > length) {
                return text.substring(0, length) + suffix;
            }
            return text;
        },
        millisToMin(millis) {
            const minutes = Math.floor(millis / 60000);
            const seconds = ((millis % 60000) / 1000).toFixed(0);
            return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        },
        isTooManyArtist(index) {
            if (index < 2) {
                return false;
            }
            return true;
        },
    },
};
</script>
