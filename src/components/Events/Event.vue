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
            <div class="d-flex justify-content-between">
              <div v-if="userIsCreator">
                <date-time-picker
                  class="d-inline mr-2"
                  :no-value-to-custom-elem="true"
                  v-model="startPickerValue"
                  @validate="validate"
                >
                  <v-btn class="info--text" type="button" text>
                    {{ event.start | date }}
                  </v-btn></date-time-picker
                >
                -
                <date-time-picker
                  class="d-inline ml-2"
                  :no-value-to-custom-elem="true"
                  v-model="endPickerValue"
                  color="#00C853"
                  @validate="validate"
                >
                  <v-btn class="success--text" type="button" text>
                    {{ event.end | date }}
                  </v-btn></date-time-picker
                >
              </div>
              <div v-else>
                <div class="info--text d-inline mr-2">
                  {{ event.start | date }}
                </div>
                -
                <div class="success--text d-inline ml-2">
                  {{ event.end | date }}
                </div>
              </div>
              <v-spacer></v-spacer>
              <div class="primary--text d-inline-block ml-5">
                {{ event.location }}
              </div>
            </div>

            <div>{{ event.description }}</div>
          </v-card-text>
          <v-card-actions>
            <join-event-dialog :event-id="id"></join-event-dialog>
            <v-btn class="primary mx-3">
              <v-icon>mdi-heart</v-icon>Interested
            </v-btn>
            <v-btn class="primary mx-0">
              <v-icon>mdi-share-variant</v-icon>Share
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditEventDetailsDialog from "../events/dialogs/EditEventDetailsDialog";
import JoinEventDialog from "../events/dialogs/JoinEventDialog";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import moment from "moment";
export default {
  components: {
    EditEventDetailsDialog,
    DateTimePicker: VueCtkDateTimePicker,
    JoinEventDialog
  },
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
    startPickerValue: {
      get: function() {
        return this.event.start ? moment(this.event.start) : null;
      },
      set: function(value) {
        this.event.start = value;
        this.isStartChanged = true;
      }
    },
    endPickerValue: {
      get: function() {
        return this.event.end ? moment(this.event.end) : null;
      },
      set: function(value) {
        this.event.end = value;
        this.isStartChanged = false;
      }
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
  },
  methods: {
    validate() {
      const updateObj = {
        id: this.event.id
      };
      if (this.isStartChanged) {
        updateObj.start = new Date(this.event.start).getTime();
      } else {
        updateObj.end = new Date(this.event.end).getTime();
      }

      this.$store.dispatch("updateEvent", updateObj);
    }
  },
  data() {
    return {
      isStartChanged: true,
      changedTime: false
    };
  }
};
</script>

<style></style>
