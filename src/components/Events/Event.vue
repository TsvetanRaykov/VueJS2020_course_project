<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h6>Concert Metallica</h6>
          </v-card-title>
          <v-img
            src="https://i.ebayimg.com/images/g/vg4AAOSwfVpYpiI2/s-l1600.jpg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          >
          </v-img>
          <v-card-text>
            <div class="info--text">19 January 1970 10:30 - 13:00 UTC</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, libero magni! Sequi veniam amet, nobis dolor quibusdam dolore!
              Voluptate amet debitis praesentium ex possimus explicabo suscipit alias accusantium quasi eos.
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
export default {};
</script>

<style></style>
