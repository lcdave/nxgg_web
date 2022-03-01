<template>
  <div>
    <button
      @click="$emit('showModal', 'register', item.id)"
      v-if="
        !adminMode && variant == 'global' && !isUserRegistered && freeSlots > 0
      "
    >
      Anmelden
    </button>
    <button
      @click="$emit('showModal', 'unsubscribe', item.id)"
      v-if="!adminMode && variant == 'global' && isUserRegistered"
    >
      Abmelden
    </button>
    <span
      v-if="
        !adminMode && variant == 'global' && freeSlots == 0 && !isUserRegistered
      "
      >Ausgebucht</span
    >
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "SubscribeButton",
  props: {
    item: {
      type: Object,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
    adminMode: {
      type: Boolean,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isUserRegistered: false,
      freeSlots: 0,
    };
  },
  async created() {
    this.isUserRegistered = await this.checkIfUserIsRegistered(this.item.id);
    this.freeSlots = await this.getAmountFreeSlots(
      this.item.amount_teams,
      this.item.registrations
    );
  },
  methods: {
    async checkIfUserIsRegistered(tourneyID) {
      const { data, error } = await this.$supabase
        .from("profile_tourneys_nm")
        .select("*")
        .eq("profile_id", this.userID)
        .eq("tourney_id", tourneyID);

      if (data.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    getAmountFreeSlots(max, current) {
      return parseInt(max) - parseInt(current);
    },
  },
});
</script>
