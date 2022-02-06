<template>
  <div class="match">
    <div class="match__content">
      <div class="match__user">
        <div class="match__user-name">
          <span v-if="match.user1_username">{{ match.user1_username }}</span>
        </div>
        <div class="match__user-result" :class="{ 'is-winner': user1Winner }">
          <input type="number" v-model="user1Score" :readonly="isReadonly" />
        </div>
      </div>
      <div class="match__user">
        <div class="match__user-name">
          <span v-if="match.user2_username">{{ match.user2_username }}</span>
        </div>
        <div class="match__user-result" :class="{ 'is-winner': user2Winner }">
          <input type="number" v-model="user2Score" :readonly="isReadonly" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    match: {
      type: Object,
    },
    currentRound: {
      type: Number,
    },
  },
  data() {
    return {
      user1Score: null,
      user1Winner: false,
      user2Score: null,
      user2Winner: false,
      matchRound: null,
      isReadonly: false,
    };
  },
  async created() {
    if (this.match.user1_username && this.match.user2_username) {
      await this.setMatchData();
    }

    if (this.currentRound === this.matchRound) {
      this.isReadonly = false;
    } else {
      this.isReadonly = true;
    }
  },
  methods: {
    async setMatchData() {
      const { data, error } = await this.$supabase
        .from("matches_test")
        .select("*")
        .eq("id", this.match.id);

      if (!error && data.length > 0) {
        this.user1Score = data[0].user_1_score;
        this.user2Score = data[0].user_2_score;
        this.matchRound = data[0].round_id;
        this.setWinner();
      } else {
        if (error) {
          console.log(error);
        } else {
          console.log("No match found");
        }
      }
    },
    async saveMatchScore() {
      if (this.match.user1_username && this.match.user2_username) {
        let winnerID = null;

        if (parseInt(this.user1Score) > parseInt(this.user2Score)) {
          winnerID = this.match.user_1_id;
        } else {
          winnerID = this.match.user_2_id;
        }

        const { data, error } = await this.$supabase
          .from("matches_test")
          .update({
            user_1_score: parseInt(this.user1Score),
            user_2_score: parseInt(this.user2Score),
            winner_id: winnerID,
          })
          .eq("id", this.match.id);

        if (error) {
          this.$toast.show("Match resultat konnte nicht gespeichert werden.", {
            duration: 4000,
            type: "error",
            position: "top-right",
          });
        }
      }
    },
    setWinner() {
      if (this.user1Score && this.user2Score) {
        if (this.user1Score > this.user2Score) {
          this.user1Winner = true;
          this.user2Winner = false;
        } else {
          this.user1Winner = false;
          this.user2Winner = true;
        }
      }
    },
  },
});
</script>
