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
        .then(async data => {
          commit("clearError");
          const { user } = data;
          if (user) {
            const fileName = payload.image.name;
            const ext = fileName.slice(fileName.lastIndexOf("."));
            try {
              const imageData = await firebase
                .storage()
                .ref(`users/${user.uid}${ext}`)
                .put(payload.image);
              const imageUrl = await imageData.metadata.ref.getDownloadURL();
              await user.updateProfile({
                displayName: payload.name,
                photoURL: imageUrl
              });
              const newUser = {
                id: user.uid,
                email: user.email,
                photoURL: user.photoURL,
                name: user.displayName,
                eventsJoined: [],
                eventsInterested: [],
                eventsCreated: [],
                fbKeys: {}
              };
              commit("setUser", newUser);
            } catch (error) {
              console.error(error);
            }
          }
        })
        .catch(error => {
          commit("setError", error);
          console.error(error.message);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    async updateUser({ commit }, payload) {
      const user = firebase.auth().currentUser;

      if (!user) {
        return;
      }
      commit("setLoading", true);
      try {
        const updateUser = {};
        let imageUrl = null;
        if (payload.image) {
          const fileName = payload.image.name;
          const ext = fileName.slice(fileName.lastIndexOf("."));
          const imageData = await firebase
            .storage()
            .ref(`users/${user.id}${ext}`)
            .put(payload.image);
          imageUrl = await imageData.metadata.ref.getDownloadURL();
        }
        if (imageUrl) {
          updateUser.photoURL = imageUrl;
        }
        if (payload.name) {
          updateUser.displayName = payload.name;
        }
        if (payload.password) {
          await firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.currentPassword)
            .then(async data => {
              const { user } = data;
              await user.updatePassword(payload.password);
            });
        }
        await user.updateProfile(updateUser);
        const newUser = {
          id: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          name: user.displayName,
          eventsJoined: [],
          eventsInterested: [],
          eventsCreated: [],
          fbKeys: {}
        };
        commit("setUser", newUser);
      } catch (error) {
        console.error(error);
      }
      commit("setLoading", false);
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
            email: user.email,
            photoURL: user.photoURL,
            name: user.displayName,
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
        email: payload.email,
        photoURL: payload.photoURL,
        name: payload.displayName,
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
