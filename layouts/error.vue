<template>
  <div class="error">
    <div class="container">
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>
        Ooops! Es ist ein Fehler aufgetreten. Bitte laden Sie die Seite neu oder
        gehen Sie zurück zur <NuxtLink to="/">Webseite</NuxtLink>.
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
};
</script>

<style lang="scss" src="@/assets/sass/layout/_error.scss"></style>
