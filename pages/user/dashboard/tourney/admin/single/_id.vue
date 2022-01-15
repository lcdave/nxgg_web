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
                  <button
                    class="button--narrow button--red"
                    @click="deleteBracket()"
                  >
                    Bracket löschen
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
      bracketID: null,
    };
  },
  async created() {
    let { data: tourneys, error } = await this.$supabase
      .from("tourneys")
      .select("*")
      .eq("id", this.$route.params.id);

    this.tourney = tourneys[0];

    await this.setBracketID().then(() => {
      if (this.bracketID) {
        this.fillBracketObject();
      }
    });

    await this.setRegisteredTourneyUsers();
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
    async setBracketID() {
      const { data, error } = await this.$supabase
        .from("brackets")
        .select("*")
        .eq("tourney_id", this.tourney.id);

      if (!error && data.length > 0) {
        this.bracketID = Number(data[0].id);
      } else {
        if (error) {
          console.log(error);
        } else {
          console.log("No bracket found");
        }
      }
    },
    async generateBracket() {
      await this.createBracketRecordInDB().then(() => {
        this.generateRounds();
        this.fillBracketObject();
      });
    },
    async createBracketRecordInDB() {
      // check if bracket already exists
      const { data, error } = await this.$supabase
        .from("brackets")
        .select("*")
        .eq("tourney_id", this.tourney.id);

      if (data.length === 0) {
        const { data, error } = await this.$supabase
          .from("brackets")
          .insert([{ tourney_id: this.tourney.id }]);

        this.bracketID = Number(data[0].id);

        console.log(
          "bracket has been created, id of the bracket is: ",
          this.bracketID
        );
      } else {
        // throw error
        console.error("Bracket already exists");
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
    async fillBracketObject() {
      const { data, error } = await this.$supabase
        .from("rounds")
        .select("*")
        .eq("bracket_id", this.bracketID);

      console.log(data);

      if (!error) {
        this.bracket.rounds = data;

        // get all matches for each round
        for (const [i, round] of this.bracket.rounds.entries()) {
          console.log("call here", round);
          this.bracket.rounds[i].matches = await this.getMatches(round.id);
          console.log(await this.getMatches(round.id));

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
        .eq("bracket_id", this.bracketID);

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
    async generateRounds() {
      this.amountUsers = this.tourneyUsers.length;

      let amountRounds = Math.log2(this.amountUsers);

      for (let i = 0; i < amountRounds; i++) {
        await this.createRoundInDB();
      }

      console.log("rounds and matches created");
    },
    async createRoundInDB() {
      const { data, error } = await this.$supabase.from("rounds").insert([
        {
          bracket_id: this.bracketID,
        },
      ]);

      console.log("rounds created");

      if (!error) {
        // create matches for the round
        await this.generateMatches(data[0].id);
      }
    },
    async generateMatches(roundId) {
      for (let i = 0; i < this.amountUsers; i++) {
        for (let j = i + 1; j < this.amountUsers; j++) {
          await this.createMatchInDB(
            this.tourneyUsers[i].profile_id,
            this.tourneyUsers[j].profile_id,
            roundId
          );
        }
      }
      console.log("matches created");
    },
    async createMatchInDB(user1ID, user2ID, roundId) {
      const { data, error } = await this.$supabase.from("matches").insert([
        {
          user_1_id: user1ID,
          user_2_id: user2ID,
          round_id: roundId,
          bracket_id: this.bracketID,
        },
      ]);

      if (error) {
        console.log(error);
      }
    },
    async deleteBracket() {
      // delete matches from db
      const { data, error } = await this.$supabase
        .from("matches")
        .delete()
        .eq("bracket_id", this.bracketID);

      if (!error) {
        // delete rounds from db
        const { data, error } = await this.$supabase
          .from("rounds")
          .delete()
          .eq("bracket_id", this.bracketID);

        if (!error) {
          // delete bracket from db
          const { data, error } = await this.$supabase
            .from("brackets")
            .delete()
            .eq("id", this.bracketID);
        }
      }

      console.log("bracket deleted");

      this.bracket = {};
    },
  },
};
</script>
