<template>
  <div class="userbar">
    <div class="userbar__user__greeting">Good Evening Davide!</div>
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
            <a href="#" class="dropdown-item"> Abmelden </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon } from "@vue-hero-icons/outline";

export default {
  props: {
    user: {
      type: Object,
    },
  },
  components: {
    ChevronDownIcon,
  },
  data() {
    return {
      dropdownActive: false,
    };
  },
  methods: {
    onDropdownClick() {
      this.dropdownActive = !this.dropdownActive;
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/components/_userbar.scss"></style>
