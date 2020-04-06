<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h6>{{ event.title }}</h6>
          </v-card-title>
          <v-img :src="event.imageUrl" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="400px">
          </v-img>
          <v-card-text>
            <div class="info--text">{{ event.start }}</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur incidunt quidem quam distinctio tempore unde repudiandae
              fuga illo voluptas, dolorum, iusto nemo, voluptate molestias quod! Iusto ab sed nihil tempore.
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
export default {
  props: ['id'],
  computed: {
    event() {
      return this.$store.getters.loadedEvent(this.id);
    },
  },
};
</script>

<style></style>
