<template>
  <div class="dashboard">
    <side-navigation />
    <main>
      <userbar :user="user" />
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
    return {
      user: "",
    };
  },
  async created() {
    this.user = this.$supabase.auth.user();
  },
});
</script>

<style lang="scss" src="@/assets/sass/layout/_dashboard.scss"></style>
