<template>
  <div class="my-tourneys">
    <widget title="Meine anstehenden Turniere">
      <template #content>
        <tourneylist
          :list="tourneys"
          variant="user"
          dataFilter="future"
          v-if="tourneys"
          :user="user"
        />
      </template>
    </widget>
    <widget title="Meine abgeschlossene Turniere">
      <template #content>
        <tourneylist
          :list="tourneys"
          variant="user"
          dataFilter="past"
          v-if="tourneys"
          :user="user"
        />
      </template>
    </widget>
  </div>
</template>

<script>
import Vue from "vue";

import Tourneylist from "@/components/generic/tourneylist.vue";
import Widget from "@/components/generic/widget.vue";

import * as UserService from "@/services/supabase/user";

export default Vue.extend({
  name: "myTourneys",
  layout: "dashboard",
  components: { Tourneylist, Widget },
  middleware: ["auth"],
  data() {
    return {
      tourneys: [],
      user: null,
      userProfile: null,
    };
  },
  async created() {
    await UserService.getAuthUser().then((user) => {
      this.user = user;
    });

    let { data: tourneys, error } = await this.$supabase
      .from("profile_tourneys_view")
      .select("*")
      .eq("profile_id", this.user.id);

    this.tourneys = tourneys;

    await UserService.getProfile().then((profile) => {
      this.userProfile = profile;
    });
  },
});
</script>
