import Home from '../components/Home';
import UserLogin from '../components/user/AppLogin';
import UserRegister from '../components/user/AppRegister';
import EventsAll from '../components/Events/Events';
import EventsCreate from '../components/Events/Create';


const routes = [
    { path: '/', component: Home },
    { path: '/user/login', component: UserLogin },
    { path: '/user/register', component: UserRegister },
    { path: '/events/create', component: EventsCreate },
    { path: '/events', component: EventsAll }
  ]

  export default {
    mode: 'history',
    routes 
  }