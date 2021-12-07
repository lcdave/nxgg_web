<template>
  <form
    name="tourney-registration"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    @submit.prevent="handleSubmit"
  >
    <input type="hidden" name="form-name" value="tourney-registration" />
    <label for="teamname">
      <input type="text" name="teamname" />
    </label>
    <button>Submit</button>
  </form>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "tourney Form",
  methods: {
    handleSubmit() {
      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      axios.post(
        "/",
        this.encode({
          "form-name": "tourney-registration",
          ...this.form,
        }),
        axiosConfig
      );
    },
  },
  data() {
    return {};
  },
});
</script>
