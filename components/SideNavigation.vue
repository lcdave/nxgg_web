<template>
  <div class="side-navigation">
    <div class="side-navigation__logo">
      <img src="../assets/theme/logo.svg" alt="NXGG Logo" />
    </div>
    <div class="side-navigation__cta">
      <ul>
        <li class="active" @click="onLinkClick">
          <router-link to="/user/dashboard/overview">
            <HomeIcon size="1.5x" />
          </router-link>
        </li>
        <li @click="onLinkClick">
          <router-link to="/user/dashboard/overview">
            <font-awesome-icon :icon="['fas', 'gamepad']" />
          </router-link>
        </li>
        <li @click="onLinkClick" v-if="isAdmin">
          <router-link to="/user/dashboard/tourney/admin">
            <font-awesome-icon :icon="['fas', 'user-shield']" />
          </router-link>
        </li>
        <li @click="onLinkClick">
          <router-link to="/user/dashboard/overview">
            <font-awesome-icon :icon="['fas', 'cog']" />
          </router-link>
        </li>
      </ul>
    </div>
    <div class="side-navigation__footer">
      <font-awesome-icon :icon="['fas', 'power-off']" @click="logout()" />
    </div>
  </div>
</template>

<script>
import { HomeIcon } from "@vue-hero-icons/outline";
export default {
  components: {
    HomeIcon,
  },
  data() {
    return {
      isAdmin: false,
    };
  },
  async created() {
    const user = this.$supabase.auth.user();

    let { data } = await this.$supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    this.isAdmin = data.isAdmin;
  },
  methods: {
    onLinkClick(e) {
      var navItems = document.querySelectorAll(".side-navigation__cta li");
      for (var i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active");
      }
      e.currentTarget.classList.toggle("active");
    },
    logout() {
      this.$supabase.auth.signOut();
      this.$store.commit("auth/setUser", null);
      this.$router.push("/auth");
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/components/_side-navigation.scss"></style>
