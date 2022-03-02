<template>
  <div class="overview">
    <widget title="Anstehende Turniere">
      <template #content>
        <tourneylist
          :list="tourneys"
          @register="onRegisterClick"
          @unsubscribe="onUnsubscribeClick"
          variant="global"
          dataFilter="future"
          v-if="tourneys"
          :user="user"
          :key="rerenderHelper"
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
      rerenderHelper: 0,
    };
  },
  async created() {
    this.user = this.$supabase.auth.user();

    let { data: tourneys, error } = await this.$supabase
      .from("tourneys")
      .select("*")
      .order("date", { ascending: true });

    this.tourneys = tourneys;
  },
  methods: {
    forceRerender() {
      this.rerenderHelper += 1;
    },
    async onRegisterClick(tourneyID) {
      // check if user is already registered
      const { data, error } = await this.$supabase
        .from("profile_tourneys_nm")
        .select("*")
        .eq("profile_id", this.user.id)
        .eq("tourney_id", tourneyID);

      if (data.length === 0) {
        const { data, error2 } = await this.$supabase
          .from("profile_tourneys_nm")
          .insert([{ profile_id: this.user.id, tourney_id: tourneyID }]);

        await this.updateRegistrationsCounter("+", tourneyID);
        if (error || error2) {
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
      this.forceRerender();
    },
    async updateRegistrationsCounter(operator, tourneyID) {
      const { data: registrations, error } = await this.$supabase
        .from("tourneys")
        .select("registrations")
        .eq("id", tourneyID);

      if (operator === "+") {
        const { data: updated, error2 } = await this.$supabase
          .from("tourneys")
          .update({ registrations: registrations[0].registrations + 1 })
          .eq("id", tourneyID);
      } else {
        const { data: updated, error2 } = await this.$supabase
          .from("tourneys")
          .update({ registrations: registrations[0].registrations - 1 })
          .eq("id", tourneyID);
      }
    },
    async onUnsubscribeClick(tourneyID) {
      const { data, error } = await this.$supabase
        .from("profile_tourneys_nm")
        .delete()
        .eq("profile_id", this.user.id)
        .eq("tourney_id", tourneyID);

      await this.updateRegistrationsCounter("-", tourneyID);

      if (error) {
        this.$toast.show(
          "Anmeldung konnte nicht gelöscht werden. Bitte kontaktieren Sie den Administrator",
          {
            duration: 4000,
            type: "error",
            position: "top-right",
          }
        );
      } else {
        this.$toast.show("Anmeldung erfolgreich gelöscht", {
          duration: 4000,
          type: "success",
          position: "top-right",
        });
      }
      this.forceRerender();
    },
  },
});
</script>
