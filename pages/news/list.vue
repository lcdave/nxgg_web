<template>
  <post-list :items="news" title="News" />
</template>

<script>
import Vue from "vue";
import PostList from "@/components/generic/postList.vue";

export default Vue.extend({
  name: "NewsList",
  components: { PostList },
  async asyncData({ $prismic, error }) {
    try {
      const news = await $prismic.api.query(
        $prismic.predicates.at("document.type", "news")
      );
      // Returns data to be used in template
      return {
        news: news.results,
      };
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: "Page not found" });
    }
  },
});
</script>
