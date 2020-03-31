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
import AppHeader from './components/core/AppHeader';
import AppFooter from './components/core/AppFooter';

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter
  },

  data: () => ({
    //
  })

};
</script>
