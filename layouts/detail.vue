<template>
  <div class="detail">
    <topbar />
    <Nuxt />
    <footer-content />
  </div>
</template>

<style lang="scss" src="@/assets/sass/layout/_detail.scss"></style>

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
