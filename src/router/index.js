import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue'; // Import your Home component
import Register from '../components/Register.vue'; // Import your Register component
import Login from '../components/Login.vue'; // Import your Login component

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  // Add more routes as needed
];

const router = new VueRouter({
  routes,
});

export default router;
