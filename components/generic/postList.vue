<template>
  <div class="list">
    <section class="section">
      <div class="container">
        <nuxt-link
          :to="{
            name: 'index',
          }"
        >
          <button class="button button--back">Zurück</button>
        </nuxt-link>
        <nuxt-link :to="link">
          <div class="content-element" v-if="items">
            <h2 class="title is-2">{{ title }}</h2>
            <div class="columns">
              <div
                class="column is-4"
                v-for="(item, index) in items"
                :key="index"
              >
                <teaser v-if="item" :teaser="item" />
              </div>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link
          :to="{
            name: 'index',
          }"
        >
          <button class="button button--back">Zurück</button>
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js";

import Vue from "vue";

export default Vue.extend({
  props: {
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      link: "",
    };
  },
  mounted() {
    this.link = LinkResolver(this.items);
  },
});
</script>
