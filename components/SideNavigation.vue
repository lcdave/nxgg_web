<template>
  <div class="side-navigation">
    <div class="side-navigation__logo"></div>
    <div class="side-navigation__cta">
      <ul>
        <li>
          <router-link to="/" @click="onLinkClick">
            <span class="icon-home var_grey is-active" />
          </router-link>
        </li>
        <li>
          <router-link to="/service/all/" @click="onLinkClick">
            <span class="icon-bar-chart var_grey"
          /></router-link>
        </li>
        <li>
          <router-link to="/logs/all/" @click="onLinkClick">
            <span class="icon-history var_grey" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onLinkClick(e) {
      var navItems = document.querySelectorAll(
        ".side-navigation__cta li a span"
      );
      for (var i = 0; i < navItems.length; i++) {
        console.log(navItems[i]);
        navItems[i].classList.remove("is-active");
      }
      e.target.classList.toggle("is-active");
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/components/_side-navigation.scss"></style>
