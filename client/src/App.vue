<template>
    <section class="hero">
        <div class="hero-head">
            <Navbar />
        </div>
    </section>
    <PopupNotif v-if="popupStatus" />
    <router-view />
</template>

<script>
import { mapGetters } from "vuex";

import Navbar from "@/components/Navbar.vue";
import PopupNotif from "@/components/PopupNotification.vue";

export default {
    components: {
        Navbar,
        PopupNotif,
    },
    computed: {
        ...mapGetters("app", { popupStatus: "getPopupStatus" }),
    },
    mounted() {
        if(localStorage.lang != null) this.$i18n.locale = localStorage.lang; 
    }
};
</script>
