<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3 class="text--secondary">{{ event.title }}</h3>
          </v-card-title>
          <v-img :src="event.imageUrl" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="400px">
          </v-img>
          <v-card-text>
            <div>
              <span class="info--text">{{ event.start | dateFormat }}</span> -
              <span class="success--text">{{ event.end | dateFormat }}</span>
              <span class="primary--text d-inline-block ml-5">{{ event.location }}</span>
            </div>
            <div>
              {{ event.description }}
            </div>
          </v-card-text>
          <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <v-btn class="primary"><v-icon>mdi-bookmark</v-icon>Join</v-btn>
            <v-btn class="primary"><v-icon>mdi-heart</v-icon>Interested</v-btn>
            <v-btn class="primary"><v-icon>mdi-share-variant</v-icon>Share</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DateFilters from '../mixins/filters.js';
export default {
  mixins: [DateFilters],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    event() {
      return this.$store.getters.loadedEvent(this.id);
    },
  },
};
</script>

<style></style>
