<template>
  <post-detail :post="tourney">
    <template #additionalContent>
      <tourney-form />
    </template>
  </post-detail>
</template>

<script>
import PostDetail from "@/components/generic/postDetail.vue";
import TourneyForm from "@/components/TourneyForm.vue";
export default {
  components: {
    PostDetail,
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
};
</script>
