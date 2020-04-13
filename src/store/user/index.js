import * as firebase from "firebase";

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    registerUserToEvent(state, payload) {
      const { id, fbKey } = payload;
      if (state.user.eventsJoined.includes(id)) {
        return;
      }
      state.user.eventsJoined.push(id);
      state.user.fbKeys[id] = fbKey;
    },
    unregisterUserFromEvent(state, payload) {
      const eventsJoined = state.user.eventsJoined;
      eventsJoined.splice(
        eventsJoined.findIndex(eventId => eventId === payload),
        1
      );
      delete state.user.fbKeys[payload];
    }
  },
  actions: {
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
            eventsCreated: [],
            fbKeys: {}
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
            eventsCreated: [],
            fbKeys: {}
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
    logoutUser({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    autoLogin({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        eventsJoined: [],
        eventsInterested: [],
        eventsCreated: [],
        fbKeys: {}
      });
    },
    fetchUserData({ commit, getters }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref(`/users/${getters.user.id}/joined/`)
        .once("value")
        .then(data => {
          const values = data.val();
          if (values) {
            const eventsJoined = [];
            const fbKeys = {};
            Object.entries(values).forEach(([key, val]) => {
              fbKeys[val] = key;
              eventsJoined.push(val);
            });
            commit("setUser", { ...getters.user, fbKeys, eventsJoined });
          }
        })
        .catch(error => commit("setError", error))
        .finally(() => commit("setLoading", false));
    },
    registerUserToEvent({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      firebase
        .database()
        .ref(`/users/${user.id}`)
        .child("joined")
        .push(payload)
        .then(data => {
          commit("registerUserToEvent", { id: payload, fbKey: data.key });
        })
        .catch(error => commit("setError", error))
        .finally(() => commit("setLoading", false));
    },
    unregisterUserFromEvent({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      if (!user.fbKeys) {
        return;
      }
      const fbKey = user.fbKeys[payload];
      firebase
        .database()
        .ref(`/users/${user.id}/joined/`)
        .child(fbKey)
        .remove()
        .then(() => {
          commit("unregisterUserFromEvent", payload);
        })
        .catch(error => commit("setError", error))
        .finally(() => commit("setLoading", false));
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
};
