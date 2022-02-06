<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="dialog">
        <div class="dialog__title">
          <h3>{{ title }}</h3>
        </div>
        <div class="dialog__content">
          <div class="dialog__content-text">
            {{ content }}
          </div>
          <div class="dialog__content-action">
            <button @click="onAcceptClick(trigger)">Bestätigen</button>
            <button @click="resetModal()" class="cancel">Abbrechen</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "modal",
  props: {
    isActive: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    trigger: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    onAcceptClick() {
      this.$emit("accept", this.trigger);
    },
    resetModal() {
      this.isActive = false;
    },
  },
});
</script>
