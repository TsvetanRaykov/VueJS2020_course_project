<template>
  <v-app>
    <app-header />
    <v-content>
      <!-- <component @navigationEvent="navigateEventHandler($event)" :is="activeComponent" /> -->
      <router-view></router-view>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppHeader from './components/core/AppHeader';
import AppFooter from './components/core/AppFooter';
// import AppLogin from './components/user/AppLogin';
// import AppRegister from './components/user/AppRegister';

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter
  },

  data: () => ({
    //
  })
  // methods: {
  //   navigateEventHandler(componentName) {
  //     this.activeComponent = componentName;
  //   }
  // }
};
</script>
