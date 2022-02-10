<template>
  <div class="tourney-admin-single">
    <div class="site-title">
      <h2>Turnier Verwaltung</h2>
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
              <div class="card__key">Anz. Teams</div>
              <div class="card__value">{{ tourney.amount_teams }}</div>
            </div>
          </template>
        </card>
      </template>
    </widget>
    <div class="widget-container">
      <div class="widget-container__row">
        <widget>
          <template #content>
            <card>
              <template #title>
                <h3>Bracket</h3>
              </template>
              <template #content>
                <div class="card__actions">
                  <font-awesome-icon
                    :icon="['fas', 'plus-circle']"
                    @click="generateBracket()"
                    class="icon icon--green"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'trash']"
                    @click="
                      showModal(
                        'deleteBracket',
                        'Bestätigen',
                        'Soll das Bracket wirklich gelöscht werden?'
                      )
                    "
                    class="icon icon--red"
                  />
                </div>
              </template>
            </card>
          </template>
        </widget>
        <widget>
          <template #content>
            <card>
              <template #title>
                <h3>Runde</h3>
              </template>
              <template #content>
                <div class="card__actions">
                  <font-awesome-icon
                    :icon="['fas', 'save']"
                    @click="saveResults()"
                    class="icon icon--green"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'plus-circle']"
                    @click="generateNextRound()"
                    class="icon icon--green"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'trash']"
                    @click="resetCurrentRound()"
                    class="icon icon--red"
                  />
                </div>
              </template>
            </card>
          </template>
        </widget>
      </div>
    </div>
    <widget v-if="!bracketLoading">
      <template #content>
        <bracket :data="bracket" ref="bracket" />
      </template>
    </widget>
    <modal
      :title="modal.title"
      :isActive="modal.isActive"
      :trigger="modal.trigger"
      @accept="onModalAccept"
    >
      <template #content>{{ modal.content }}</template>
    </modal>
  </div>
</template>

<script>
import Widget from "@/components/generic/widget.vue";
import Card from "@/components/generic/card.vue";
import Bracket from "@/components/generic/bracket.vue";
import Modal from "@/components/generic/modal.vue";

export default {
  layout: "dashboard",
  components: { Widget, Card, Bracket, Modal },
  data() {
    return {
      tourney: {},
      tourneyUsers: [],
      amountUsers: "",
      bracket: {},
      bracketLoading: true,
      bracketID: null,
      testMode: true,
      modal: {
        title: "",
        content: "",
        isActive: false,
        trigger: "",
      },
      notification: {
        isVisible: false,
        type: "",
        message: "",
      },
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
    async setCurrentBracketRound(currentRound) {
      await this.$supabase
        .from("brackets_test")
        .update({ currentRound: currentRound })
        .eq("tourney_id", this.tourney.id);
    },
    async setBracketBasicFields() {
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
        this.bracket.currentRound = data[0].currentRound;
      } else {
        if (error) {
          console.log(error);
        } else {
          console.log("No bracket found");
        }
      }
    },
    async generateBracket() {
      this.$toast.show("Bracket wird erstellt, bitte warten...", {
        duration: 4000,
        type: "success",
        position: "top-right",
        icon: {
          name: "hourglass-half",
        },
      });

      await this.createBracketRecordInDB();
      await this.generateRounds();
      await this.generateMatches();
      await this.fillBracketObject();

      this.$toast.show("Bracket wurde erstellt", {
        duration: 4000,
        type: "success",
        position: "top-right",
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
      } else {
        // throw error
        this.$toast.show(
          "Bracket wurde nicht erstellt, da bereits ein Bracket existiert.",
          {
            duration: 4000,
            type: "error",
            position: "top-right",
          }
        );
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
        }
        this.bracketLoading = false;
      }
    },
    async getMatches(round_id) {
      let tableName = "";

      if (this.testMode) {
        tableName = "matches_test_users";
      } else {
        tableName = "matches_users";
      }
      const { data, error } = await this.$supabase
        .from(tableName)
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
    async getFirstRoundID() {
      const { data, error } = await this.$supabase
        .from("rounds_test")
        .select("id")
        .eq("bracket_id", this.bracketID)
        .order("id", { ascending: true })
        .limit(1);

      if (!error) {
        return data[0].id;
      }
    },
    async generateRounds() {
      this.amountUsers = this.tourneyUsers.length;

      let amountRounds = Math.log2(this.amountUsers);

      for (let i = 0; i < amountRounds; i++) {
        await this.createRoundInDB(amountRounds);
      }

      const firstRoundID = await this.getFirstRoundID();

      await this.setCurrentBracketRound(firstRoundID);
    },
    async createRoundInDB() {
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
        .eq("bracket_id", this.bracketID)
        .order("id", { ascending: true });

      if (!error) {
        return data;
      } else {
        console.log(error);
      }
    },
    async generateMatches() {
      const data = await this.getRoundsFromDB();
      // loop over rounds
      for (const [i, round] of data.entries()) {
        if (i === 0) {
          let tempUserStack = this.tourneyUsers;

          console.log(tempUserStack);

          for (let i = 0; i < this.amountUsers; i += 2) {
            if (tempUserStack.length >= 2) {
              let user1 = tempUserStack[0].profile_id;
              let user2 = tempUserStack[1].profile_id;

              tempUserStack.shift();
              tempUserStack.shift();

              await this.createMatchInDB(user1, user2, round.id, i);
            }
          }
        } else {
          let tempAmountOfUsers = this.amountUsers / Math.pow(2, i + 1);

          for (let i = 0; i < tempAmountOfUsers; i++) {
            await this.createMatchInDB(null, null, round.id, i * 2);
          }
        }
      }
    },
    async createMatchInDB(user1ID, user2ID, roundId, matchSort) {
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
          match_sort: matchSort,
        },
      ]);

      if (error) {
        console.log(error);
      }
    },
    onModalAccept(trigger) {
      this.modal.isActive = false;
      this[trigger]();
    },
    showModal(trigger, title, content) {
      this.modal.isActive = true;
      this.modal.trigger = trigger;
      this.modal.title = title;
      this.modal.content = content;
    },
    async deleteBracket() {
      // delete matches from db
      let tableName = "";

      if (this.testMode) {
        tableName = "matches_test";
      } else {
        tableName = "matches";
      }

      const { data, matchesError } = await this.$supabase
        .from(tableName)
        .delete()
        .eq("bracket_id", this.bracketID);

      if (!matchesError) {
        // delete rounds from db
        let tableNameRounds = "";

        if (this.testMode) {
          tableNameRounds = "rounds_test";
        } else {
          tableNameRounds = "rounds";
        }

        const { data, roundsError } = await this.$supabase
          .from(tableNameRounds)
          .delete()
          .eq("bracket_id", this.bracketID);

        if (!roundsError) {
          // delete bracket from db

          let tableNameBrackets = "";

          if (this.testMode) {
            tableNameBrackets = "brackets_test";
          } else {
            tableNameBrackets = "brackets";
          }
          const { data, bracketError } = await this.$supabase
            .from(tableNameBrackets)
            .delete()
            .eq("id", this.bracketID);

          if (!bracketError) {
            this.$toast.show("Bracket wurde gelöscht", {
              duration: 4000,
              type: "success",
              position: "top-right",
            });
          } else {
            this.$toast.show("Bracket konnte nicht gelöscht werden", {
              duration: 4000,
              type: "error",
              position: "top-right",
            });
          }
        }
      }

      this.bracket = {};
    },
    saveResults() {
      this.$refs.bracket.$refs.bracketMatch.forEach((match) => {
        match.saveMatchScore();
      });

      this.$toast.show("Die Resultate wurden gespeichert", {
        duration: 4000,
        type: "success",
        position: "top-right",
      });
    },
    async generateNextRound() {
      this.$toast.show("Die nächste Runde wird generiert...", {
        duration: 4000,
        type: "success",
        position: "top-right",
        icon: {
          name: "hourglass-half",
        },
      });
      const nextRoundID = this.bracket.currentRound + 1;

      let lastRoundWinners = [];

      // find roundID in this.bracket.rounds that has id = this.bracket.currentRound
      const currentRound = this.bracket.rounds.find(
        (round) => round.id === this.bracket.currentRound
      );

      // iterate over matches in current round
      for (const match of currentRound.matches.entries()) {
        lastRoundWinners.push(match[1].winner_id);
      }

      const nextRoundMatches = await this.$supabase
        .from("matches_test_users")
        .select("*")
        .eq("round_id", nextRoundID);

      const amountOfNextRoundMatches = nextRoundMatches.data.length;

      let tempUserStack = lastRoundWinners;

      for (let i = 0; i < amountOfNextRoundMatches * 2; i += 2) {
        if (tempUserStack.length >= 2) {
          let user1 = tempUserStack[0];
          let user2 = tempUserStack[1];

          tempUserStack.shift();
          tempUserStack.shift();

          await this.$supabase
            .from("matches_test")
            .update({
              user_1_id: user1,
              user_2_id: user2,
              bracket_id: this.bracketID,
            })
            .match({ round_id: nextRoundID, match_sort: i });
        }
      }

      await this.setCurrentBracketRound(nextRoundID);
      await this.fillBracketObject();

      this.$toast.show("Die nächste Runde wurde generiert.", {
        duration: 4000,
        type: "success",
        position: "top-right",
      });
    },
    async resetCurrentRound() {
      const previousRoundID = this.bracket.currentRound - 1;

      await this.$supabase
        .from("matches_test")
        .update({
          user_1_id: null,
          user_2_id: null,
          user_1_score: null,
          user_2_score: null,
          winner_id: null,
        })
        .match({ round_id: this.bracket.currentRound });

      await this.setCurrentBracketRound(previousRoundID);

      await this.fillBracketObject();

      this.$toast.show("Die Runde wurde gelöscht.", {
        duration: 4000,
        type: "success",
        position: "top-right",
      });
    },
  },
};
</script>
