<template>
  <div class="navigation">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <prismic-link
          :field="menuLink.link"
          class="navbar-item"
          v-for="menuLink in $store.state.menu.menu_links"
          :key="menuLink.id"
          >{{ $prismic.asText(menuLink.label) }}</prismic-link
        >
      </div>
    </nav>
  </div>
</template>

<style lang="scss" src="../assets/sass/components/_navigation.scss"></style>
