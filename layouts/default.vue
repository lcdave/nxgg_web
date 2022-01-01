<template>
  <div>
    <topbar />
    <Nuxt />
    <footer-content />
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>

<script>
import Topbar from "@/components/Topbar.vue";
import FooterContent from "@/components/FooterContent.vue";

export default {
  components: {
    Topbar,
    FooterContent,
  },
  data: () => ({
    authenticated: false,
    authListener: null,
  }),
  async middleware({ store, $prismic }) {
    await store.dispatch("fetchMenu", $prismic);
  },
  async mounted() {
    /* When the app loads, check to see if the user is signed in */
    /* also create a listener for when someone signs in or out */
    const { data: authListener } = this.$supabase.auth.onAuthStateChange(() =>
      this.checkUser()
    );
    this.authListener = authListener;
    this.checkUser();
  },
  methods: {
    async checkUser() {
      const user = await this.$supabase.auth.user();
      if (user) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    },
  },
  beforeUnmount() {
    this.authListener?.unsubscribe();
  },
};
</script>
