<template>
  <div class="topbar">
    <div class="columns">
      <div class="column">
        <div class="logo">
          <img src="../assets/theme/logo.png" alt="NXGG Logo" />
        </div>
      </div>
      <div class="column">
        <navigation />
      </div>
      <div class="column">
        <button class="button is-primary">Jetzt live</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="../assets/sass/components/_topbar.scss"></style>

<script>
import Navigation from './Navigation.vue'

export default {
  name: 'Topbar',
  components: {
    Navigation,
  },
}
</script>
<style lang="scss" scoped></style>
