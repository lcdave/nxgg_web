<template>
  <section class="section">
    <prismic-rich-text :field="slice.primary.title" class="title" />
  </section>
</template>

<script>
export default {
  name: "TourneyList",
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

<style scoped>
.section {
  position: relative;
  background: #f7f7f7;
  color: #111;
  padding: 4em;
  text-align: center;
}
a {
  color: #111;
}
.title {
  margin-bottom: 2em;
}
</style>
