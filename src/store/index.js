import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        loadedEvents:[
            {
                imageUrl: 'https://i.ebayimg.com/images/g/vg4AAOSwfVpYpiI2/s-l1600.jpg',
                id: '123',
                title: 'Concert Metallica',
                location: 'Somewhere',
                start: 1601719200,
                end: 1601719200,
              },
              {
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Gavel_%288890290708%29.jpg',
                id: '124',
                title: 'Corporate Banquet',
                location: 'Somewhere',
                start: 1601719200,
                end: 1601719200,
              },
              {
                imageUrl:
                  'https://previews.123rf.com/images/halfpoint/halfpoint1511/halfpoint151100189/47410071-beautiful-young-couple-on-a-walk-in-autumn-forest.jpg',
                id: '125',
                title: 'Mountain Hike',
                location: 'Somewhere',
                start: 1601719200,
                end: 1601719200,
              },
              {
                imageUrl:
                  'https://previews.123rf.com/images/halfpoint/halfpoint1511/halfpoint151100189/47410071-beautiful-young-couple-on-a-walk-in-autumn-forest.jpg',
                id: '126',
                title: 'Mountain Hike',
                location: 'Somewhere',
                start: 1601719200,
                end: 1601719200,
              },
        ],
        user: null
    },
    mutations:{
      createEvent(state, payload){
        state.loadedEvents.push(payload);
      },
      setUser(state, payload){
        state.user = payload;
      }
    },
    actions:{
      createEvent({commit}, payload){
        const event = {
          title: payload.title,
          location: payload.location,
          imageUrl: payload.imageUrl,
          description: payload.description,
          start: payload.start,
          end: payload.end,
          id: 'werrqfsdv'
        }
        commit('createEvent', event);
      },
      registerUser({commit}, payload){
        firebase.auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(data=>{
          const { user } = data;
          const newUser = {
            id: user.uid,
            eventsJoined: [],
            eventsInterested: [],
            eventsCreated: [],
          }
          commit('setUser', newUser)
        })
        .catch(console.error);
      }
    },
    getters:{
        loadedEvents(state){
            return state.loadedEvents.sort((a, b)=>{
                return a.start - b.start; 
            })
        },
        featuredEvents(state, getters){
            return getters.loadedEvents.slice(0, 5)
        },
        loadedEvent(state){
            return (eventId) =>{
                return state.loadedEvents.find((event)=>{
                    return event.id===eventId;
                });
            };
        },
        user(state){
          return state.user;
        }
    }
})