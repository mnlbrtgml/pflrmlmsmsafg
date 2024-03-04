import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import HomeView from "@/views/home/IndexView.vue";
import ParametersView from "@/views/parameters/IndexView.vue";
import GraphsView from "@/views/graphs/IndexView.vue";
import ProfileView from "@/views/profile/IndexView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: { requiresAuth: true },
      component: HomeView,
    },
    {
      path: "/parameters",
      name: "parameters",
      meta: { requiresAuth: true },
      component: ParametersView,
    },
    {
      path: "/graphs",
      name: "graphs",
      meta: { requiresAuth: true },
      component: GraphsView,
    },
    {
      path: "/profile",
      name: "profile",
      meta: { requiresAuth: true },
      component: ProfileView,
    },
    {
      path: "/signin",
      name: "signin",
      meta: { requiresAuth: false },
      component: () => import("@/views/auth/signin/IndexView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      meta: { requiresAuth: false },
      component: () => import("@/views/auth/signup/IndexView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      meta: { requiresAuth: false },
      component: () => import("@/views/404/IndexView.vue"),
    },
  ],
});

router.beforeEach((to, _, next) => {
  onAuthStateChanged(auth, async (user) => {
    const isAuthenticated = !!user;
    const requiresAuth = to.meta.requiresAuth;
    const name = to.name;

    if (requiresAuth && isAuthenticated) {
      next();
    } else if (requiresAuth && !isAuthenticated) {
      next({ name: "signin" });
    } else if (!requiresAuth && isAuthenticated && name === "signin") {
      next({ name: "home" });
    } else {
      next();
    }
  });
});

export default router;
