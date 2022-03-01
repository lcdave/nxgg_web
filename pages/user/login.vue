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
        <div class="login__error" v-if="formError">
          Die Zugangsdaten sind nicht korrekt. Bitte versuchen Sie es erneut
          oder setzen Sie ihr Passwort zurück.
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
                <nuxt-link to="/user/registration">Hier registrieren</nuxt-link
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
import * as UserService from "@/services/supabase/user";
export default {
  layout: "login",
  data: () => ({
    user: null,
    submitted: false,
    email: "",
    password: "",
    userProfile: null,
    formError: false,
  }),
  async mounted() {
    /* when the component loads, fetch the user's profile */
    this.profile = await UserService.getProfile();

    if (this.profile) {
      //TODO: Use middleware to make this redirect (avoids redirect delay)
      this.$router.push("/user/dashboard/overview");
    }
  },
  methods: {
    async signIn() {
      const { user, error } = await this.$supabase.auth.signIn({
        email: this.email,
        password: this.password,
      });
      this.userProfile = await UserService.getProfile();
      if (!error) {
        this.profile = user;
        this.$store.commit("auth/setUser", user);
        this.$router.push("/user/dashboard/overview");
      } else {
        this.formError = true;
      }
    },
  },
};
</script>
