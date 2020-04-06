import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import routes from './router';
import store from './store';
import dateFilter from './filters/date';
import * as firebase from 'firebase';


const router = new VueRouter(routes);
Vue.use(VueRouter);

Vue.filter('date', dateFilter);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: 'AIzaSyDTpEYNM6XNokr3bZOghSCmQrVyX8ic-nw',
      authDomain: 'eventour-63336.firebaseapp.com',
      databaseURL: 'https://eventour-63336.firebaseio.com',
      projectId: 'eventour-63336',
      storageBucket: '',  
    })
  }
}).$mount('#app')
