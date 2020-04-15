import Home from "@/components/Home";
import UserLogin from "@/components/user/Login";
import UserRegister from "@/components/user/Register";
import UserProfile from "@/components/user/Profile";
import EventsAll from "@/components/events/Events";
import EventsCreate from "@/components/events/Create";
import EventDetails from "@/components/events/Event";
import NotFound from "@/components/core/NotFound";
import AuthGuard from "@/router/auth-guard";

const routes = [
  { path: "/", component: Home },
  { path: "/user/login", component: UserLogin },
  { path: "/user/register", component: UserRegister },
  { path: "/user/profile", component: UserProfile, beforeEnter: AuthGuard },
  { path: "/events/create", component: EventsCreate, beforeEnter: AuthGuard },
  {
    path: "/events/joined",
    component: EventsAll,
    props: { joined: true },
    beforeEnter: AuthGuard
  },
  { path: "/events/:id", component: EventDetails, props: true },
  { path: "/events", component: EventsAll },
  { path: "*", component: NotFound }
];

export default {
  // mode: "history",
  routes
};
