<template>
  <v-dialog v-model="dialog" persistent width="400">
    <template v-slot:activator="{ on }">
      <v-btn color="primary--text" fab v-on="on"
        ><v-icon>mdi-calendar-edit</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-card-title class="headline">Edit Event</v-card-title>
      <v-form @submit.prevent="saveEventHandler" v-model="valid">
        <v-card-text
          ><v-text-field
            name="title"
            id="title"
            label="Title"
            v-model="editedTitle"
            required
            :rules="titleRules"
          ></v-text-field>
          <v-textarea
            name="description"
            id="description"
            filled
            label="Description"
            v-model="editedDescription"
            auto-grow
            :rules="descriptionRules"
          ></v-textarea
        ></v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="success darken-1" text type="submit" :disabled="!valid"
            >Save</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      valid: true,
      dialog: false,
      editedTitle: this.event.title,
      editedDescription: this.event.description,
      titleRules: [v => !!v || "Title is required"],
      descriptionRules: [v => !!v || "Description is required"]
    };
  },
  methods: {
    saveEventHandler() {
      this.dialog = false;
      this.$store.dispatch("updateEvent", {
        id: this.event.id,
        title: this.editedTitle,
        description: this.editedDescription
      });
    }
  }
};
</script>

<style></style>
