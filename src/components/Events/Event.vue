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
        <v-card>
          <v-card-title>
            <h3 class="text--secondary">{{ event.title }}</h3>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-event-details-dialog
                :event="event"
              ></edit-event-details-dialog>
            </template>
          </v-card-title>
          <v-img
            :src="event.imageUrl"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          ></v-img>
          <v-card-text>
            <div>
              <span class="info--text">{{ event.start | date }}</span> -
              <span class="success--text">{{ event.end | date }}</span>
              <span class="primary--text d-inline-block ml-5">
                {{ event.location }}
              </span>
            </div>
            <div>{{ event.description }}</div>
          </v-card-text>
          <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <v-btn class="primary"> <v-icon>mdi-bookmark</v-icon>Join </v-btn>
            <v-btn class="primary">
              <v-icon>mdi-heart</v-icon>Interested
            </v-btn>
            <v-btn class="primary">
              <v-icon>mdi-share-variant</v-icon>Share
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditEventDetailsDialog from "../events/edit/EditEventDetailsDialog";
export default {
  components: { EditEventDetailsDialog },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    event() {
      return this.$store.getters.loadedEvent(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.event.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style></style>
