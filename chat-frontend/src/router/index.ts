import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../components/Profile.vue";
import { useAuthStore } from "../store/auth";

const routes = [
  {
    path: "/",
    component: Home,
    //@ts-ignore
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated === false) {
        next("/login");
      } else {
        next();
      }
    },
  },

  { path: "/register", component: Register },
  { path: "/profile", component: Profile },

  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
