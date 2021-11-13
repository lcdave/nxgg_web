<template>
  <div class="content-element">
    <prismic-rich-text
      :field="slice.primary.title"
      :htmlSerializer="htmlSerializer"
    />
    <div class="columns">
      <div
        :class="columnClass()"
        v-for="(events, index) in slice.items"
        :key="index"
      >
        <template v-if="limitedItemsCondition(index)">
          <nuxt-link
            :to="{
              name: 'eventsDetail',
              params: {
                title: events.title,
                imageURL: events.image.url,
                date: events.date,
                text: events.text,
              },
            }"
          >
            <div class="teaser">
              <div class="teaser__image">
                <img :src="events.image.url" alt="" />
              </div>
              <div class="teaser__date">
                {{ events.date }}
              </div>
              <div class="teaser__title">
                <prismic-rich-text
                  :field="events.title"
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
  name: "Events",
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
