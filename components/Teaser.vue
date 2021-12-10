<template>
  <nuxt-link :to="link">
    <div class="teaser" v-if="teaser.data">
      <div class="teaser__image">
        <img :src="teaser.data.image.url" alt="" />
      </div>
      <div class="teaser__date">
        {{ teaser.data.date }}
      </div>
      <div class="teaser__title">
        <h2>{{ $prismic.asText(teaser.data.title) }}</h2>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js";

export default {
  name: "Teaser",
  props: {
    teaser: {
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
    this.link = LinkResolver(this.teaser);
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
