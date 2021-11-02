<template>
  <section class="section">
    <div class="container">
      <div class="content-element">
        <div class="plaintext">
          <prismic-rich-text
            :field="slice.primary.title"
            :htmlSerializer="htmlSerializer"
          />
          <prismic-rich-text
            :field="slice.primary.text"
            :htmlSerializer="htmlSerializer"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "IntroText",
  props: {
    slice: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  methods: {
    htmlSerializer(type, element, content, children) {
      switch (type) {
        case "heading2":
          return `<h2 class="title is-2">${children.join("")}</h2>`;
        case "paragraph":
          return `<p class="important">${children.join("")}</p>`;
        default:
          return null;
      }
    },
  },
};
</script>

<style lang="scss" src="../../assets/sass/components/_plaintext.scss"></style>
