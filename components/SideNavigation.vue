<template>
  <div class="side-navigation">
    <div class="side-navigation__logo">
      <img src="../assets/theme/logo.svg" alt="NXGG Logo" />
    </div>
    <div class="side-navigation__cta">
      <ul>
        <li @click="onLinkClick">
          <router-link to="/user/dashboard/overview">
            <HomeIcon size="1.5x" />
          </router-link>
        </li>
        <li @click="onLinkClick">
          <router-link to="/user/dashboard/my-tourneys">
            <font-awesome-icon :icon="['fas', 'gamepad']" />
          </router-link>
        </li>
        <li @click="onLinkClick" v-if="isAdmin">
          <router-link to="/user/dashboard/tourney/admin">
            <font-awesome-icon :icon="['fas', 'user-shield']" />
          </router-link>
        </li>
        <li @click="onLinkClick">
          <router-link to="/user/dashboard/overview">
            <font-awesome-icon :icon="['fas', 'cog']" />
          </router-link>
        </li>
      </ul>
    </div>
    <div class="side-navigation__footer">
      <font-awesome-icon :icon="['fas', 'power-off']" @click="logout()" />
    </div>
  </div>
</template>

<script>
import { HomeIcon } from "@vue-hero-icons/outline";

import * as UserService from "@/services/supabase/user";

export default {
  components: {
    HomeIcon,
  },
  data() {
    return {
      isAdmin: false,
    };
  },
  async created() {
    this.isAdmin = await UserService.checkIfAdminUser();
    this.$nextTick(function () {
      this.setActiveNavItemByCurrentRoute();
    });
  },
  methods: {
    onLinkClick(e) {
      var navItems = document.querySelectorAll(".side-navigation__cta li");
      for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active");
      }
      e.currentTarget.classList.toggle("active");
    },
    logout() {
      this.$supabase.auth.signOut();
      this.$store.commit("auth/setUser", null);
      this.$router.push("/auth");
    },
    setActiveNavItemByCurrentRoute() {
      let navItems = document.querySelectorAll(".side-navigation__cta li");

      for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active");
      }

      for (let i = 0; i < navItems.length; i++) {
        if (
          navItems[i].querySelector("a").classList.contains("nuxt-link-active")
        ) {
          navItems[i].classList.add("active");
        }
      }
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/components/_side-navigation.scss"></style>
