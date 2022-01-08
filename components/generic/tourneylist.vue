<template>
  <div class="tourneylist">
    <div class="tourneylist__title"><h3>Turniere</h3></div>

    <div class="tourneylist__content">
      <div class="tourneylist__row">
        <div class="tourneylist__col">Titel</div>
        <div class="tourneylist__col">Datum</div>
        <div class="tourneylist__col">Modus</div>
        <div class="tourneylist__col">Preis</div>
        <div class="tourneylist__col"></div>
      </div>
      <div class="tourneylist__row" v-for="(item, index) in list" :key="index">
        <div class="tourneylist__col">{{ item.title }}</div>
        <div class="tourneylist__col">{{ item.date }}</div>
        <div class="tourneylist__col">{{ item.mode }}</div>
        <div class="tourneylist__col">{{ item.price }}</div>
        <div class="tourneylist__col tourneylist__action">
          <button @click="onRegisterClick(item.id)">Anmelden</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" src="@/assets/sass/components/_tourneylist.scss"></style>
