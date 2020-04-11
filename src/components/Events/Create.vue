<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <h2 class="text--secondary">Create an Event</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form @submit.prevent="createEventHandler" v-model="valid">
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3" ma="0" class="py-0">
              <v-text-field
                name="title"
                id="title"
                label="Title"
                v-model="title"
                required
                :rules="titleRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-text-field
                name="location"
                id="location"
                label="Location"
                v-model="location"
                required
                :rules="locationRules"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" offset-sm="3" class="py-0">
              <v-row>
                <v-col cols="6">
                  <div class="text--secondary">Duration</div>
                  <date-time-picker
                    class="mt-1"
                    :class="{ error: !startTime }"
                    label="Select Start Time"
                    v-model="startTime"
                    format="YYYY-MM-DD hh:mm a"
                    id="pick-start"
                  />
                </v-col>
                <v-col cols="6">
                  <br />
                  <date-time-picker
                    class="mt-1"
                    label="Select End Time"
                    v-model="endTime"
                    format="YYYY-MM-DD hh:mm a"
                    color="#00C853"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3" class="pb-0">
              <v-file-input
                accept="image/*"
                label="Image"
                show-size
                dense
                hint="Image of the event"
                required
                prepend-icon="mdi-camera"
                v-model="image"
                :rules="imageRules"
                placeholder="Pick a picture"
                @change="filePickedHandler"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3" class="py-0 text-center mb-4">
              <img class="img-preview" :src="imageUrl" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3" class="py-0">
              <v-textarea
                name="description"
                id="description"
                filled
                label="Description"
                v-model="description"
                auto-grow
                :rules="descriptionRules"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                :loading="loading"
                type="submit"
                >Create Event</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
export default {
  components: { DateTimePicker: VueCtkDateTimePicker },
  data: () => ({
    valid: true,
    title: "",
    titleRules: [v => !!v || "Title is required"],
    location: "",
    locationRules: [v => !!v || "Location is required"],
    image: null,
    imageRules: [
      v => !!v || "Image is required",
      v => !v || v.size < 1000000 || "Image size should be less than 1 MB!"
    ],
    description: "",
    descriptionRules: [v => !!v || "Description is required"],
    startTime: null,
    endTime: null,
    imageUrl: ""
  }),
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    formIsValid() {
      return this.valid && !!this.startTime;
    }
  },
  methods: {
    createEventHandler() {
      if (!this.formIsValid) {
        return;
      }
      const eventData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        start: new Date(this.startTime).getTime(),
        end: new Date(this.endTime).getTime()
      };
      this.$store.dispatch("createEvent", eventData);
      this.$router.push("/events");
    },
    filePickedHandler(img) {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(img);
    }
  }
};
</script>

<style scoped>
.img-preview {
  max-width: 400px;
}
#pick-start-wrapper.error {
  border-left: 3px solid red !important;
}
</style>
