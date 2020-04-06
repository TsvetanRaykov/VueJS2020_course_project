<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <h2 class="text--secondary">Create an Event</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <form @submit.prevent="createEventHandler">
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3" ma="0" class="py-0">
              <v-text-field name="title" id="title" label="Title" v-model="title" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3" class="py-0">
              <v-text-field
                name="location"
                id="location"
                label="Location"
                v-model="location"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3" class="py-0">
              <v-text-field
                name="imageUrl"
                id="image-url"
                label="Image Url"
                v-model="imageUrl"
                required
              ></v-text-field>
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
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3" class="py-0">
              <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Event</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: "",
    location: "",
    imageUrl: "",
    description: ""
  }),
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
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
        imageUrl: this.imageUrl,
        description: this.description,
        start: new Date(),
        end: new Date()
      };
      this.$store.dispatch("createEvent", eventData);
      this.$router.push("/events");
    }
  }
};
</script>

<style scoped>
.img-preview {
  max-width: 400px;
}
</style>
