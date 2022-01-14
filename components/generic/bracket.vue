<template>
  <div class="bracket">
    <div class="round" v-for="(round, index) in data.rounds" :key="index">
      <div class="match" v-for="(match, index) in round.matches" :key="index">
        <div class="match__content">
          {{ match.user1[0].username }} vs. {{ match.user2[0].username }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
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
