import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import GoalsList from '../components/GoalsList.vue';
import GoalsForm from '../components/GoalsForm.vue';

// Removed Vue.use(VueRouter) since it's not needed in Vue 3

const routes = [
  {
    path: '/home',
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
  { path: '/goals-form', name: 'GoalsForm', component: GoalsForm },
  { path: '/goals-list', name: 'GoalsList', component: GoalsList },
  // Add more routes as needed
];

// Using createRouter method and createWebHistory for history mode
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
