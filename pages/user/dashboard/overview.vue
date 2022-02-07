<template>
  <div class="overview">
    <widget title="Anstehende Turniere">
      <template #content>
        <tourneylist
          :list="tourneys"
          @register="onRegisterClick"
          variant="global"
        />
      </template>
    </widget>
  </div>
</template>

<script>
import Vue from "vue";

import * as TourneyService from "@/services/tourneys/tourneys";
import Tourneylist from "@/components/generic/tourneylist.vue";
import Widget from "@/components/generic/widget.vue";

export default Vue.extend({
  name: "DashboardOverview",
  components: { Tourneylist, Widget },
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
