<template>
  <div class="list">
    <section class="section">
      <div class="container">
        <nuxt-link
          :to="{
            name: 'index',
          }"
        >
          <button class="button">Zurück</button>
        </nuxt-link>
        <slice-zone type="events" queryType="single" :sliceProps="{ col: 4 }" />
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import SliceZone from "vue-slicezone";

export default Vue.extend({
  name: "",
  data() {
    return {};
  },
  methods: {},
  components: {
    SliceZone,
  },
});
</script>
