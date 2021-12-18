<template>
  <section class="section section--no-padding">
    <div class="intro">
      <div class="intro__image"></div>
      <div class="intro__content">
        <prismic-rich-text :field="slice.primary.title" />
        <prismic-rich-text :field="slice.primary.description" />
        <a href="https://www.twitch.tv/nxgg_tv" target="_blank">
          <button class="button is-primary">Zum Livestream</button>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Intro",
  props: {
    slice: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" src="../../assets/sass/components/_intro.scss"></style>
