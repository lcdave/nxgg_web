<template>
  <div class="topbar" :class="{ 'nav-is-active': isNavActive }">
    <div class="logo">
      <nuxt-link
        :to="{
          name: 'index',
        }"
      >
        <img src="../assets/theme/logo.svg" alt="NXGG Logo" />
      </nuxt-link>
    </div>
    <div
      class="hamburger"
      @click="onBurgerClick()"
      :class="hamburgerOpen ? 'hamburger--is-open' : ''"
    >
      <div class="hamburger__item hamburger__item--first"></div>
      <div class="hamburger__item hamburger__item--middle"></div>
      <div class="hamburger__item hamburger__item--last"></div>
    </div>
    <navigation :isActive="isNavActive" />
    <div class="overlay" :class="{ 'overlay--active': isNavActive }"></div>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";

export default {
  name: "Topbar",
  components: {
    Navigation,
  },
  data() {
    return {
      hamburgerOpen: false,
      isNavActive: false,
    };
  },
  methods: {
    onBurgerClick() {
      this.hamburgerOpen = !this.hamburgerOpen;
      this.isNavActive = !this.isNavActive;

      if (this.isNavActive) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    },
  },
};
</script>

<style lang="scss" src="../assets/sass/components/_topbar.scss"></style>
