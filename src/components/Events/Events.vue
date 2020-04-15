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
              <v-hover>
                <template v-slot="{ hover }">
                  <v-card :elevation="hover ? 18 : 6">
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
                      <v-spacer></v-spacer>
                      <join-event-dialog
                        v-if="isAuth && !userIsCreator(event.id)"
                        :event-id="event.id"
                        :isIcon="true"
                      ></join-event-dialog>
                      <div class="mx-2 hidden-md-only">
                        <social-sharing-dialog
                          :shareUrl="event | shareLink"
                          :isIcon="true"
                        ></social-sharing-dialog>
                      </div>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import JoinEventDialog from "../events/dialogs/JoinEventDialog";
import SocialSharingDialog from "./dialogs/SocialSharingDialog";
export default {
  components: { JoinEventDialog, SocialSharingDialog },
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
  methods: {
    userIsCreator(eventCreatorId) {
      if (!this.isAuth) {
        return false;
      }
      return this.$store.getters.user.id === eventCreatorId;
    }
  },
  filters: {
    eventDetailsLink(event) {
      return `/events/${event.id}`;
    },
    shareLink(event) {
      return `${window.location.href}/${event.id}`;
    }
  }
};
</script>

<style></style>
