<template>
  <section class="section">
    <div class="intro">
      <div class="intro__image"></div>
      <div class="intro__content">
        <prismic-rich-text :field="slice.primary.title" />
        <prismic-rich-text :field="slice.primary.description" />
        <button class="button is-primary">Zum Livestream</button>
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
