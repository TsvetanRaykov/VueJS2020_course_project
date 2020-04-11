<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        <v-icon class="white--text pb-1" small left
          >mdi-registered-trademark</v-icon
        >
        <strong>EventOur</strong>
        {{ new Date().getFullYear() }}
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    links: [
      { title: "Home", url: "/" },
      { title: "Login", url: "/login" }
    ]
  })
};
</script>
