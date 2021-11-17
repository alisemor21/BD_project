import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'loginPage',
    meta: {
      title: 'RegistrationPage'
    },
    component: () => import('@/pages/RegistrationPage.vue')
  },
  {
    path: '/',
    name: 'accountPage',
    meta: {
      title: 'AccountPage'
    },
    component: () => import('@/pages/AccountPage.vue')
  },
  
  {
    path: '/tasks',
    name: 'Задания',
    meta: {
      title: 'Задания'
    },
    component: () => import('@/pages/TaskPage.vue')
  },
  {
    path: '/employees',
    name: 'Сотрудники',
    meta: {
      title: 'Сотрудники'
    },
    component: () => import('@/pages/EmployeesPage.vue')
  },
  {
    path: '/clients',
    name: 'Клиенты',
    meta: {
      title: 'Клиенты'
    },
    component: () => import('@/pages/ClientsPage.vue')
  },
  {
    path: '/reports',
    name: 'Отчёты',
    meta: {
      title: 'Отчёты'
    },
    component: () => import('@/pages/ReportsPage.vue')
  }
  
  
  


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router