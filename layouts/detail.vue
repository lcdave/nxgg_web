<template>
  <div class="detail">
    <topbar />
    <Nuxt />
    <footer-content />
  </div>
</template>

<style lang="scss" src="@/assets/sass/layout/_detail.scss"></style>

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
