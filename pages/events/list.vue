<template>
  <post-list :items="events" title="Events" />
</template>

<script>
import Vue from "vue";
import PostList from "@/components/generic/postList.vue";

export default Vue.extend({
  name: "EventsList",
  components: { PostList },
  layout: "detail",
  async asyncData({ $prismic, error }) {
    try {
      const events = await $prismic.api.query(
        $prismic.predicates.at("document.type", "event"),
        { orderings: "[my.event.date desc]" }
      );
      // Returns data to be used in template
      return {
        events: events.results,
      };
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: "Page not found" });
    }
  },
});
</script>
