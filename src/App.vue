<template>
  <v-app>
    <app-header />
    <v-content>
      <router-view></router-view>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppHeader from "./components/core/Header";
import AppFooter from "./components/core/Footer";

export default {
  name: "App",

  components: {
    AppHeader,
    AppFooter
  },

  data: () => ({
    //
  })
};
</script>
