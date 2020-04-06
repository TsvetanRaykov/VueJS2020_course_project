import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        loadedEvents:[
            {
                imageUrl: 'https://i.ebayimg.com/images/g/vg4AAOSwfVpYpiI2/s-l1600.jpg',
                id: '123',
                title: 'Concert Metallica',
                start: 1601719200,
                end: 1601719200,
              },
              {
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Gavel_%288890290708%29.jpg',
                id: '124',
                title: 'Corporate Banquet',
                start: 1601719200,
                end: 1601719200,
              },
              {
                imageUrl:
                  'https://previews.123rf.com/images/halfpoint/halfpoint1511/halfpoint151100189/47410071-beautiful-young-couple-on-a-walk-in-autumn-forest.jpg',
                id: '125',
                title: 'Mountain Hike',
                start: 1601719200,
                end: 1601719200,
              },
              {
                imageUrl:
                  'https://previews.123rf.com/images/halfpoint/halfpoint1511/halfpoint151100189/47410071-beautiful-young-couple-on-a-walk-in-autumn-forest.jpg',
                id: '126',
                title: 'Mountain Hike',
                start: 1601719200,
                end: 1601719200,
              },
        ],
        user:{
            id: '',
            eventsJoined: [],
            eventsInterested: [],
            eventsCreated: [],
        }
    },
    mutations:{},
    actions:{},
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
        }
    }
})