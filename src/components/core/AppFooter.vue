<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn v-for="link in links" :key="link.url" color="white" text rounded class="my-2" :to="link.url">{{ link.title }}</v-btn>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Vue Tasks</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    links: [
      { title: 'Home', url: '/' },
      { title: 'Login', url: '/login' }
    ]
  })
};
</script>
