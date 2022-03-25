<template>
    <div class="autocomplete">
        <input
            type="text"
            class="input is-normal is-success"
            placeholder="Track name ..."
            @input="onChange"
            v-model="search"
            @keydown.down="onArrowDown"
            @keydown.up="onArrowUp"
            @keydown.enter="onEnter"
        />
        <ul
            id="autocomplete-results"
            v-show="isOpen"
            class="autocomplete-results block-custom-bg px-2 py-2"
        >
            <li class="loading" v-if="isLoading">Loading results...</li>
            <li
                v-else
                v-for="(result, i) in results"
                :key="i"
                @click="setResult(result)"
                class="autocomplete-result px-2 py-2"
                :class="{ 'is-active': i === arrowCounter }"
            >
                <div class="tile is-ancestor">
                    <div class="tile is-2 is-parent">
                        <div class="tile is-child">
                            <figure class="image is-64x64">
                                <img
                                    :src="result.album.images[0].url"
                                    :alt="result.album.name"
                                />
                            </figure>
                        </div>
                    </div>
                    <div class="tile is-10 is-vertical is-parent">
                        <div class="tile is-child">
                            <p>{{ result.name }}</p>
                        </div>
                        <div class="tile is-child">
                            <p class="m-0">
                                <span
                                    v-for="(artist, i) in result.artists"
                                    class="
                                        has-background-gradient-1
                                        p-stickers
                                        is-inline-block
                                        has-text-white
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
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "SearchAutocomplete",
    data() {
        return {
            isOpen: false,
            isLoading: false,
            results: [],
            search: "",
            arrowCounter: -1,
        };
    },
    computed: {
        ...mapGetters("spotify", { 
            searchResults: "getSearchResults", 
            playlistStartTracks: "getPlaylistGenStartTracks" 
        }),
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    destroyed() {
        document.removeEventListener("click", this.handleClickOutside);
    },
    methods: {
        async setResult(result) {
            this.search = "";
            this.isOpen = false;

            if (this.playlistStartTracks.length > 4) {
                await this.$store.dispatch("app/setPopupNotif", {
                    text: `Impossible to put than more 5 tracks !`,
                    status: true,
                });
                document.getElementById("popup-notif").style.display = "block";
            } else {
                this.$store.dispatch("spotify/setPlaylistGenStartTracks", result);

                await this.$store.dispatch("app/setPopupNotif", {
                    text: `Track "${result.name}" successfully added !`,
                    status: true,
                });
                document.getElementById("popup-notif").style.display = "block";
            }
            
        },
        async onChange() {
            const params = {
                q: `genre:${this.search}`,
                type: "track",
                limit: 50,
            };
            await this.$store.dispatch("spotify/searchItem", params);

            this.results = this.searchResults.tracks.items;
            this.isOpen = true;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        },
        onArrowDown() {
            if (this.arrowCounter < this.results.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        onEnter() {
            this.search = this.results[this.arrowCounter];
            this.isOpen = false;
            this.arrowCounter = -1;
        },
    },
};
</script>

<style>
.autocomplete-results {
    border: 0px solid;
    max-height: 200px;
    overflow: auto;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
    background-color: #0e1121;
    color: #fff;
    font-weight: 600;
}
</style>