import { createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/create-user',
    name: 'create-user',
    component: () => import('../views/CreateUserView.vue')
  },
  {
    path: '/post/create',
    name: 'crete-post',
    component: () => import('../views/CreatePostView.vue')
  },
]

export default function (history) {
  return createRouter({
    history, 
    routes
  })
}
