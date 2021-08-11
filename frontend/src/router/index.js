import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios';
import getHeader from '../getToken';
import { hostServer } from '../connections';
Vue.use(VueRouter)

function authUser(to, from, next) {
  if (localStorage.getItem('token') == undefined) {
    return next('/login');
  } else {
    axios.post(`${hostServer}/validate`, {}, getHeader()).then(() => {
      next();
    }).catch(error => {
      console.log(error);
      return next('/login')
    })
  }
}

const routes = [
  {
    path: '/Cadastro',
    name: 'Register',
    component:  () => import('../views/RegisterUser')
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    beforeEnter: authUser,
  },
  {
    path: '/',
    name: 'Redirect',
    component: () => import('../views/Redirect.vue'),
    beforeEnter: authUser
  },
  {
    path: '/EditPost',
    name: 'EditPost',
    component: () => import ('../views/EditPost.vue'),
    beforeEnter: authUser
  },
  {
    path: '/EditProfile',
    name: 'EditProfile',
    component: () => import('../views/EditProfile.vue'),
    beforeEnter: authUser
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    beforeEnter: authUser,
  },
  {
    path: '/MyPosts',
    name: 'MyPosts',
    component: () => import('../views/MyPosts.vue'),
    beforeEnter: authUser,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
