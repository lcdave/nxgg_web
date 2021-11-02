<!--
Looking for more information about the Slice Zone? Here's the documentation about it:
https://www.slicemachine.dev/documentation/nuxt/add-the-slice-zone-to-your-page
-->
<template>
  <div class="post">
    <div class="post__title">
      <prismic-rich-text :field="title" :htmlSerializer="htmlSerializer" />
    </div>
    <div class="post__image">
      <img :src="imageURL" alt="" />
    </div>
    <div class="post__date">
      {{ date }}
    </div>
    <div class="post__text">
      <prismic-rich-text :field="text" :htmlSerializer="htmlSerializer" />
    </div>
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
  mounted() {
    console.log(this.$route.params);
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
