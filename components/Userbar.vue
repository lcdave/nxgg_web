<template>
  <div class="userbar">
    <div class="userbar__user__greeting">Welcome, {{ profile.username }}!</div>
    <div class="userbar__user">
      <div class="dropdown" :class="{ 'is-active': dropdownActive }">
        <div class="dropdown-trigger" @click="onDropdownClick">
          <img
            class="userbar__user__avatar"
            src="../assets/theme/avatar.jpg"
            alt="Avatar"
          />
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a href="#" class="dropdown-item"> Einstellungen </a>
            <a href="#" class="dropdown-item" @click="showModal('logout')">
              Abmelden
            </a>
          </div>
        </div>
      </div>
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
import { ChevronDownIcon } from "@vue-hero-icons/outline";
import Modal from "@/components/generic/modal.vue";

import * as UserService from "@/services/supabase/user";

export default {
  props: {
    user: {
      type: Object,
    },
  },
  components: {
    ChevronDownIcon,
    Modal,
  },
  data() {
    return {
      dropdownActive: false,
      modals: {
        logout: {
          title: "Ausloggen",
          isActive: false,
          additionalParam: null,
        },
      },
      profile: {
        username: "",
      },
    };
  },
  async created() {
    this.profile = await UserService.getProfile();
  },
  methods: {
    onDropdownClick() {
      this.dropdownActive = !this.dropdownActive;
    },
    logout() {
      this.$supabase.auth.signOut();
      this.$store.commit("auth/setUser", null);
      this.$router.push("/user/login");
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

<style lang="scss" src="@/assets/sass/components/_userbar.scss"></style>
