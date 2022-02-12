<template>
  <widget title="Benutzereinstellungen" small>
    <template #content>
      <user-settings-form />
    </template>
  </widget>
</template>

<script>
import Vue from "vue";
import Widget from "@/components/generic/widget.vue";
import UserSettingsForm from "@/components/userSettingsForm.vue";

export default Vue.extend({
  name: "UserSettings",
  layout: "dashboard",
  middleware: ["auth"],
  components: { Widget, UserSettingsForm },
  data() {
    return {};
  },
  methods: {},
});
</script>
