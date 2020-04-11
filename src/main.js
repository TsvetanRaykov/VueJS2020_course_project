import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import routes from "./router";
import store from "./store";
import dateFilter from "./filters/date";
import * as firebase from "firebase";
import Alert from "./components/shared/Alert";

const router = new VueRouter(routes);

Vue.use(VueRouter);
Vue.filter("date", dateFilter);
Vue.component("app-alert", Alert);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyDTpEYNM6XNokr3bZOghSCmQrVyX8ic-nw",
      authDomain: "eventour-63336.firebaseapp.com",
      databaseURL: "https://eventour-63336.firebaseio.com",
      projectId: "eventour-63336",
      storageBucket: "gs://eventour-63336.appspot.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoLogin", user);
      }
    });
    this.$store.dispatch("loadEvents");
  }
}).$mount("#app");
