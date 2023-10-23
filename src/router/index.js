// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
];

const router = new VueRouter({
  routes,
});

export default router;
