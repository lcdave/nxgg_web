<template>
  <div class="login-page">
    <div class="login">
      <div class="login__form">
        <div class="login__logo">
          <img src="@/assets/theme/logo.svg" alt="NXGG Logo" />
        </div>
        <div class="login__title">
          <h2>Account erstellen</h2>
        </div>
        <form @submit.prevent="signUp">
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="text"
                placeholder="Benutzername"
                v-model="username"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
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
                Account bereits vorhanden? Stattdessen
                <nuxt-link to="/supabase/login">einloggen</nuxt-link>.
              </p>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary">Registrieren</button>
            </div>
          </div>
        </form>
      </div>
      <div class="login__image"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "",
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      username: "",
    };
  },
  methods: {
    async signUp() {
      const { user, session, error } = await this.$supabase.auth.signUp({
        email: this.email,
        password: this.password,
        username: this.username,
      });
      console.log(user, error, session);
    },
  },
});
</script>
