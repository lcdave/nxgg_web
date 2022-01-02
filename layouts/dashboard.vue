<template>
  <div class="dashboard">
    <side-navigation />
    <main>
      <Nuxt />
      <button @click="logout()">Logout</button>
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
  methods: {
    logout() {
      this.$supabase.auth.signOut();
      this.$store.commit("auth/setUser", null);
      this.$router.push("/auth");
    },
  },
});
</script>

<style lang="scss" src="@/assets/sass/layout/_dashboard.scss"></style>
