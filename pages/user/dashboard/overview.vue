<template>
  <div class="overview">
    <widget title="Anstehende Turniere">
      <template #content>
        <tourneylist
          :list="tourneys"
          @register="onRegisterClick"
          variant="global"
          dataFilter="future"
          v-if="tourneys"
        />
      </template>
    </widget>
  </div>
</template>

<script>
import Vue from "vue";

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

    console.log("user", this.user);

    let { data: tourneys, error } = await this.$supabase
      .from("tourneys")
      .select("*");

    this.tourneys = tourneys;

    console.log(error);
    console.log(tourneys);
  },
  methods: {
    async onRegisterClick(tourneyID) {
      // check if user is already registered
      const { data, error } = await this.$supabase
        .from("profile_tourneys_nm")
        .select("*")
        .eq("profile_id", this.user.id)
        .eq("tourney_id", tourneyID);

      if (data.length === 0) {
        const { data, error } = await this.$supabase
          .from("profile_tourneys_nm")
          .insert([{ profile_id: this.user.id, tourney_id: tourneyID }]);

        if (error) {
          this.$toast.show(
            "Anmeldung konnte nicht registriert werden. Bitte kontaktieren Sie den Administrator",
            {
              duration: 4000,
              type: "error",
              position: "top-right",
            }
          );
        } else {
          this.$toast.show("Anmeldung erfolgreich", {
            duration: 4000,
            type: "success",
            position: "top-right",
          });
        }
      } else {
        this.$toast.show("Sie sind bereits für dieses Turnier angemeldet", {
          duration: 4000,
          type: "info",
          position: "top-right",
        });
      }
    },
  },
});
</script>
