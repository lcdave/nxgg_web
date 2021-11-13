<!--
Looking for more information about the Slice Zone? Here's the documentation about it:
https://www.slicemachine.dev/documentation/nuxt/add-the-slice-zone-to-your-page
-->
<template>
  <div class="detail">
    <section class="section">
      <div class="container">
        <div class="content-element">
          <div class="post">
            <a href="" @click.prevent="$router.back()"
              ><button class="button">Zurück</button></a
            >
            <div class="post__title">
              <prismic-rich-text
                :field="title"
                :htmlSerializer="htmlSerializer"
              />
            </div>
            <div class="post__image">
              <img :src="imageURL" alt="" />
            </div>
            <div class="post__date">
              {{ date }}
            </div>
            <div class="post__text">
              <prismic-rich-text
                :field="text"
                :htmlSerializer="htmlSerializer"
              />
            </div>
            <NuxtLink to="/"><button class="button">Zurück</button></NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$route.params.title,
      imageURL: this.$route.params.imageURL,
      date: this.$route.params.date,
      text: this.$route.params.text,
    };
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

<style lang="scss" src="@/assets/sass/components/_post.scss"></style>
<style lang="scss" src="@/assets/sass/layout/_detail.scss"></style>
