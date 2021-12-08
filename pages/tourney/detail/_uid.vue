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
            <h1>{{ $prismic.asText(tourney.title) }}</h1>
            <tourney-form />
            <NuxtLink to="/"><button class="button">Zurück</button></NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TourneyForm from "@/components/TourneyForm.vue";
export default {
  components: {
    TourneyForm,
  },
  async asyncData({ $prismic, params, error }) {
    try {
      // Query to get post content
      const tourney = (await $prismic.api.getByUID("tourney", params.uid)).data;
      // Returns data to be used in template
      return {
        tourney: tourney,
      };
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: "Page not found" });
    }
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
