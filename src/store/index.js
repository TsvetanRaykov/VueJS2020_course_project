import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedEvents: [
      {
        imageUrl: "https://i.ebayimg.com/images/g/vg4AAOSwfVpYpiI2/s-l1600.jpg",
        id: "123",
        title: "Concert Metallica",
        location: "Somewhere",
        start: 1601719200,
        end: 1601719200
      },
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/7/74/Gavel_%288890290708%29.jpg",
        id: "124",
        title: "Corporate Banquet",
        location: "Somewhere",
        start: 1601719200,
        end: 1601719200
      },
      {
        imageUrl:
          "https://previews.123rf.com/images/halfpoint/halfpoint1511/halfpoint151100189/47410071-beautiful-young-couple-on-a-walk-in-autumn-forest.jpg",
        id: "125",
        title: "Mountain Hike",
        location: "Somewhere",
        start: 1601719200,
        end: 1601719200
      },
      {
        imageUrl:
          "https://previews.123rf.com/images/halfpoint/halfpoint1511/halfpoint151100189/47410071-beautiful-young-couple-on-a-walk-in-autumn-forest.jpg",
        id: "126",
        title: "Mountain Hike",
        location: "Somewhere",
        start: 1601719200,
        end: 1601719200
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createEvent(state, payload) {
      state.loadedEvents.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setLoadedEvents(state, payload) {
      state.loadedEvents = payload;
    }
  },
  actions: {
    loadEvents({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("events")
        .once("value")
        .then(data => {
          commit("clearError");
          const events = [];
          const obj = data.val();
          for (const key in obj) {
            events.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              start: obj[key].start,
              end: obj[key].end
            });
          }
          commit("setLoadedEvents", events);
        })
        .catch(error => {
          commit("setError", error);
          console.log(error);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    createEvent({ commit }, payload) {
      commit("setLoading", true);
      const event = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        start: payload.start,
        end: payload.end
      };
      firebase
        .database()
        .ref("events")
        .push(event)
        .then(data => {
          commit("clearError");
          const id = data.key;
          commit("createEvent", { ...event, id });
        })
        .catch(error => {
          commit("setError", error);
          console.log(error);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    registerUser({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          commit("clearError");
          const { user } = data;
          const newUser = {
            id: user.uid,
            eventsJoined: [],
            eventsInterested: [],
            eventsCreated: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setError", error);
          console.error(error.message);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    loginUser({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          commit("clearError");
          const { user } = data;
          const newUser = {
            id: user.uid,
            eventsJoined: [],
            eventsInterested: [],
            eventsCreated: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setError", error);
          console.error(error.message);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    clearError({ commit }) {
      commit("clearError");
    },
    logoutUser({ commit }) {
      commit("setUser", null);
    }
  },
  getters: {
    loadedEvents(state) {
      return state.loadedEvents.sort((a, b) => {
        return a.start - b.start;
      });
    },
    featuredEvents(state, getters) {
      return getters.loadedEvents.slice(0, 5);
    },
    loadedEvent(state) {
      return eventId => {
        return state.loadedEvents.find(event => {
          return event.id === eventId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    }
  }
});
