<!--
Looking for more information about the Slice Zone? Here's the documentation about it:
https://www.slicemachine.dev/documentation/nuxt/add-the-slice-zone-to-your-page
-->
<template>
  <div class="detail">
    <section class="section">
      <div class="container">
        <div class="content-element">
          <div class="post" v-if="post">
            <a href="" @click.prevent="$router.back()" class="back-link">
              <font-awesome-icon :icon="['fas', 'arrow-left']" /> Zurück
            </a>
            <div class="post__title">
              <h2 class="title is-2">{{ $prismic.asText(post.title) }}</h2>
            </div>
            <div class="post__image">
              <img :src="post.image.url" alt="" />
            </div>
            <div class="post__date">
              {{ formatDate(post.date) }}
            </div>
            <div class="post__text">
              <prismic-rich-text :field="post.text" />
            </div>
            <slot name="additionalContent" />
            <a href="" @click.prevent="$router.back()" class="back-link">
              <font-awesome-icon :icon="['fas', 'arrow-left']" /> Zurück
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("de-DE", options);
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/components/_post.scss"></style>
<style lang="scss" src="@/assets/sass/layout/_detail.scss"></style>
