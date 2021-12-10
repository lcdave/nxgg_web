<template>
  <div>
    <h2 class="title is-2">{{ title }}</h2>
    <div class="columns">
      <div
        class="column is-6"
        v-for="(item, index) in items.slice(0, limit)"
        :key="index"
      >
        <teaser v-if="item" :teaser="item" />
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column has-text-centered is-2">
        <nuxt-link :to="{ path: buttonLink }">
          <button class="button is-primary">{{ buttonLabel }}</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    limit: {
      type: Number,
      default: 3,
    },
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    buttonLabel: {
      type: String,
      required: true,
    },
    buttonLink: {
      type: String,
      required: true,
    },
  },
});
</script>
