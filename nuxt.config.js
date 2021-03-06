import smConfig from "./sm.json";
import { getStoriesPaths } from "slice-machine-ui/helpers/storybook";

if (!smConfig.apiEndpoint) {
  console.warn(
    "Looks like Slice Machine hasn't been bootstraped already.\nCheck the `Getting Started` section of the README file :)"
  );
}

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "NxGG",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "./assets/sass/app.scss",
    "./assets/sass/bulma/_variables.scss",
    "./assets/sass/base/_fonts.scss",
  ],

  buildModules: ["@nuxtjs/style-resources"],

  styleResources: {
    scss: [
      "./assets/sass/tools/_functions.scss",
      "./assets/sass/base/_variables.scss",
      "./assets/sass/tools/_mixins.scss",
      "./assets/sass/base/_fonts.scss",
    ],
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["./plugins/firebase.js"],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      "@nuxtjs/prismic",
      {
        endpoint: smConfig.apiEndpoint || "",
        apiOptions: {
          routes: [
            {
              type: "page",
              path: "/:uid",
            },
          ],
        },
      },
    ],
    ["nuxt-sm"],
    ["nuxt-buefy", { css: false }],
    ["@nuxtjs/axios"],
  ],
  generate: {
    fallback: true,
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ["vue-slicezone", "nuxt-sm"],
  },
  storybook: {
    // This is a bug with `getStoriesPaths` and Nuxt that is awaiting to be fixed
    stories: [...getStoriesPaths().map((path) => path.replace("../", "~/"))],
  },
  // This is a bug with `getStoriesPaths` and Nuxt that is awaiting to be fixed
  ignore: [...getStoriesPaths().map((path) => path.replace("../", "~/"))],
  prismic: {
    linkResolver: "~/plugins/link-resolver.js",
  },
};
