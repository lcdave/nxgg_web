<template>
  <div class="dashboard">
    <side-navigation />
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Vue from "vue";
import SideNavigation from "@/components/SideNavigation.vue";

export default Vue.extend({
  components: { SideNavigation },
  name: "",
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" src="@/assets/sass/layout/_dashboard.scss"></style>
