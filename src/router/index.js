import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'

Vue.use(VueRouter)
Vue.use(VueCookies)
const routes = [
  {
    path: '/',
    name: 'LogIn',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/screens/LogIn.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../components/screens/Home.vue'),
    props: true,
  },
  {
    path: '/netz',
    name: 'NetzScreen',
    component: () => import(/* webpackChunkName: "about" */ '../components/screens/NetzScreen.vue'),
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
