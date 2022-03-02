<template>
  <div class="widget" :class="{ 'widget--small': small }">
    <div class="widget__header" v-if="title">
      <h3>{{ title }}</h3>
      <slot name="header-actions" />
    </div>
    <div class="widget__content">
      <slot name="content" :innerProps="innerProps" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    small: Boolean,
    innerProps: Object,
  },
};
</script>

<style lang="scss" src="@/assets/sass/components/_widget.scss"></style>
