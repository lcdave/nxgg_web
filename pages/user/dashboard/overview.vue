<template>
  <div>
    <div v-if="user">YOU ARE LOGGED IN {{ user.email }}</div>
    <div>Welcome to the dashboard</div>
    <div class="datalist">
      <div class="datalist__title"><h3>Turniere</h3></div>
      <div class="datalist__content">
        <div
          class="datalist__item"
          v-for="(tourney, index) in tourneys"
          :key="index"
        >
          <div class="datalist__item-title">{{ tourney.title }}</div>
          <div class="datalist__item-action">
            <button @click="onRegisterClick(tourney.id)">Anmelden</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import * as TourneyService from "@/services/tourneys/tourneys";

export default Vue.extend({
  name: "",
  middleware: ["auth"],
  layout: "dashboard",
  data() {
    return {
      user: "",
      tourneys: [],
    };
  },
  async created() {
    this.user = this.$supabase.auth.user();
    console.log(this.user);

    let { data: tourneys, error } = await this.$supabase
      .from("tourneys")
      .select("*");

    this.tourneys = tourneys;

    console.log(error);
    console.log(tourneys);
  },
  methods: {
    async onRegisterClick(tourneyID) {
      const { data, error } = await this.$supabase
        .from("profile_tourneys_nm")
        .insert([{ profile_id: this.user.id, tourney_id: tourneyID }]);
    },
  },
});
</script>
