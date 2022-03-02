<template>
  <div class="login-page">
    <div class="login">
      <div class="login__form" v-if="!isLoading">
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
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="password"
                v-model="passwordRepeat"
                placeholder="Passwort wiederholen"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <div class="field" v-if="errors">
            <div class="control">
              <div class="error" v-for="(error, index) in errors" :key="index">
                {{ error }}
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <p>
                Account bereits vorhanden? Stattdessen
                <nuxt-link to="/user/login">einloggen</nuxt-link>.
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
      <div class="login__form" v-if="isLoading">
        <spinner>
          <template #text> Benutzer wird registriert... </template>
        </spinner>
      </div>
      <div class="login__image"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import * as UserService from "@/services/supabase/user";

import Spinner from "@/components/generic/spinner.vue";

export default Vue.extend({
  name: "Registration",
  layout: "login",
  components: {
    Spinner,
  },
  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
      username: "",
      errors: [],
      isLoading: false,
    };
  },
  methods: {
    async signUp() {
      this.errors = [];
      this.isLoading = true;

      if (this.password !== this.passwordRepeat) {
        this.errors.push("Passwörter stimmen nicht überein");
      }

      if (this.password.length < 8) {
        this.errors.push("Passwort muss mindestens 8 Zeichen lang sein");
      }
      if (this.username.length < 3) {
        this.errors.push("Benutzername muss mindestens 3 Zeichen lang sein");
      }

      if (await UserService.checkIfUsernameExists(this.username)) {
        this.errors.push("Benutzername bereits vergeben");
      }

      if (await UserService.checkIfEmailExists(this.email)) {
        this.errors.push("Email Adresse wird bereits verwendet");
      }

      this.isLoading = false;

      if (this.errors.length == 0) {
        this.isLoading = true;
        const { user, session, error } = await this.$supabase.auth.signUp(
          {
            email: this.email,
            password: this.password,
          },
          {
            data: {
              user_name: this.username,
              email: this.email,
            },
          }
        );

        this.isLoading = false;

        if (error) {
          this.$toast.show("Fehler, bitte kontaktieren Sie den Administrator", {
            duration: 4000,
            type: "error",
            position: "top-right",
          });
        } else {
          this.$toast.show("Registrierung erfolgreich", {
            duration: 4000,
            type: "success",
            position: "top-right",
          });
          this.$router.push("/user/login");
        }
      }
    },
  },
});
</script>
