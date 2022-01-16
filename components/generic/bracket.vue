<template>
  <div class="bracket">
    <div class="round" v-for="(round, index) in data.rounds" :key="index">
      <match
        v-for="(match, index) in round.matches"
        :key="index"
        :match="match"
        ref="bracketMatch"
      ></match>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Match from "@/components/match.vue";

export default Vue.extend({
  components: {
    Match,
  },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" src="@/assets/sass/components/_bracket.scss"></style>
