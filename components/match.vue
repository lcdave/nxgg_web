<template>
  <div class="match">
    <div class="match__content">
      <div class="match__user">
        <div class="match__user-name">
          <span v-if="match.user1">{{ match.user1[0].username }}</span>
        </div>
        <div class="match__user-result">
          <input type="text" v-model="user1Score" />
        </div>
      </div>
      <div class="match__user">
        <div class="match__user-name">
          <span v-if="match.user2">{{ match.user2[0].username }}</span>
        </div>
        <div class="match__user-result">
          <input type="text" v-model="user2Score" />
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
    if (this.match.user1 && this.match.user2) {
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
      const { data, error } = await this.$supabase
        .from("matches_test")
        .update({
          user_1_score: this.user1Score,
          user_2_score: this.user2Score,
        })
        .eq("id", this.match.id);

      if (!error) {
        console.log(data);
      } else {
        console.log(error);
      }
    },
  },
});
</script>
