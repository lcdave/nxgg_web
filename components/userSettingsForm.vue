<template>
  <div class="user-settings-form">
    <div class="field">
      <label class="label">Benutzername</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="text" v-model="profile.username" disabled />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label">Neues Password</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="password" v-model="user.password" />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label">Neues Password wiederholen</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="password" v-model="user.passwordRepeat" />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </div>
    </div>
    <div class="field" v-if="formError">
      <div class="user-settings-form__error">
        {{ formError }}
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary" @click="changePassword">
          Speichern
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import * as UserService from "@/services/supabase/user";

export default Vue.extend({
  name: "UserSettingsForm",
  middleware: ["auth"],
  data() {
    return {
      profile: {
        username: "",
      },
      user: {
        password: "",
        passwordRepeat: "",
      },
      formError: null,
    };
  },
  async created() {
    this.profile = await UserService.getProfile();
  },
  methods: {
    async changePassword() {
      if (this.user.password !== this.user.passwordRepeat) {
        this.formError = "Passwörter stimmen nicht überein";
        return;
      } else {
        this.formError = null;

        const { user, error } = await this.$supabase.auth.update({
          password: this.user.password,
        });

        if (error) {
          this.$toast.show("Passwort konnte nicht gändert werden.", {
            duration: 4000,
            type: "error",
            position: "top-right",
          });
        } else {
          this.$toast.show("Passwort erfolgreich geändert.", {
            duration: 4000,
            type: "success",
            position: "top-right",
          });
        }
      }
    },
  },
});
</script>

<style
  lang="scss"
  src="@/assets/sass/components/_user-settings-form.scss"
></style>
