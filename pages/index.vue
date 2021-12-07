<!--
Looking for more information about the Slice Zone? Here's the documentation about it:
https://www.slicemachine.dev/documentation/nuxt/add-the-slice-zone-to-your-page
-->
<template>
  <div class="home">
    <slice-zone type="home" queryType="single" />
    <section class="section section--black">
      <div class="container">
        <slice-zone
          type="news"
          queryType="single"
          :sliceProps="{ col: 6, limitedItems: true }"
        />
        <div class="columns is-centered">
          <div class="column has-text-centered is-2">
            <nuxt-link
              :to="{
                name: 'newsList',
              }"
            >
              <button class="button is-primary">Alle News</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <slice-zone
          type="events"
          queryType="single"
          :sliceProps="{ col: 6, limitedItems: true }"
        />
        <div class="columns is-centered">
          <div class="column has-text-centered is-2">
            <nuxt-link
              :to="{
                name: 'eventsList',
              }"
            >
              <button class="button is-primary">Alle Events</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <slice-zone
          type="tourneys"
          queryType="single"
          :sliceProps="{ col: 6, limitedItems: true }"
        />
        <div class="columns is-centered">
          <div class="column has-text-centered is-2">
            <nuxt-link
              :to="{
                name: 'tourneysList',
              }"
            >
              <button class="button is-primary">Alle Turniere</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SliceZone from "vue-slicezone";

export default {
  components: {
    SliceZone,
  },
};
</script>
