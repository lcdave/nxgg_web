<!--
Looking for more information about the Slice Zone? Here's the documentation about it:
https://www.slicemachine.dev/documentation/nuxt/add-the-slice-zone-to-your-page
-->
<template>
  <div class="home">
    <slice-zone type="home" queryType="single" />
    <section class="section section--grey" id="news">
      <div class="container">
        <post-preview
          :items="news"
          :limit="2"
          title="News"
          buttonLabel="Alle News"
          buttonLink="/news/list/"
        />
      </div>
    </section>
    <section class="section section--white" id="events">
      <div class="container">
        <post-preview
          :items="events"
          :limit="4"
          title="Events"
          buttonLabel="Alle Events"
          buttonLink="/events/list/"
        />
      </div>
    </section>
    <section class="section section--grey" id="tourneys">
      <div class="container">
        <post-preview
          :items="tourneys"
          :limit="2"
          title="Turniere"
          buttonLabel="Alle Turniere"
          buttonLink="/tourneys/list/"
        />
      </div>
    </section>
  </div>
</template>

<script>
import SliceZone from "vue-slicezone";
import PostPreview from "@/components/generic/postPreview.vue";

export default {
  components: {
    SliceZone,
    PostPreview,
  },
  async asyncData({ $prismic, error }) {
    try {
      const news = await $prismic.api.query(
        $prismic.predicates.at("document.type", "news"),
        { orderings: "[my.news.date desc]" }
      );

      const events = await $prismic.api.query(
        $prismic.predicates.at("document.type", "event"),
        { orderings: "[my.event.date desc]" }
      );

      const tourneys = await $prismic.api.query(
        $prismic.predicates.at("document.type", "tourney"),
        { orderings: "[my.tourney.date desc]" }
      );
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
