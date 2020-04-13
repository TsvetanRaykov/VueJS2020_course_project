import Vue from "vue";
import Vuex from "vuex";
import events from "./events";
import user from "./user";
import shared from "./shared";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    events,
    user,
    shared
  }
});
