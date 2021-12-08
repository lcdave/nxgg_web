<template>
  <div class="teaser">
    <nuxt-link :to="link">
      <h2 v-if="tourney.data">{{ $prismic.asText(tourney.data.title) }}</h2>
    </nuxt-link>
  </div>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js";

export default {
  name: "ExperimentalTourney",
  props: {
    tourney: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      link: "",
    };
  },
  mounted() {
    this.link = LinkResolver(this.tourney);
  },
  methods: {
    htmlSerializer(type, element, content, children) {
      switch (type) {
        case "heading2":
          return `<h2 class="title is-2">${children.join("")}</h2>`;
        case "heading3":
          return `<h3 class="title is-3">${children.join("")}</h3>`;
        default:
          return null;
      }
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/components/_teaser.scss"></style>
