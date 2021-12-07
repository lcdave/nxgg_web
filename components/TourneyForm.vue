<template>
  <form
    name="tourney-registration"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="tourney-registration" />
    <label for="teamname">
      <input type="text" name="teamname" />
    </label>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "tourneyForm",
});
</script>
