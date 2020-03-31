<template>
  <header>
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="title">John Leider</v-list-item-title>
          <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" @click="navigate(item.url)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="sideNav=!sideNav" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>EventOur</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-item-group class="hidden-sm-and-down">
        <v-btn
          color="white"
          class="text-capitalize"
          text
          rounded
          v-for="item in items"
          :key="item.title"
          :to="item.url"
        >
          <v-icon>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-item-group>
    </v-app-bar>
  </header>
</template>
<script>
export default {
  data() {
    return {
      sideNav: false,
      items: [
        {
          title: "Events",
          icon: "mdi-clipboard-play-multiple-outline",
          url: "/"
        },
        {
          title: "Joined",
          icon: "mdi-clipboard-check-multiple-outline",
          url: "/joined"
        },
        {
          title: "Interested",
          icon: "mdi-clipboard-check-multiple",
          url: "/interested"
        },
        {
          title: "Create Event",
          icon: "mdi-clipboard-plus-outline",
          url: "/create"
        },
        { title: "Profile", icon: "mdi-account-details", url: "/profile" },
        { title: "Log out", icon: "mdi-account-off-outline", url: "" },
        { title: "Log in", icon: "mdi-account-arrow-right", url: "/login" }
      ]
    };
  },
  methods: {
    navigate(url) {
      this.$router.push(url).catch(() => {});
    }
  }
};
</script>