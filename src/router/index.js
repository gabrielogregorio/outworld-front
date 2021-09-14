import Home from '../views/Home.vue'
import axios from 'axios';
import getHeader from '../getToken';
import { hostServer } from '../connections';
import { createRouter, createWebHistory  } from "vue-router";


function authUser(to, from, next) {
  if (localStorage.getItem('token') == undefined) {
    return next('/login');
  } else {
    axios.post(`${hostServer}/validate`, {}, getHeader()).then(() => {
      next();
    }).catch(() => {
      return next('/login')
    })
  }
}

const router = createRouter({
  history: createWebHistory(),
	routes: [
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
    path: '/Save',
    name: 'Save',
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
    path: '/Messages',
    name: 'Messages',
    component: () => import ('../views/Messages.vue'),
    beforeEnter: authUser,
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
    path: '/Profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: authUser,
  }
]})

export default router
