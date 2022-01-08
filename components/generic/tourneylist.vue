<template>
  <div class="tourneylist">
    <div class="tourneylist__content">
      <div class="tourneylist__row tourneylist__row--header">
        <div class="tourneylist__col tourneylist__col--highlighted">Titel</div>
        <div class="tourneylist__col">Datum</div>
        <div class="tourneylist__col">Modus</div>
        <div class="tourneylist__col">Plattform</div>
        <div class="tourneylist__col">Preis</div>
        <div class="tourneylist__col">Eintrittspreis</div>
        <div class="tourneylist__col">Anz. Teams</div>
        <div class="tourneylist__col"></div>
      </div>
      <div class="tourneylist__row" v-for="(item, index) in list" :key="index">
        <div class="tourneylist__col tourneylist__col--highlighted">
          {{ item.title }}
        </div>
        <div class="tourneylist__col">{{ formatDate(item.date) }}</div>
        <div class="tourneylist__col">{{ getModus(item.mode) }}</div>
        <div class="tourneylist__col">{{ getPlatform(item.platform) }}</div>
        <div class="tourneylist__col">{{ item.price }} CHF</div>
        <div class="tourneylist__col">{{ item.entry }} CHF</div>
        <div class="tourneylist__col">{{ item.amount_teams }} Teams</div>
        <div class="tourneylist__col tourneylist__action">
          <button @click="triggerModal(item.id, item.title)" v-if="!adminMode">
            Anmelden
          </button>
          <div class="admin-actions" v-if="adminMode">
            <font-awesome-icon
              :icon="['fas', 'pen']"
              class="admin-actions__edit"
            />
            <font-awesome-icon
              :icon="['fas', 'trash']"
              class="admin-actions__delete"
            />
            <nuxt-link :to="`/user/dashboard/tourney/admin/single/${item.id}`">
              <font-awesome-icon
                :icon="['fas', 'trophy']"
                class="admin-actions__admin"
              />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': modalActive }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="dialog">
          <div class="dialog__title">
            <h3>Turnieranmeldung</h3>
          </div>
          <div class="dialog__content">
            <div class="dialog__content-text">
              <p>
                Bist du dir sicher, dass du dich für das Turnier
                <strong>{{ modalTourneyTitle }}</strong>
                anmelden möchtest?
              </p>
            </div>
            <div class="dialog__content-action">
              <button @click="onRegisterClick(modalTourneyID)">Anmelden</button>
              <button @click="resetModal()" class="cancel">Abbrechen</button>
            </div>
          </div>
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
    adminMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      modalActive: false,
      modalTourneyTitle: "",
      modalTourneyID: "",
    };
  },
  methods: {
    getModus(mode) {
      switch (mode) {
        case 1:
          return "Solo";
        case 2:
          return "Duo";
        case 3:
          return "Trio";
        default:
          return "";
      }
    },
    getPlatform(platform) {
      switch (platform) {
        case 1:
          return "Xbox";
        case 2:
          return "Playstation";
        case 3:
          return "PC";
        case 4:
          return "Crossplay";
        default:
          return "";
      }
    },
    formatDate(date) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(date).toLocaleDateString("de-DE", options);
    },
    triggerModal(id, title) {
      this.modalActive = true;
      this.modalTourneyID = id;
      this.modalTourneyTitle = title;
    },
    async onRegisterClick(id) {
      this.$emit("register", id);
      this.resetModal();
    },
    resetModal() {
      this.modalActive = false;
      this.modalTourneyTitle = "";
      this.modalTourneyID = "";
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/components/_tourneylist.scss"></style>
