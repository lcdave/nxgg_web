<template>
  <form
    name="tourney-registration"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    class="form"
  >
    <input type="hidden" name="form-name" value="tourney-registration" />
    <div class="field is-grouped">
      <div class="control">
        <label class="label">Full name</label>
        <input class="input" type="text" name="name" required />
      </div>
      <div class="control">
        <label class="label">E-Mail</label>
        <input class="input" type="text" name="email" required />
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <label class="label">Team Name</label>
        <input class="input" type="text" name="teamname" required />
      </div>
      <div class="control">
        <label class="label">Team captains discord</label>
        <input class="input" type="text" name="discord" />
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <label class="label">Player 1 Activision</label>
        <input class="input" type="text" name="player1" />
      </div>
      <div class="control">
        <label class="label">Player 2 Activision</label>
        <input class="input" type="text" name="player2" />
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <label class="label">Player 3 Activision</label>
        <input class="input" type="text" name="player3" />
      </div>
      <div class="control">
        <label class="label">Player 4 Activision</label>
        <input class="input" type="text" name="player4" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" />
          I understand I still have to pay and payments need to be made 30
          minutes before tournament start time
        </label>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-primary">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "tourneyForm",
});
</script>

<style lang="scss" src="../assets/sass/components/_form.scss"></style>
