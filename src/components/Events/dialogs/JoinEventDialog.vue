<template>
  <v-dialog v-model="dialog" persistent width="400">
    <template v-slot:activator="{ on }">
      <v-btn v-if="isIcon" icon v-on="on">
        <v-icon :class="{ 'red--text': isJoined }">mdi-bookmark</v-icon></v-btn
      >
      <v-btn v-else class="primary" v-on="on">
        <v-icon :class="{ 'red--text': isJoined }">mdi-bookmark</v-icon
        >{{ isJoined ? "Left" : "Join" }}</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="headline" v-if="isJoined"
        >Unregister from the Event?</v-card-title
      >
      <v-card-title class="headline" v-else>Join the Event?</v-card-title>
      <v-card-text>You can always change your decision later on.</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info darken-1" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="success darken-1" text @click="joinAgreeHandler"
          >Confirm</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: {
    isIcon: { type: Boolean, required: true },
    eventId: {
      type: String,
      required: true
    }
  },
  computed: {
    isJoined() {
      return (
        this.$store.getters.user.eventsJoined.findIndex(eventId => {
          return eventId === this.eventId;
        }) >= 0
      );
    }
  },
  methods: {
    joinAgreeHandler() {
      if (this.isJoined) {
        this.$store.dispatch("unregisterUserFromEvent", this.eventId);
      } else {
        this.$store.dispatch("registerUserToEvent", this.eventId);
      }
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.red {
  color: red;
}
</style>
