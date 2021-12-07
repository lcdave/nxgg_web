<template>
  <form
    name="tourney-registration"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="tourney-registration" />
    <label v-for="(panelist, index) in panelists" :key="index">
      <input
        type="radio"
        name="panelist"
        :value="panelist"
        @input="(ev) => updatePanelist"
        :checked="panelist === currentPanelist"
      />
      <span>{{ panelist }}</span>
    </label>
    ...
    <button>Submit</button>
  </form>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "tourney Form",
  methods: {
    updatePanelist(ev) {
      this.currentPanelist = ev.target.value;
    },
  },
  data() {
    return {
      panelists: ["Evan You", "Chris Fritz"],
      currentPanelist: "Evan You",
    };
  },
});
</script>
