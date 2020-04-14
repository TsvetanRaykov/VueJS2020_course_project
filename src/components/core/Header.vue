<template>
  <v-container>
    <header>
      <v-navigation-drawer v-model="sideNav" absolute temporary>
        <v-list-item v-if="isAuth">
          <v-list-item-avatar v-if="user.photoURL">
            <v-img
              :src="user.photoURL"
              class="pointer"
              @click="navigate('/user/profile')"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            @click="navigate(item.url)"
          >
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
        <v-app-bar-nav-icon
          @click.stop="sideNav = !sideNav"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link tag="span" to="/" class="pointer">EventOur</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-item-group class="hidden-sm-and-down">
          <span v-for="item in menuItems" :key="item.title">
            <top-menu-item :count="item.count">
              <v-btn
                color="white"
                class="text-capitalize"
                text
                rounded
                :to="item.url"
                @click="menuClick(item.title)"
                exact
              >
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-btn>
            </top-menu-item>
          </span>
          <v-tooltip bottom color="info" v-if="isAuth">
            <template v-slot:activator="{ on }">
              <router-link to="/user/profile">
                <v-avatar v-on="on">
                  <img :src="user.photoURL" :alt="user.name" />
                </v-avatar>
              </router-link>
            </template>
            <div>
              {{ user.name }} <br />
              {{ user.email }}
            </div>
          </v-tooltip>
        </v-item-group>
      </v-app-bar>
    </header>
    <v-row class="row-alert">
      <v-col cols="12">
        <app-alert
          v-if="error"
          @dismissed="alertDismissHandler"
          :text="error.message"
        ></app-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import TopMenuItem from "./TopMenuItem";
export default {
  components: { TopMenuItem },
  data() {
    return {
      sideNav: false
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/").catch(() => {});
    },
    navigate(url) {
      if (url === "logout") {
        this.logOut();
        return;
      }
      this.$router.push(url).catch(() => {});
    },
    alertDismissHandler() {
      this.$store.dispatch("clearError");
    },
    menuClick(title) {
      if (title === "Log out") {
        this.logOut();
      }
    }
  },
  computed: {
    isAuth() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    user() {
      return this.$store.getters.user || { email: "", avatarUrl: "" };
    },
    menuItems() {
      // common items
      const items = [
        {
          title: "Events",
          icon: "mdi-clipboard-play-multiple-outline",
          url: "/events",
          count: this.eventsCount
        }
      ];
      return items.concat(
        this.isAuth
          ? [
              // auth items
              {
                title: "Joined",
                icon: "mdi-clipboard-check-multiple-outline",
                url: "/events/joined",
                count: 0
              },
              {
                title: "Create Event",
                icon: "mdi-clipboard-plus-outline",
                url: "/events/create"
              },
              {
                title: "Log out",
                icon: "mdi-account-off-outline",
                url: "logout"
              }
            ]
          : [
              // guest items
              {
                title: "Log in",
                icon: "mdi-account-arrow-right",
                url: "/user/login"
              }
            ]
      );
    },
    error() {
      return this.$store.getters.error;
    },
    eventsCount() {
      return this.$store.getters.loadedEvents.length;
    }
  }
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
.row-alert {
  height: 30px;
  margin: 50px 0 -50px;
}
</style>
