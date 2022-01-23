<template>
  <div class="tourney-admin">
    <widget title="Turnier verwalten">
      <template #content>
        <tourneylist :list="tourneys" @register="onRegisterClick" adminMode />
      </template>
    </widget>
  </div>
</template>

<script>
import Vue from "vue";

import Tourneylist from "@/components/generic/tourneylist.vue";
import Widget from "@/components/generic/widget.vue";

import * as UserService from "@/services/supabase/user";

export default Vue.extend({
  name: "TourneyAdmin",
  components: { Tourneylist, Widget },
  middleware: ["auth"],
  layout: "dashboard",
  data() {
    return {
      tourneys: [],
      userProfile: null,
    };
  },
  async created() {
    let { data: tourneys, error } = await this.$supabase
      .from("tourneys")
      .select("*");

    this.tourneys = tourneys;

    await UserService.getProfile();
  },
  methods: {
    async onRegisterClick(tourneyID) {
      const { data, error } = await this.$supabase
        .from("profile_tourneys_nm")
        .insert([{ profile_id: this.user.id, tourney_id: tourneyID }]);
    },
    async getUserProfile() {
      const data = await this.$supabase.from("profiles").select("*");

      console.log("user: ", data.data);
    },
  },
});
</script>
