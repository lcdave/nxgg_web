<template>
  <div class="mainnav" :class="{ 'mainnav--active': isActive }">
    <div class="mainnav__trigger"></div>
    <div class="mainnav__content" :class="isActive">
      <div class="mainnav__links">
        <a href="#" class="navbar-item">Home</a>
        <a href="#news" class="navbar-item">News</a>
        <a href="#events" class="navbar-item">Events</a>
        <a href="#tourneys" class="navbar-item">Tourneys</a>
      </div>
      <div class="mainnav__fixed-links">
        <router-link to="/user/login/"> Login </router-link>
      </div>
      <div class="mainnav__social-media">
        <div class="mainnav__social-media-title">Follow us</div>
        <div class="mainnav__social-media-icons">
          <a href="https://www.facebook.com/nxggesports/" target="_blank">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </a>
          <a
            href="https://www.instagram.com/next_gaming_generation/?hl=de"
            target="_blank"
          >
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
          <a href="https://www.twitch.tv/nxgg_tv" target="_blank">
            <font-awesome-icon :icon="['fab', 'twitch']" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Navigation",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hamburgerOpen: false,
    };
  },
});
</script>

<style lang="scss" src="../assets/sass/components/_navigation.scss"></style>
