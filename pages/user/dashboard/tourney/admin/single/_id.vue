<template>
  <div class="tourney-admin-single">
    <div class="site-title">
      <h2>Turnier Verwaltung</h2>
    </div>
    <div class="widget-container">
      <div class="widget-container__row">
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
                  <div class="card__key">Anz. Teams</div>
                  <div class="card__value">{{ tourney.amount_teams }}</div>
                </div>
              </template>
            </card>
          </template>
        </widget>
        <widget small>
          <template #content>
            <card>
              <template #title>
                <h3>Verwaltung</h3>
              </template>
              <template #content>
                <div class="card__actions">
                  <div class="card__actions-text">
                    Bitte wähle eine Aktion aus:
                  </div>
                  <button
                    class="button--narrow button--green"
                    @click="generateBracket()"
                  >
                    Bracket erstellen
                  </button>
                  <button class="button--narrow button--blue">
                    Turnier bearbeiten
                  </button>
                  <button class="button--narrow button--red">
                    Turnier löschen
                  </button>
                </div>
              </template>
            </card>
          </template>
        </widget>
      </div>
    </div>
    <widget v-if="!bracketLoading">
      <template #content>
        <bracket :data="bracket" />
      </template>
    </widget>
  </div>
</template>

<script>
import Widget from "@/components/generic/widget.vue";
import Card from "@/components/generic/card.vue";
import Bracket from "@/components/generic/bracket.vue";
export default {
  layout: "dashboard",
  components: { Widget, Card, Bracket },
  data() {
    return {
      tourney: {},
      tourneyUsers: [],
      amountUsers: "",
      bracket: {},
      bracketLoading: true,
    };
  },
  async created() {
    let { data: tourneys, error } = await this.$supabase
      .from("tourneys")
      .select("*")
      .eq("id", this.$route.params.id);

    this.tourney = tourneys[0];
    this.$nextTick(function () {
      this.getBracket();
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
    async generateBracket() {
      this.createBracket();
      await this.setRegisteredTourneyUsers();

      // generate list of numbers, max is amount of users
      // used for randomizing the bracket
      let matchSortingNumbers = [];
      console.log("tourneyUSers", this.tourneyUsers);
      console.log("this.amountUsers", this.amountUsers);
      for (let i = 1; i <= this.amountUsers; i++) {
        matchSortingNumbers.push(i);
      }

      // insert bracket user with his sorting number
      for (const user of this.tourneyUsers) {
        let random = Math.floor(Math.random() * matchSortingNumbers.length);
        let randomNumber = matchSortingNumbers[random];
        matchSortingNumbers.splice(random, 1);

        const { data, error } = await this.$supabase
          .from("bracket_users")
          .insert([
            {
              user_id: user.profile_id,
              bracket_id: this.tourney.id,
              user_sort: randomNumber,
            },
          ]);

        if (error) {
          console.log(error);
        }
      }

      // fill bracket with matches
      for (let i = 1; i <= this.amountUsers; i++) {
        // bracket id is the same as tourney id
        const { data, error } = await this.$supabase
          .from("bracket_users")
          .select("*")
          .eq("bracket_id", this.tourney.id);
      }
    },
    async createBracket() {
      const { data, error } = await this.$supabase
        .from("brackets")
        .insert([{ tourney_id: this.tourney.id }]);

      //TODO: Error handling
      console.log(error);
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
    async getBracket() {
      const { data, error } = await this.$supabase
        .from("rounds")
        .select("*")
        .eq("bracket_id", this.tourney.id);

      if (!error) {
        this.bracket.rounds = data;

        // get all matches for each round
        for (const [i, round] of this.bracket.rounds.entries()) {
          this.bracket.rounds[i].matches = await this.getMatches(round.id);

          // get all users for each match in the round
          for (const [j, match] of this.bracket.rounds[i].matches.entries()) {
            this.bracket.rounds[i].matches[j].user1 = await this.getUser(
              match.user_1_id
            );
            this.bracket.rounds[i].matches[j].user2 = await this.getUser(
              match.user_2_id
            );
          }
        }

        this.bracketLoading = false;
      }
    },
    async getMatches(round_id) {
      const { data, error } = await this.$supabase
        .from("matches")
        .select("*")
        .eq("round_id", round_id)
        .eq("bracket_id", this.tourney.id);

      if (!error) {
        return data;
      }
    },
    async getUser(id) {
      const { data, error } = await this.$supabase
        .from("profiles")
        .select("*")
        .eq("id", id);

      if (!error) {
        return data;
      }
    },
  },
};
</script>
