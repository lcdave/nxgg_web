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
          <router-link to="/user/settings">
            <font-awesome-icon :icon="['fas', 'cog']" />
          </router-link>
        </li>
      </ul>
    </div>
    <div class="side-navigation__footer">
      <font-awesome-icon
        :icon="['fas', 'power-off']"
        @click="showModal('logout')"
      />
    </div>
    <modal
      :title="modals.logout.title"
      :isActive="modals.logout.isActive"
      @accept="logout"
      @cancel="onLogoutCancel"
    >
      <template #content>Möchten Sie sich wirklich ausloggen?</template>
    </modal>
  </div>
</template>

<script>
import { HomeIcon } from "@vue-hero-icons/outline";

import * as UserService from "@/services/supabase/user";
import Modal from "@/components/generic/modal.vue";

export default {
  components: {
    HomeIcon,
    Modal,
  },
  data() {
    return {
      isAdmin: false,
      modals: {
        logout: {
          title: "Ausloggen",
          isActive: false,
          additionalParam: null,
        },
      },
    };
  },
  async created() {
    this.$nextTick(async function () {
      this.isAdmin = await UserService.checkIfAdminUser();
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
      this.$router.push("/user/login");
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
    showModal(modal, additionalParam) {
      this.modals[modal].isActive = true;

      if (additionalParam) {
        this.modals[modal].additionalParam = additionalParam;
      }
    },
    onLogoutCancel() {
      this.modals.logout.isActive = false;
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/components/_side-navigation.scss"></style>
