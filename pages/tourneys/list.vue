<template>
  <post-list :items="tourneys" title="Turniere" />
</template>

<script>
import Vue from "vue";
import PostList from "@/components/generic/postList.vue";

export default Vue.extend({
  name: "TourneysList",
  layout: "detail",
  components: { PostList },
  async asyncData({ $prismic, error }) {
    try {
      const tourneys = await $prismic.api.query(
        $prismic.predicates.at("document.type", "tourney"),
        { orderings: "[my.tourney.date desc]" }
      );
      // Returns data to be used in template
      return {
        tourneys: tourneys.results,
      };
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: "Page not found" });
    }
  },
});
</script>
