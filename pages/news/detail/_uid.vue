<!--
Looking for more information about the Slice Zone? Here's the documentation about it:
https://www.slicemachine.dev/documentation/nuxt/add-the-slice-zone-to-your-page
-->
<template>
  <post-detail :post="news" />
</template>

<script>
import PostDetail from "@/components/generic/postDetail.vue";
export default {
  components: {
    PostDetail,
  },
  async asyncData({ $prismic, params, error }) {
    try {
      // Query to get post content
      const news = (await $prismic.api.getByUID("news", params.uid)).data;
      // Returns data to be used in template
      return {
        news: news,
      };
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>
