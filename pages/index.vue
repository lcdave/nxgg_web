<!--
Looking for more information about the Slice Zone? Here's the documentation about it:
https://www.slicemachine.dev/documentation/nuxt/add-the-slice-zone-to-your-page
-->
<template>
  <div class="home">
    <slice-zone type="home" queryType="single" />
    <section class="section section--black">
      <post-preview
        :items="news"
        :limit="2"
        title="News"
        buttonLabel="Alle News"
        buttonLink="/news/list"
      />
    </section>
    <section class="section">
      <post-preview
        :items="events"
        :limit="4"
        title="Events"
        buttonLabel="Alle Events"
        buttonLink="/events/list"
      />
    </section>
    <section class="section section--black">
      <post-preview
        :items="tourneys"
        :limit="2"
        title="Turniere"
        buttonLabel="Alle Turniere"
        buttonLink="/tourneys/list"
      />
    </section>
  </div>
</template>

<script>
import SliceZone from "vue-slicezone";
import Teaser from "@/components/Teaser.vue";
import PostPreview from "@/components/generic/postPreview.vue";

export default {
  components: {
    SliceZone,
    Teaser,
    PostPreview,
  },
  async asyncData({ $prismic, error }) {
    try {
      const news = await $prismic.api.query(
        $prismic.predicates.at("document.type", "news")
      );

      const events = await $prismic.api.query(
        $prismic.predicates.at("document.type", "event")
      );

      const tourneys = await $prismic.api.query(
        $prismic.predicates.at("document.type", "tourney")
      );
      // Returns data to be used in template
      return {
        news: news.results,
        events: events.results,
        tourneys: tourneys.results,
      };
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>
