<template>
  <v-container>
    <v-row>
      <v-col colls="12">
        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="event in events"
              :key="event.id"
              xs="12"
              sm="6"
              md="3"
            >
              <!-- <v-hover>
                <template v-slot="{ hover }">
              <v-card :to="event | eventDetailsLink" :elevation="hover ? 18 : 6">-->
              <v-card>
                <v-img
                  :src="event.imageUrl"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title v-text="event.title"></v-card-title>
                </v-img>
                <v-card-text>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="12"
                      lg="6"
                      class="text-no-wrap text-left caption py-0"
                    >
                      <h4>{{ event.start | date("DD MMMM YYYY") }}</h4>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="py-0">
                      {{ event.location }}
                      <!-- <h4>{{ event.end | date }}</h4> -->
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions
                  class="py-0"
                  :class="{ 'justify-center': !isAuth }"
                >
                  <v-btn
                    class="ma-2"
                    outlined
                    color="primary"
                    :to="event | eventDetailsLink"
                    >Event Details</v-btn
                  >
                  <v-spacer v-if="isAuth"></v-spacer>
                  <span v-if="isAuth">
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>

                    <v-btn icon class="hidden-md-only">
                      <v-icon>mdi-bookmark</v-icon>
                    </v-btn>

                    <v-btn icon class="hidden-md-only">
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </span>
                </v-card-actions>
              </v-card>
              <!-- </template> 
              </v-hover>-->
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    events() {
      return this.$store.getters.loadedEvents;
    },
    isAuth() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  filters: {
    eventDetailsLink(event) {
      return `/events/${event.id}`;
    }
  }
};
</script>

<style></style>
