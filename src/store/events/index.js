import * as firebase from "firebase";

export default {
  state: {
    loadedEvents: []
  },
  mutations: {
    createEvent(state, payload) {
      state.loadedEvents.push(payload);
    },
    updateEvent(state, payload) {
      const event = state.loadedEvents.find(event => {
        return event.id === payload.id;
      });
      if (payload.title) {
        event.title = payload.title;
      }
      if (payload.location) {
        event.location = payload.location;
      }
      if (payload.description) {
        event.description = payload.description;
      }
      if (payload.start) {
        event.start = payload.start;
      }
      if (payload.end) {
        event.end = payload.end;
      }
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
        })
        .finally(() => commit("setLoading", false));
    },
    updateEvent({ commit }, payload) {
      commit("setLoading", true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.location) {
        updateObj.location = payload.location;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.start) {
        updateObj.start = payload.start;
      }
      if (payload.end) {
        updateObj.end = payload.end;
      }
      if (Object.keys(updateObj).length > 0) {
        firebase
          .database()
          .ref("events")
          .child(payload.id)
          .update(updateObj)
          .then(() => {
            commit("updateEvent", payload);
          })
          .catch(error => commit("setError", error))
          .finally(() => commit("setLoading", false));
      }
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
    }
  }
};
