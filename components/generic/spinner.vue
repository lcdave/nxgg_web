<template>
  <div class="spinner">
    <breeding-rhombus-spinner
      :animation-duration="2000"
      :size="65"
      color="#00ff00"
    />
    <div class="spinner__text">
      <slot name="text" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";

// https://epic-spinners.epicmax.co/get-started
let BreedingRhombusSpinner = null;

if (process.client) {
  BreedingRhombusSpinner = require("epic-spinners").BreedingRhombusSpinner;
}

export default Vue.extend({
  name: "Spinner",
  components: { BreedingRhombusSpinner },
});
</script>

<style lang="scss" src="@/assets/sass/components/_spinner.scss"></style>
