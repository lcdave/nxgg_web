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
      <widget v-if="!bracketLoading">
        <template #content>
          <button class="button--narrow button--blue" @click="saveResults()">
            Resultate speichern
          </button>
          <button
            class="button--narrow button--blue"
            @click="generateNextRound()"
          >
            Nächste Runde generieren
          </button>
          <bracket :data="bracket" ref="bracket" />
        </template>
      </widget>
    </div>
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
      currentRound: 0,
      testMode: true,
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
      let tableName = "";

      if (this.testMode) {
        tableName = "brackets_test";
      } else {
        tableName = "brackets";
      }

      const { data, error } = await this.$supabase
        .from(tableName)
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
    generateBracket() {
      this.createBracketRecordInDB()
        .then(() => {
          this.generateRounds();
        })

        .then(() => {
          this.generateMatches();
        })

        .then(() => {
          this.fillBracketObject();
          console.log("filling bracket done");
        });
    },
    async createBracketRecordInDB() {
      // check if bracket already exists
      let tableName = "";

      if (this.testMode) {
        tableName = "brackets_test";
      } else {
        tableName = "brackets";
      }
      const { data, error } = await this.$supabase
        .from(tableName)
        .select("*")
        .eq("tourney_id", this.tourney.id);

      if (data.length === 0) {
        const { data, error } = await this.$supabase
          .from(tableName)
          .insert([{ tourney_id: this.tourney.id, currentRound: 0 }]);

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
    async setCurrentBracketRound() {
      let tableName = "";

      if (this.testMode) {
        tableName = "brackets_test";
      } else {
        tableName = "brackets";
      }

      await this.$supabase
        .from(tableName)
        .insert("currentRound", 0)
        .eq("tourney_id", this.tourney.id);
    },
    async getCurrentBracketRound() {
      let tableName = "";

      if (this.testMode) {
        tableName = "brackets_test";
      } else {
        tableName = "brackets";
      }

      const { data, error } = await this.$supabase
        .from(tableName)
        .select("currentRound")
        .eq("tourney_id", this.tourney.id);

      if (!error && data.length > 0) {
        return data[0].currentRound;
      } else {
        console.log(error);
        return false;
      }
    },
    async setRegisteredTourneyUsers() {
      let tableName = "";

      if (this.testMode) {
        tableName = "profile_tourneys_nm_test";
      } else {
        tableName = "profile_tourneys_nm";
      }
      const { data, error } = await this.$supabase
        .from(tableName)
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
      let tableName = "";

      if (this.testMode) {
        tableName = "rounds_test";
      } else {
        tableName = "rounds";
      }

      const { data, error } = await this.$supabase
        .from(tableName)
        .select("*")
        .eq("bracket_id", this.bracketID);

      if (!error) {
        this.bracket.rounds = data;

        // get all matches for each round
        for (const [i, round] of this.bracket.rounds.entries()) {
          this.bracket.rounds[i].matches = await this.getMatches(round.id);

          // get all users for each match in the round
          for (const [j, match] of this.bracket.rounds[i].matches.entries()) {
            if (match.user_1_id) {
              this.bracket.rounds[i].matches[j].user_1 = await this.getUser(
                match.user_1_id
              );
            }
            if (match.user_2_id) {
              this.bracket.rounds[i].matches[j].user_2 = await this.getUser(
                match.user_2_id
              );
            }
          }
        }
        this.bracketLoading = false;
      }
    },
    async getMatches(round_id) {
      let tableName = "";

      if (this.testMode) {
        tableName = "matches_test";
      } else {
        tableName = "matches";
      }
      const { data, error } = await this.$supabase
        .from(tableName)
        .select("*")
        .eq("round_id", round_id)
        .eq("bracket_id", this.bracketID);

      if (!error) {
        return data;
      }
    },
    async getUser(id) {
      let tableName = "";

      if (this.testMode) {
        tableName = "profiles_test";
      } else {
        tableName = "profiles";
      }

      const { data, error } = await this.$supabase
        .from(tableName)
        .select("*")
        .eq("id", id);

      if (!error) {
        return data;
      }
    },
    generateRounds() {
      this.amountUsers = this.tourneyUsers.length;

      let amountRounds = Math.log2(this.amountUsers);

      console.log("generating rounds... amount of rounds: ", amountRounds);

      for (let i = 0; i < amountRounds; i++) {
        this.createRoundInDB(amountRounds);
        console.log("round ", i, " has been created");
      }
    },
    async createRoundInDB() {
      // create matches for the round
      let tableName = "";
      if (this.testMode) {
        tableName = "rounds_test";
      } else {
        tableName = "rounds";
      }
      await this.$supabase.from(tableName).insert([
        {
          bracket_id: this.bracketID,
        },
      ]);
    },
    async getRoundsFromDB() {
      const { data, error } = await this.$supabase
        .from("rounds_test")
        .select("*")
        .eq("bracket_id", this.bracketID);

      if (!error) {
        return data;
      } else {
        console.log(error);
      }
    },
    generateMatches() {
      console.log("generating matches...");

      this.getRoundsFromDB().then((data) => {
        // loop over rounds
        for (const [i, round] of data.entries()) {
          console.log("generating matches for round ", i);
          if (i === 0) {
            let tempUserStack = this.tourneyUsers;

            for (let i = 0; i < this.amountUsers; i += 2) {
              if (tempUserStack.length >= 2) {
                let user1 = tempUserStack[0].profile_id;
                let user2 = tempUserStack[1].profile_id;

                console.log("user1: ", user1, " user2: ", user2);

                tempUserStack.shift();
                tempUserStack.shift();

                this.createMatchInDB(user1, user2, round.id);
              }
            }
          } else {
            console.log("generating placeholder matches");

            let tempAmountOfUsers = this.amountUsers / Math.pow(2, i + 1);

            for (let i = 0; i < tempAmountOfUsers; i++) {
              this.createMatchInDB(null, null, round.id);
            }
          }
        }
      });
    },
    async createMatchInDB(user1ID, user2ID, roundId) {
      let tableName = "";

      if (this.testMode) {
        tableName = "matches_test";
      } else {
        tableName = "matches";
      }

      const { data, error } = await this.$supabase.from(tableName).insert([
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
      let tableName = "";

      if (this.testMode) {
        tableName = "matches_test";
      } else {
        tableName = "matches";
      }

      const { data, error } = await this.$supabase
        .from(tableName)
        .delete()
        .eq("bracket_id", this.bracketID);

      if (!error) {
        // delete rounds from db

        let tableNameRounds = "";

        if (this.testMode) {
          tableNameRounds = "rounds_test";
        } else {
          tableNameRounds = "rounds";
        }

        const { data, error } = await this.$supabase
          .from(tableNameRounds)
          .delete()
          .eq("bracket_id", this.bracketID);

        if (!error) {
          // delete bracket from db

          let tableNameBrackets = "";

          if (this.testMode) {
            tableNameBrackets = "brackets_test";
          } else {
            tableNameBrackets = "brackets";
          }
          const { data, error } = await this.$supabase
            .from(tableNameBrackets)
            .delete()
            .eq("id", this.bracketID);
        }
      }

      console.log("bracket deleted");

      this.bracket = {};
    },
    saveResults() {
      this.$refs.bracket.$refs.bracketMatch.forEach((match) => {
        match.saveMatchScore();
      });
    },
    async generateNextRound() {
      this.getCurrentBracketRound().then((data) => {
        console.log(data);

        let lastRoundWinners = [];

        for (let i = 0; i < this.bracket.rounds[data].length; i++) {}

        // iterate over matches in current round
        for (const [i, match] of this.bracket.rounds[data].matches.entries()) {
          let winner_id = match.winner_id;

          // get user
          this.getUser(winner_id).then((res) => {
            lastRoundWinners.push(res[0]);
          });
        }

        console.log("lastRoundWinners: ", lastRoundWinners);
      });
    },
  },
};
</script>
