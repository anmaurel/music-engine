<template>
    <footer>
        <hr class="hr-foot" />
        <div class="columns is-centered py-4">
            <div class="column is-3">
                <p class="has-text-weight-semibold">Copyright © 2021 - All rights reserved</p>
            </div>
            <div class="column is-3">
                <img
                    src="@/assets/img/logo-color.svg"
                    alt="Logo"
                    style="width: auto; height: 1.2rem"
                />
            </div>
            <div class="column is-3">
                <p class="has-text-weight-semibold">
                    Share on social media
                    <a href="https://www.instagram.com/p/CXdjarbMjn8/?utm_medium=share_sheet">
                        <font-awesome-icon
                            :icon="['fab', 'instagram']"
                            class="mx-1 has-text-info"
                            size="lg"
                        />
                    </a>
                    <!-- <a href="">
                        <font-awesome-icon
                            :icon="['fab', 'twitter']"
                            class="mx-1 has-text-info"
                            size="lg"
                        />
                    </a>
                    <a href="">
                        <font-awesome-icon
                            :icon="['fab', 'linkedin']"
                            class="mx-1 has-text-info"
                            size="lg"
                        />
                    </a> -->
                </p>
            </div>
        </div>
    </footer>
</template>