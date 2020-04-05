<template>
  <v-container>
    <v-row>
      <v-col colls="12">
        <v-container fluid>
          <v-row dense>
            <v-col v-for="event in events" :key="event.id" xs="12" sm="6" md="3">
              <!-- <v-hover>
                <template v-slot="{ hover }">
              <v-card :to="event | eventDetailsLink" :elevation="hover ? 18 : 6">-->
              <v-card>
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
                    <v-col xs="12" sm="6" md="12" lg="6" class="text-no-wrap text-left"
                      ><h4>{{ event.start | dateFormat }}</h4>
                    </v-col>
                    <v-col xs="12" sm="6" md="12" lg="6" class="text-no-wrap text-right"
                      ><h4>{{ event.end | dateFormat }}</h4></v-col
                    >
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn class="ma-2" outlined color="primary" :to="event | eventDetailsLink">Event Details</v-btn>
                  <v-spacer></v-spacer>

                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>

                  <v-btn icon class="hidden-md-only">
                    <v-icon>mdi-bookmark</v-icon>
                  </v-btn>

                  <v-btn icon class="hidden-md-only">
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
              <!-- </template> 
              </v-hover>-->
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DateFilters from '../mixins/filters.js';
export default {
  data: () => ({
    events: [
      {
        imageUrl: 'https://i.ebayimg.com/images/g/vg4AAOSwfVpYpiI2/s-l1600.jpg',
        id: '123',
        title: 'Concert Metallica',
        start: 1601719200,
        end: 1601719200,
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Gavel_%288890290708%29.jpg',
        id: '124',
        title: 'Corporate Banquet',
        start: 1601719200,
        end: 1601719200,
      },
      {
        imageUrl:
          'https://previews.123rf.com/images/halfpoint/halfpoint1511/halfpoint151100189/47410071-beautiful-young-couple-on-a-walk-in-autumn-forest.jpg',
        id: '125',
        title: 'Mountain Hike',
        start: 1601719200,
        end: 1601719200,
      },
      {
        imageUrl:
          'https://previews.123rf.com/images/halfpoint/halfpoint1511/halfpoint151100189/47410071-beautiful-young-couple-on-a-walk-in-autumn-forest.jpg',
        id: '126',
        title: 'Mountain Hike',
        start: 1601719200,
        end: 1601719200,
      },
    ],
  }),
  mixins: [DateFilters],
  filters: {
    eventDetailsLink(event) {
      return `/events/${event.id}`;
    },
  },
};
</script>

<style></style>
