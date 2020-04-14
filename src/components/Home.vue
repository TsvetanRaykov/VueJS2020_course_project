<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          :size="100"
          color="primary"
          indeterminate
          :width="7"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="event in events"
            :key="event.id"
            :src="event.imageUrl"
            :to="event | eventDetailsLink"
          >
            <div class="title">{{ event.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">Welcome to our events!</v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    events() {
      return this.$store.getters.featuredEvents;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  filters: {
    eventDetailsLink(event) {
      return `/events/${event.id}`;
    }
  }
};
</script>
<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 2em !important;
}
</style>
