<template>
  <div class="content-element">
    <prismic-rich-text
      :field="slice.primary.title"
      :htmlSerializer="htmlSerializer"
    />
    <div class="columns">
      <div
        :class="columnClass()"
        v-for="(tourneys, index) in slice.items"
        :key="index"
      >
        <template v-if="limitedItemsCondition(index)">
          <nuxt-link
            :to="{
              name: 'tourneysDetail',
              params: {
                title: tourneys.title,
                imageURL: tourneys.image.url,
                date: tourneys.date,
                text: tourneys.text,
              },
            }"
          >
            <div class="teaser">
              <div class="teaser__image">
                <img :src="tourneys.image.url" alt="" />
              </div>
              <div class="teaser__date">
                {{ tourneys.date }}
              </div>
              <div class="teaser__title">
                <prismic-rich-text
                  :field="tourneys.title"
                  :htmlSerializer="htmlSerializer"
                />
              </div>
            </div>
          </nuxt-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tourneys",
  props: {
    slice: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    col: {
      type: Number,
    },
    limitedItems: {
      type: Boolean,
    },
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
    columnClass() {
      if (this.col) {
        return `column is-${this.col}`;
      }
      return "column";
    },
    limitedItemsCondition(index) {
      if (this.limitedItems) {
        if (index <= 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" src="../../assets/sass/components/_teaser.scss"></style>
