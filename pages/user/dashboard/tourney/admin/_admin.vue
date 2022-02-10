<template>
  <div class="tourney-admin">
    <widget title="Turnier verwalten">
      <template #header-actions>
        <button class="btn btn--primary" @click="showModal('create')">
          Turnier erstellen
        </button>
      </template>
      <template #content>
        <tourneylist
          :list="tourneys"
          @register="onRegisterClick"
          adminMode
          @tourneyDeleted="updateTourneys()"
          @tourneyEdited="updateTourneys()"
        />
      </template>
    </widget>
    <modal
      :title="modals.create.title"
      :isActive="modals.create.isActive"
      @accept="onCreateAccept()"
      @cancel="onModalCancel('delete')"
      isLarge
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
                  v-model="createTourney.title"
                />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Datum</label>
              <div class="control">
                <input class="input" type="date" v-model="createTourney.date" />
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
                  <select v-model="createTourney.mode">
                    <option value="">Select dropdown</option>
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
                  <select v-model="createTourney.platform">
                    <option value="">Select dropdown</option>
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
                  v-model="createTourney.price"
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
                  v-model="createTourney.entry"
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
                  v-model="createTourney.amount_teams"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Vue from "vue";
import Tourneylist from "@/components/generic/tourneylist.vue";
import Widget from "@/components/generic/widget.vue";
import Modal from "@/components/generic/modal.vue";

import * as UserService from "@/services/supabase/user";

export default Vue.extend({
  name: "TourneyAdmin",
  components: { Tourneylist, Widget, Modal },
  middleware: ["auth", "admin"],
  layout: "dashboard",
  data() {
    return {
      tourneys: [],
      createTourney: {
        id: "",
        title: "",
        date: "",
        mode: "",
        platform: "",
        price: "",
        entry: "",
        amount_teams: "",
      },
      user: null,
      userProfile: null,
      modals: {
        create: {
          title: "Turnier erstellen",
          isActive: false,
          additionalParam: null,
        },
      },
    };
  },
  async created() {
    await UserService.getAuthUser().then((user) => {
      this.user = user;
    });

    await UserService.getProfile().then((profile) => {
      this.userProfile = profile;
    });

    this.setTourneys();
  },
  methods: {
    async setTourneys() {
      let { data: tourneys, error } = await this.$supabase
        .from("tourneys")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        this.$toast.show(
          "Turniere konnten nicht geladen werden. Bitte kontaktieren Sie den Administrator",
          {
            duration: 4000,
            type: "error",
            position: "top-right",
          }
        );
      }

      this.tourneys = tourneys;
    },
    async onRegisterClick(tourneyID) {
      const { data, error } = await this.$supabase
        .from("profile_tourneys_nm")
        .insert([{ profile_id: this.user.id, tourney_id: tourneyID }]);
    },
    showModal(modal, additionalParam) {
      this.modals[modal].isActive = true;

      if (additionalParam) {
        this.modals[modal].additionalParam = additionalParam;
      }
    },
    onModalCancel(modal) {
      this.modals[modal].isActive = false;
    },
    async onCreateAccept() {
      const { data, error } = await this.$supabase.from("tourneys").insert({
        title: this.createTourney.title,
        date: this.createTourney.date,
        mode: this.createTourney.mode,
        platform: this.createTourney.platform,
        price: this.createTourney.price,
        entry: this.createTourney.entry,
        amount_teams: this.createTourney.amount_teams,
      });

      if (error) {
        console.log(error);
        this.$toast.show(
          "Turnier konnte nicht erstellt werden. Bitte kontaktieren Sie den Administrator.",
          {
            duration: 4000,
            type: "error",
            position: "top-right",
          }
        );
      } else {
        this.$toast.show("Turnier wurde erfolgreich erstellt.", {
          duration: 4000,
          type: "success",
          position: "top-right",
        });
      }

      this.setTourneys();
      this.onModalCancel("create");
    },
    updateTourneys() {
      this.setTourneys();
    },
  },
});
</script>
