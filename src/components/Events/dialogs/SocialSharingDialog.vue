<template>
  <v-row justify="center">
    <v-btn v-if="isIcon" icon @click.stop="dialog = true" class="primary--text">
      <v-icon>mdi-share-variant</v-icon></v-btn
    >
    <v-btn v-else class="primary" dark @click.stop="dialog = true">
      <v-icon>mdi-share-variant</v-icon>Share
    </v-btn>
    <v-dialog v-model="dialog" max-width="390">
      <v-card>
        <v-card-title class="headline">Share this Event?</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" class="text-no-wrap">
              <share-it :url="shareUrl" :share-config="iconConfig" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    shareUrl: {
      type: String,
      default: () => window.location.href
    },
    isIcon: { type: Boolean, default: false }
  },
  data() {
    return {
      dialog: false,
      iconConfig: {
        twitter: {
          icon: true,
          size: "sm",
          color: "#333",
          round: true,
          backgroundColor: "yellow"
        },
        linkedin: {
          icon: true,
          size: "lg",
          outline: true,
          round: true
        },
        whatsapp: {
          icon: true,
          size: "2x",
          outline: true,
          round: true
        },
        facebook: {
          icon: true,
          size: "3x",
          outline: true,
          round: true
        },

        reddit: {
          icon: true,
          size: "4x",
          outline: true,
          round: true
        }
      }
    };
  }
};
</script>

<style></style>
