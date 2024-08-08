import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ProCureMent',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/AddInfo',
    name: 'AddInfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AddinfoView.vue')
  },
  {
    path: '/JobIn',
    name: 'JonIn',
    component: () => import('../views/JobInView.vue')
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/SignUpPage',
    name: 'SignUpPage',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/ForgotPage',
    name: 'ForgotPage',
    component: () => import('../views/ForgotView.vue')
  },
  {
    path: '/TaskDetail',
    name: 'TaskDetail',
    props: true, // เปิดการส่ง props
    component: () => import('../views/TaskDetailView.vue')
  },
  {
    path: '/EditSub',
    name: 'EditSub',
    props: true, // เปิดการส่ง props
    component: () => import('../views/EditSubView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
