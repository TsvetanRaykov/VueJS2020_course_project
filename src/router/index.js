import VueRouter from 'vue-router';
import Home from '../components/Home';
import UserLogin from '../components/user/AppLogin';
import UserRegister from '../components/user/AppRegister';


const routes = [
    { path: '/', component: Home },
    { path: '/login', component: UserLogin },
    { path: '/register', component: UserRegister }
  ]

  export default new VueRouter({
    routes 
  })