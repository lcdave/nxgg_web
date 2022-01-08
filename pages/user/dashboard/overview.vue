<template>
  <div>
    <userbar :user="user" />
    <div>Welcome to the dashboard</div>
    <tourneylist :list="tourneys" />
  </div>
</template>

<script>
import Vue from "vue";

import * as TourneyService from "@/services/tourneys/tourneys";
import Tourneylist from "@/components/generic/tourneylist.vue";

export default Vue.extend({
  name: "DashboardOverview",
  components: { Tourneylist },
  middlewar: ["auth"],
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
