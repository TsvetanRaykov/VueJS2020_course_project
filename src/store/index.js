import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedEvents: [],
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
              end: obj[key].end,
              creatorId: obj[key].creatorId
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
    createEvent({ commit, getters }, payload) {
      commit("setLoading", true);
      const event = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        start: payload.start,
        end: payload.end,
        creatorId: getters.user.id
      };
      let imageUrl, key;
      firebase
        .database()
        .ref("events")
        .push(event)
        .then(data => {
          commit("clearError");
          key = data.key;
          return key;
        })
        .then(key => {
          const fileName = payload.image.name;
          const ext = fileName.slice(fileName.lastIndexOf("."));
          return firebase
            .storage()
            .ref(`events/${key}${ext}`)
            .put(payload.image);
        })
        .then(async data => {
          imageUrl = await data.metadata.ref.getDownloadURL();
          return firebase
            .database()
            .ref("events")
            .child(key)
            .update({ imageUrl });
        })
        .then(() => {
          commit("createEvent", { ...event, imageUrl, id: key });
        })
        .catch(error => {
          commit("setError", error);
          commit("setLoading", false);
          console.log(error);
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
      firebase.auth().signOut();
      commit("setUser", null);
    },
    autoLogin({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        eventsJoined: [],
        eventsInterested: [],
        eventsCreated: []
      });
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
