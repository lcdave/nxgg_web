<template>
  <div class="footer">
    <div class="container">
      <h2 class="title size-2">Follow us</h2>
      <div class="footer__contact">
        <div class="columns">
          <div class="column is-three-quarters is-half-tablet">
            <div class="contact">
              <h4 class="title is-4">Contact</h4>
              <a href="mailto:info@nxgg.ch">info@nxgg.ch</a>
            </div>
          </div>
          <div class="column">
            <h4 class="title is-4">Livestream every sunday</h4>
            <div class="footer__twitch">
              <a href="https://www.twitch.tv/nxgg_tv" target="_blank">
                <font-awesome-icon :icon="['fab', 'twitch']" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer__socialmedia">
        <div class="columns">
          <div class="column">
            <a href="https://www.facebook.com/nxggesports/" target="_blank">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
            <a
              href="https://www.instagram.com/next_gaming_generation/?hl=de"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
          </div>
        </div>
      </div>
      <div class="footer__copyright">
        <div class="columns">
          <div class="column is-three-quarters is-half-tablet">
            © NxGG, {{ currentYear }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" src="../assets/sass/components/_footer.scss"></style>
