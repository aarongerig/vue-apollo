import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rocket/:id',
    name: 'Rocket',
    component: () => import(/* webpackChunkName: "rocket" */ '@/views/Rocket')
  },
  {
    path: '/rockets',
    name: 'Rockets',
    component: () => import(/* webpackChunkName: "rockets" */ '@/views/Rockets')
  },
  {
    path: '/users',
    name: 'Users',
    component: () =>
      import(/* webpackChunkName: "users" */ '@/views/Users')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
