<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="6" class="text-center text-sm-right">
        <v-btn large to="/events" class="info">Explore Events</v-btn>
      </v-col>
      <v-col xs="12" sm="6" class="text-center text-sm-left">
        <v-btn large to="/events/create" class="info">Create Event</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item v-for="event in events" :key="event.id" :src="event.imageUrl">
            <div class="title">{{event.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">Visit our events!</v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    events: [
      {
        imageUrl: "https://i.ebayimg.com/images/g/vg4AAOSwfVpYpiI2/s-l1600.jpg",
        id: "123",
        title: "Concert Metallica"
      },
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/7/74/Gavel_%288890290708%29.jpg",
        id: "124",
        title: "Corporate Banquet"
      },
      {
        imageUrl:
          "https://previews.123rf.com/images/halfpoint/halfpoint1511/halfpoint151100189/47410071-beautiful-young-couple-on-a-walk-in-autumn-forest.jpg",
        id: "125",
        title: "Mountain Hike"
      }
    ]
  })
};
</script>
<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 2em !important;
}
</style>