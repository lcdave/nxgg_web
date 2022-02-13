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
        <div class="tourneylist__col">Max. Teams</div>
        <div class="tourneylist__col">Freie Plätze</div>
        <div class="tourneylist__col"></div>
      </div>
      <div
        class="tourneylist__row"
        v-for="(item, index) in tourneys"
        :key="index"
      >
        <div class="tourneylist__col tourneylist__col--highlighted">
          {{ item.title }}
        </div>
        <div class="tourneylist__col">{{ formatDate(item.date) }}</div>
        <div class="tourneylist__col">{{ getModus(item.mode) }}</div>
        <div class="tourneylist__col">{{ getPlatform(item.platform) }}</div>
        <div class="tourneylist__col">{{ item.price }} CHF</div>
        <div class="tourneylist__col">{{ item.entry }} CHF</div>
        <div class="tourneylist__col">{{ item.amount_teams }}</div>
        <div class="tourneylist__col">
          {{ getAmountFreeSlots(item.amount_teams, item.registrations) }}
        </div>
        <div class="tourneylist__col tourneylist__action">
          <div class="user-actions" v-if="!adminMode">
            <tourney-subscribe-button
              :item="item"
              :variant="variant"
              :adminMode="adminMode"
              :userID="user.id"
              @showModal="showModal"
            />
            <nuxt-link
              :to="`/user/dashboard/tourney/single/${item.id}`"
              v-if="variant == 'user'"
            >
              <font-awesome-icon
                :icon="['fas', 'trophy']"
                class="admin-actions__admin"
              />
            </nuxt-link>
          </div>
          <div class="admin-actions" v-if="adminMode">
            <font-awesome-icon
              :icon="['fas', 'pen']"
              class="admin-actions__edit"
              @click="showModal('edit', item.id)"
            />
            <font-awesome-icon
              :icon="['fas', 'trash']"
              class="admin-actions__delete"
              @click="showModal('delete', item.id)"
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
    <modal
      :title="modals.register.title"
      :isActive="modals.register.isActive"
      @accept="onRegisterAccept()"
      @cancel="onModalCancel('register')"
    >
      <template #content>
        <p>
          Bist du dir sicher, dass du dich für das Turnier anmelden möchtest?
        </p>
      </template>
    </modal>
    <modal
      :title="modals.unsubscribe.title"
      :isActive="modals.unsubscribe.isActive"
      @accept="onUnsubscribeAccept()"
      @cancel="onModalCancel('unsubscribe')"
    >
      <template #content>
        <p>
          Bist du dir sicher, dass du dich für das Turnier abmelden möchtest?
        </p>
      </template>
    </modal>
    <modal
      :title="modals.edit.title"
      :isActive="modals.edit.isActive"
      isLarge
      @accept="onTourneyEdit()"
      @cancel="onModalCancel('edit')"
    >
      <template #content>
        <div class="columns">
          <div class="column is-half">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="singleTourney.title"
                />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Datum</label>
              <div class="control">
                <input class="input" type="date" v-model="singleTourney.date" />
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half">
            <div class="field">
              <label class="label">Modus</label>
              <div class="control">
                <div class="select">
                  <select v-model="singleTourney.mode">
                    <option value="">Bitte auswählen</option>
                    <option value="1">Solo</option>
                    <option value="2">Duo</option>
                    <option value="3">Trio</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Plattform</label>
              <div class="control">
                <div class="select">
                  <select v-model="singleTourney.platform">
                    <option value="">Bitte auswählen</option>
                    <option value="1">Xbox</option>
                    <option value="2">Playstation</option>
                    <option value="3">PC</option>
                    <option value="3">Crossplay</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half">
            <div class="field">
              <label class="label">Preis</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="singleTourney.price"
                />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Eintrittspreis</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="singleTourney.entry"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Anzahl Teams</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="singleTourney.amount_teams"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </modal>
    <modal
      :title="modals.delete.title"
      :isActive="modals.delete.isActive"
      @accept="onDeleteAccept()"
      @cancel="onModalCancel('delete')"
    >
      <template #content>{{ modals.delete.content }}</template>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/generic/modal.vue";
import TourneySubscribeButton from "@/components/generic/tourneySubscribeButton.vue";

export default {
  name: "TourneyList",
  props: {
    list: {
      type: Array,
    },
    adminMode: {
      type: Boolean,
    },
    variant: {
      type: String,
    },
    dataFilter: {
      type: String,
    },
    user: {
      type: Object,
    },
  },
  components: {
    Modal,
    TourneySubscribeButton,
  },
  data() {
    return {
      tourneys: [],
      singleTourney: {
        id: "",
        title: "",
        date: "",
        mode: "",
        platform: "",
        price: "",
        entry: "",
        amount_teams: "",
      },
      modals: {
        delete: {
          title: "Turnier löschen",
          content: "Bist du dir sicher, dass du das Turnier löschen möchtest?",
          isActive: false,
          additionalParam: null,
        },
        edit: {
          title: "Turnier bearbeiten",
          isActive: false,
          additionalParam: null,
        },
        register: {
          title: "Turnier Anmeldung",
          isActive: false,
          additionalParam: null,
        },
        unsubscribe: {
          title: "Turnier Abmeldung",
          isActive: false,
          additionalParam: null,
        },
      },
    };
  },
  async created() {
    if (this.dataFilter) {
      this.setTourneysByFilter();
    } else {
      this.tourneys = this.list;
    }
  },
  watch: {
    list: function () {
      if (this.dataFilter) {
        this.setTourneysByFilter();
      } else {
        this.tourneys = this.list;
      }
    },
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
    async onRegisterAccept() {
      this.$emit("register", this.modals.register.additionalParam);
      this.modals.register.isActive = false;
    },
    async onUnsubscribeAccept() {
      this.$emit("unsubscribe", this.modals.unsubscribe.additionalParam);
      this.modals.unsubscribe.isActive = false;
    },
    onModalCancel(modal) {
      this.modals[modal].isActive = false;
    },
    async onDeleteAccept() {
      this.modals.delete.isActive = false;

      const { data, error } = await this.$supabase
        .from("tourneys")
        .delete()
        .eq("id", this.modals.delete.additionalParam);

      if (error) {
        this.$toast.show(
          "Turnier konnte nicht gelöscht werden, da bereits Anmeldungen vorhanden sind.",
          {
            duration: 4000,
            type: "error",
            position: "top-right",
          }
        );
      } else {
        //emit event to parent
        this.$emit("tourneyDeleted", this.modals.delete.additionalParam);
        this.$toast.show("Turnier wurde gelöscht", {
          duration: 4000,
          type: "success",
          position: "top-right",
        });
      }
    },
    showModal(modal, additionalParam) {
      this.modals[modal].isActive = true;

      if (additionalParam) {
        this.modals[modal].additionalParam = additionalParam;
      }

      if (modal === "edit") {
        const tourney = this.tourneys.find(
          (tourney) => tourney.id === additionalParam
        );
        this.singleTourney = JSON.parse(JSON.stringify(tourney));
      }
    },
    setTourneysByFilter() {
      if (this.dataFilter == "future") {
        this.tourneys = this.list.filter((item) =>
          this.isDateInFuture(item.date)
        );
      } else if (this.dataFilter == "past") {
        this.tourneys = this.list.filter((item) => {
          return !this.isDateInFuture(item.date);
        });
      }
    },
    isDateInFuture(date) {
      const today = new Date();
      const compareDate = new Date(date);

      return compareDate >= today;
    },
    async onTourneyEdit() {
      const { data, error } = await this.$supabase
        .from("tourneys")
        .update({
          title: this.singleTourney.title,
          date: this.singleTourney.date,
          mode: this.singleTourney.mode,
          platform: this.singleTourney.platform,
          price: this.singleTourney.price,
          entry: this.singleTourney.entry,
          amount_teams: this.singleTourney.amount_teams,
        })
        .eq("id", this.modals.edit.additionalParam);

      if (error) {
        this.$toast.show("Turnier konnte nicht gespeichert werden", {
          duration: 4000,
          type: "error",
          position: "top-right",
        });
      } else {
        this.$emit("tourneyEdited", this.modals.edit.additionalParam);
        this.$toast.show("Turnier wurde erfolgreich gespeichert ", {
          duration: 4000,
          type: "success",
          position: "top-right",
        });

        this.modals.edit.isActive = false;
      }
    },
    async deleteTourney(id) {
      const { data, error } = await this.$supabase
        .from("tourneys")
        .delete()
        .eq("id", id);

      if (error) {
        this.$toast.show("Turnier konnte nicht gelöscht werden", {
          duration: 4000,
          type: "error",
          position: "top-right",
        });
      } else {
        this.$toast.show("Turnier wurde erfolgreich gelöscht ", {
          duration: 4000,
          type: "success",
          position: "top-right",
        });
      }
    },
    getAmountFreeSlots(max, current) {
      return parseInt(max) - parseInt(current);
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/components/_tourneylist.scss"></style>
