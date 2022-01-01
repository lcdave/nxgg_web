<template>
  <div>
    My Tourneys
    <div class="datalist">
      <div class="datalist__title"><h3>Turniere</h3></div>
      <div class="datalist__content">
        <div
          class="datalist__item"
          v-for="(tourney, index) in tourneys"
          :key="index"
        >
          <div class="datalist__item-title">{{ tourney.tourney_title }}</div>
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

export default Vue.extend({
  name: "",
  data() {
    return {
      user: null,
      tourneys: [],
    };
  },
  async created() {
    this.user = this.$supabase.auth.user();
    this.getProfileTourneys();
  },
  methods: {
    async getProfileTourneys() {
      const { data, error } = await this.$supabase
        .from("profile_tourneys_view")
        .select("tourney_title")
        .eq("profile_id", this.user.id);
      this.tourneys = data;
    },
  },
});
</script>
