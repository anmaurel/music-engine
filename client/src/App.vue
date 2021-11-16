<template>
    <section class="hero">
        <div class="hero-head">
            <Navbar />
        </div>
    </section>
    <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
    components: {
        Navbar,
    },
};
</script>
