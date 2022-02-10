<template>
  <div class="match">
    <div class="match__content">
      <div class="match__user">
        <div
          class="match__user-name"
          :class="{
            'is-highlighted': user1Highlighted,
          }"
        >
          <span v-if="match.user1_username">{{ match.user1_username }}</span>
        </div>
        <div
          class="match__user-result"
          :class="{
            'is-winner': user1Winner,
          }"
        >
          <input
            type="number"
            v-model="user1Score"
            :readonly="isReadonly || locked"
            :class="{
              'is-readonly': isReadonly || locked,
            }"
          />
        </div>
      </div>
      <div class="match__user">
        <div
          class="match__user-name"
          :class="{
            'is-highlighted': user2Highlighted,
          }"
        >
          <span v-if="match.user2_username">{{ match.user2_username }}</span>
        </div>
        <div
          class="match__user-result"
          :class="{
            'is-winner': user2Winner,
          }"
        >
          <input
            type="number"
            v-model="user2Score"
            :readonly="isReadonly || locked"
          />
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
    locked: {
      type: Boolean,
      default: false,
    },
    profileID: {
      type: String,
    },
  },
  data() {
    return {
      user1Score: this.match.user_1_score,
      user1Winner: false,
      user1Highlighted: false,
      user2Score: this.match.user_2_score,
      user2Winner: false,
      user2Highlighted: false,
      isReadonly: false,
    };
  },
  async created() {
    if (this.match.user1_username && this.match.user2_username) {
      this.setWinner();
    }

    if (this.currentRound === this.match.round_id) {
      this.isReadonly = false;
    } else {
      this.isReadonly = true;
    }

    if (this.profileID) {
      this.highlightUser();
    }
  },
  methods: {
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
      if (this.match.user_1_score && this.match.user_2_score) {
        if (this.match.user_1_score > this.match.user_2_score) {
          this.user1Winner = true;
          this.user2Winner = false;
        } else {
          this.user1Winner = false;
          this.user2Winner = true;
        }
      }
    },
    highlightUser() {
      if (this.match.user_1_id === this.profileID) {
        this.user1Highlighted = true;
      } else if (this.match.user_2_id === this.profileID) {
        this.user2Highlighted = true;
      }
    },
  },
});
</script>
