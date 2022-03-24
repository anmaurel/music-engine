<template>
    <div id="popup-notif" class="notification has-text-weight-semibold">
        <button class="delete" @click="closePopup"></button>
        {{ popupText }}
    </div>
</template>

<script>
import { mapGetters } from "vuex"; 

export default {
    props: ['title'],
    computed: {
        ...mapGetters("app", { popupText: "getPopupText" }),
    },
    methods: {
        closePopup(event) {
            event.target.parentNode.style.display = "none";
        },
    }
};
</script>