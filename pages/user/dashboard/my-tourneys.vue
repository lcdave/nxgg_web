<template>
  <div class="my-tourneys">
    <widget title="Turnier verwalten">
      <template #content>
        <tourneylist
          :list="tourneys"
          @register="onRegisterClick"
          adminMode
          variant="user"
        />
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
  name: "myTourneys",
  layout: "dashboard",
  components: { Tourneylist, Widget },
  middleware: ["auth", "admin"],
  data() {
    return {
      tourneys: [],
      user: null,
      userProfile: null,
    };
  },
  async created() {
    let { data: tourneys, error } = await this.$supabase
      .from("tourneys")
      .select("*");

    await UserService.getAuthUser().then((user) => {
      this.user = user;
    });

    this.tourneys = tourneys;

    await UserService.getProfile().then((profile) => {
      this.userProfile = profile;
    });
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
