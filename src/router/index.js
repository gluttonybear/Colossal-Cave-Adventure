import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from '../views/LogIn.vue'
import Register from '../views/Register.vue'
import Change from '../views/Change.vue'
import Game from '../views/Game.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/change',
    name: 'Change',
    component: Change
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
