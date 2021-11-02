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
            class="column is-4"
            v-for="(news, index) in slice.items"
            :key="index"
          >
            <nuxt-link
              :to="{
                name: 'newsDetail',
                params: {
                  title: news.title,
                  imageURL: news.image.url,
                  date: news.date,
                  text: news.text,
                },
              }"
            >
              <div class="teaser">
                <div class="teaser__image">
                  <img :src="news.image.url" alt="" />
                </div>
                <div class="teaser__date">
                  {{ news.date }}
                </div>
                <div class="teaser__title">
                  <prismic-rich-text
                    :field="news.title"
                    :htmlSerializer="htmlSerializer"
                  />
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "News",
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
        case "heading3":
          return `<h3 class="title is-3">${children.join("")}</h3>`;
        default:
          return null;
      }
    },
  },
};
</script>

<style lang="scss" src="../../assets/sass/components/_teaser.scss"></style>
