// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/authentication/Login.vue";
import Signup from "../components/authentication/Signup.vue";
import TasksPage from "../page/TasksPage.vue";
import store from "../store";

const routes = [
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  {
    path: "/tasks",
    component: TasksPage,
    meta: { requiresAuth: true },
  },
  { path: "/", redirect: "/login" },
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
