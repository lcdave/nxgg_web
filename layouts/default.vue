<template>
  <div class="website">
    <topbar />
    <Nuxt />
    <footer-content />
  </div>
</template>

<style lang="scss" src="@/assets/sass/layout/_website.scss"></style>

<script>
import Topbar from "@/components/Topbar.vue";
import FooterContent from "@/components/FooterContent.vue";

export default {
  components: {
    Topbar,
    FooterContent,
  },
};
</script>
