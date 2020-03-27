<template>
  <v-app>
    <app-header @navigationEvent="navigateEventHandler($event)" />
    <v-content>
      <component @navigationEvent="navigateEventHandler($event)" :is="activeComponent" />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppHeader from "./components/core/AppHeader";
import AppLogin from "./components/core/AppLogin";
import AppRegister from "./components/core/AppRegister";
import AppFooter from "./components/core/AppFooter";

export default {
  name: "App",

  components: {
    AppHeader,
    AppLogin,
    AppRegister,
    AppFooter
  },

  data: () => ({
    activeComponent: "AppLogin"
  }),
  methods: {
    navigateEventHandler(componentName) {
      this.activeComponent = componentName;
    }
  }
};
</script>
