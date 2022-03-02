<template>
  <div class="tourney-admin-single">
    <div class="site-title">
      <h2>Turnier Übersicht</h2>
    </div>
    <widget small>
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
              <div class="card__value">
                {{ getPlatform(tourney.platform) }}
              </div>
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
              <div class="card__key">Max. Teams</div>
              <div class="card__value">{{ tourney.amount_teams }}</div>
            </div>
            <div class="card__row">
              <div class="card__key">Anmeldungen</div>
              <div class="card__value">{{ tourney.registrations }}</div>
            </div>
          </template>
        </card>
      </template>
    </widget>
    <widget v-if="!bracketLoading">
      <template #content>
        <bracket
          :data="bracket"
          ref="bracket"
          locked
          highlightUser
          :profileID="profileID"
        />
      </template>
    </widget>
  </div>
</template>

<script>
import Widget from "@/components/generic/widget.vue";
import Card from "@/components/generic/card.vue";
import Bracket from "@/components/generic/bracket.vue";

import * as UserService from "@/services/supabase/user";

export default {
  layout: "dashboard",
  components: { Widget, Card, Bracket },
  middleware: ["auth"],
  data() {
    return {
      tourney: {},
      tourneyUsers: [],
      amountUsers: "",
      bracket: {},
      bracketLoading: true,
      bracketID: null,
      testMode: true,
      profileID: null,
    };
  },
  async created() {
    let { data: tourneys, error } = await this.$supabase
      .from("tourneys")
      .select("*")
      .eq("id", this.$route.params.id);

    this.tourney = tourneys[0];

    await this.setBracketBasicFields().then(() => {
      if (this.bracketID) {
        this.fillBracketObject();
      }
    });

    await this.setRegisteredTourneyUsers();

    await UserService.getProfile().then((profile) => {
      this.profileID = profile.id;
    });
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
    async setRegisteredTourneyUsers() {
      const { data, error } = await this.$supabase
        .from("profile_tourneys_nm")
        .select("*")
        .eq("tourney_id", this.tourney.id);

      if (!error) {
        this.tourneyUsers = data;
        this.amountUsers = this.tourneyUsers.length;
      }

      //TODO: Error handling
      console.log(error);
    },
    async setBracketBasicFields() {
      const { data, error } = await this.$supabase
        .from("brackets")
        .select("*")
        .eq("tourney_id", this.tourney.id);

      if (!error && data.length > 0) {
        this.bracketID = Number(data[0].id);
        this.bracket.currentRound = data[0].currentRound;
      } else {
        if (error) {
          console.log(error);
        } else {
          console.log("No bracket found");
        }
      }
    },
    async fillBracketObject() {
      const { data, error } = await this.$supabase
        .from("rounds")
        .select("*")
        .eq("bracket_id", this.bracketID);

      if (!error) {
        this.bracket.rounds = data;

        // get all matches for each round
        for (const [i, round] of this.bracket.rounds.entries()) {
          this.bracket.rounds[i].matches = await this.getMatches(round.id);
        }
        this.bracketLoading = false;
      }
    },
    async getMatches(round_id) {
      const { data, error } = await this.$supabase
        .from("matches_users")
        .select("*")
        .eq("round_id", round_id)
        .eq("bracket_id", this.bracketID)
        .order("match_sort", { ascending: true });

      if (!error) {
        return data;
      } else {
        console.log(error);
      }
    },
  },
};
</script>
