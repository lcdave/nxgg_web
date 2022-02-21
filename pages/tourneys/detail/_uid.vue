<template>
  <post-detail :post="tourney">
    <template #additionalContent>
      <div class="post__additional-content">
        Um sich für das Turnier anmelden zu können, müssen Sie sich im
        Turnierbereich <router-link to="/user/login">einloggen.</router-link>
      </div>
    </template>
  </post-detail>
</template>

<script>
import PostDetail from "@/components/generic/postDetail.vue";
export default {
  components: {
    PostDetail,
  },
  layout: "detail",
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
};
</script>
