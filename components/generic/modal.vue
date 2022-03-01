<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="dialog" :class="{ 'dialog--large': isLarge }">
        <div class="dialog__title">
          <h3>{{ title }}</h3>
        </div>
        <div class="dialog__content">
          <div class="dialog__content-text">
            <slot name="content" />
          </div>
          <div class="dialog__content-action">
            <button @click="onAcceptClick()">Bestätigen</button>
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
    isLarge: {
      type: Boolean,
    },
  },
  methods: {
    onAcceptClick() {
      this.$emit("accept");
    },
    resetModal() {
      this.$emit("cancel");
    },
  },
});
</script>
