<template>
  <div class="match">
    <div class="match__content">
      <div class="match__user">
        <div class="match__user-name">
          <span v-if="match.user_1">{{ match.user_1[0].username }}</span>
        </div>
        <div class="match__user-result">
          <input type="number" v-model="user1Score" />
        </div>
      </div>
      <div class="match__user">
        <div class="match__user-name">
          <span v-if="match.user_2">{{ match.user_2[0].username }}</span>
        </div>
        <div class="match__user-result">
          <input type="number" v-model="user2Score" />
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
  },
  data() {
    return {
      user1Score: null,
      user2Score: null,
    };
  },
  created() {
    if (this.match.user_1 && this.match.user_2) {
      this.getMatchScore();
    }
  },
  methods: {
    async getMatchScore() {
      const { data, error } = await this.$supabase
        .from("matches_test")
        .select("*")
        .eq("id", this.match.id);

      if (!error && data.length > 0) {
        this.user1Score = data[0].user_1_score;
        this.user2Score = data[0].user_2_score;
      } else {
        if (error) {
          console.log(error);
        } else {
          console.log("No match found");
        }
      }
    },
    async saveMatchScore() {
      if (this.match.user_1 && this.match.user_2) {
        console.log(this.match);
        let winnerID = null;

        console.log("score1: ", this.user1Score, " score2: ", this.user2Score);

        if (this.user1Score > this.user2Score) {
          console.log("user1 won: ", this.match.user_1[0].username);
          winnerID = this.match.user_1[0].id;
        } else {
          winnerID = this.match.user_2[0].id;
        }

        const { data, error } = await this.$supabase
          .from("matches_test")
          .update({
            user_1_score: parseInt(this.user1Score),
            user_2_score: parseInt(this.user2Score),
            winner_id: winnerID,
          })
          .eq("id", this.match.id);

        if (!error) {
          console.log("Match saved");
        } else {
          console.log(error);
        }
      }
    },
  },
});
</script>
