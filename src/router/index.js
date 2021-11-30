import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login",
      layout: "auth-layout",
    },
    component: () => import("@/pages/RegistrationPage.vue"),
  },
  {
    path: "/",
    name: "AccountPage",
    meta: {
      title: "Account",
      layout: "main-layout",
    },
    component: () => import("@/pages/AccountPage.vue"),
  },

  {
    path: "/tasks",
    name: "tasks",
    meta: {
      title: "Задания",
      layout: "main-layout",
    },
    component: () => import("@/pages/TaskPage.vue"),
  },
  {
    path: "/employees",
    name: "employeees",
    meta: {
      title: "Сотрудники",
      layout: "main-layout",
    },
    component: () => import("@/pages/EmployeesPage.vue"),
  },
  {
    path: "/clients",
    name: "clients",
    meta: {
      title: "Клиенты",
      layout: "main-layout",
    },
    component: () => import("@/pages/ClientsPage.vue"),
  },
  {
    path: "/reports",
    name: "reports",
    meta: {
      title: "Отчёты",
      layout: "main-layout",
    },
    component: () => import("@/pages/ReportsPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const { accessToken } = localStorage;
  if (accessToken || to.name === "login") {
    next();
  } else {
    next("/login");
  }
});

export default router;
