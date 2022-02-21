<template>
  <div class="userbar">
    <div class="userbar__user__greeting">Welcome, {{ profile.username }}!</div>
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
  async mounted() {
    if (this.user) {
      this.profile = await UserService.getProfile();
    }
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
