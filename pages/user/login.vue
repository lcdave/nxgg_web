<template>
  <div class="login-page">
    <div class="login">
      <div class="login__form">
        <div class="login__logo">
          <img src="@/assets/theme/logo.svg" alt="NXGG Logo" />
        </div>
        <div class="login__title">
          <h2>Login</h2>
        </div>
        <form @submit.prevent="signIn">
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="email"
                placeholder="john@example.com"
                v-model="email"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="password"
                v-model="password"
                placeholder="Passwort"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <p>
                Noch keinen Benutzer vorhanden?
                <nuxt-link to="/supabase/registration"
                  >Hier registrieren</nuxt-link
                >.
              </p>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary">Einloggen</button>
            </div>
          </div>
        </form>
      </div>
      <div class="login__image"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "login",
  data: () => ({
    user: null,
    submitted: false,
    email: "",
    password: "",
    userProfile: null,
  }),
  async created() {
    this.profile = this.$supabase.auth.user();

    //TODO: Use middleware to make this redirect (avoids redirect delay)
    if (this.profile) {
      this.$router.push("/user/dashboard/overview");
    }

    await this.getUserProfile();
    console.log("user profile: ", this.userProfile);
  },
  methods: {
    async signIn() {
      const { user, error } = await this.$supabase.auth.signIn({
        email: this.email,
        password: this.password,
      });
      await this.getUserProfile();
      console.log("user profile: ", this.userProfile);

      //const isAdmin = userProfile.isAdmin;

      if (!error) {
        this.profile = user;
        this.$store.commit("auth/setUser", user);
        //this.$store.commit("auth/setAdmin", isAdmin);
        this.$router.push("/user/dashboard/overview");
      } else {
        console.log(error);
      }
    },
    async getUserProfile() {
      const { user } = await this.$supabase.from("profiles").select("*");

      console.log("user profile: ", user);

      this.userProfile = user;
    },
  },
  async mounted() {
    /* when the component loads, fetch the user's profile */
    const profile = await this.$supabase.auth.user();
    this.profile = profile;
  },
};
</script>
