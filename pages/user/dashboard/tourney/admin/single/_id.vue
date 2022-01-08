<template>
  <div class="tourney-admin-single">
    <widget title="Turnier Verwaltung" small>
      <template #content>
        <card>
          <template #title>
            <h3>{{ tourney.title }}</h3>
          </template>
          <template #content>
            <div class="card__row">
              <div class="card__key">Datum</div>
              <div class="card__value">{{ formatDate(tourney.date) }}</div>
            </div>
            <div class="card__row">
              <div class="card__key">Modus</div>
              <div class="card__value">{{ getModus(tourney.mode) }}</div>
            </div>
            <div class="card__row">
              <div class="card__key">Plattform</div>
              <div class="card__value">{{ getPlatform(tourney.platform) }}</div>
            </div>
            <div class="card__row">
              <div class="card__key">Preis</div>
              <div class="card__value">{{ tourney.price }}</div>
            </div>
            <div class="card__row">
              <div class="card__key">Eintrittspreis</div>
              <div class="card__value">{{ tourney.entry }}</div>
            </div>
            <div class="card__row">
              <div class="card__key">Anz. Teams</div>
              <div class="card__value">{{ tourney.amount_teams }}</div>
            </div>
          </template>
        </card>
      </template>
    </widget>
  </div>
</template>

<script>
import Widget from "@/components/generic/widget.vue";
import Card from "@/components/generic/card.vue";
export default {
  layout: "dashboard",
  components: { Widget, Card },
  data() {
    return {
      tourney: {},
    };
  },
  async created() {
    let { data: tourneys, error } = await this.$supabase
      .from("tourneys")
      .select("*")
      .eq("id", this.$route.params.id);

    this.tourney = tourneys[0];

    console.log(error);
    console.log(tourneys);
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(date).toLocaleDateString("de-DE", options);
    },
    getModus(mode) {
      switch (mode) {
        case 1:
          return "Solo";
        case 2:
          return "Duo";
        case 3:
          return "Trio";
        default:
          return "";
      }
    },
    getPlatform(platform) {
      switch (platform) {
        case 1:
          return "Xbox";
        case 2:
          return "Playstation";
        case 3:
          return "PC";
        case 4:
          return "Crossplay";
        default:
          return "";
      }
    },
  },
};
</script>
