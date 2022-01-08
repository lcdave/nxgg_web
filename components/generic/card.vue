<template>
  <div class="card">
    <div class="card__title">
      <slot name="title" />
    </div>
    <div class="card__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "",
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" src="@/assets/sass/components/_card.scss"></style>
