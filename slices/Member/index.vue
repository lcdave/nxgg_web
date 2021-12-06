<template>
  <section class="section">
    <div class="container">
      <div class="content-element">
        <prismic-rich-text
          :field="slice.primary.title"
          :htmlSerializer="htmlSerializer"
        />
        <div class="columns">
          <div
            class="column is-half-tablet is-one-quarter-desktop"
            v-for="(member, index) in slice.items"
            :key="index"
          >
            <div class="employee">
              <div class="employee__image">
                <img :src="member.image.url" alt="" />
              </div>
              <div class="employee__name">
                <prismic-rich-text :field="member.name" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Member",
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
        default:
          return null;
      }
    },
  },
};
</script>

<style lang="scss" src="../../assets/sass/components/_employee.scss"></style>
