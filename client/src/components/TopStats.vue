<template>
    <div class="card m-2 block-custom-bg">
        <div class="card-image">
            <figure class="image is-1by1">
                <img :src="image" :alt="name" />
            </figure>
        </div>
        <div class="card-content">
            <div class="media is-vcenter">
                <div
                    class="
                        media-left
                        has-background-gradient-1
                        px-1
                        border-radius-sm
                    "
                >
                    <p class="title is-4 has-text-white">.{{ index }}</p>
                </div>
                <div class="media-content">
                    <p class="title is-5 has-text-white">{{ name }}</p>
                </div>
            </div>
        </div>
        <div class="card-footer is-block">
            <nav class="level is-mobile">
                <div class="level-item has-text-centered">
                    <div>
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
    props: ["index", "name", "genres", "popularity", "followers", "image"],
};
</script>
