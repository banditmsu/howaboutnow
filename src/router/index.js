import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue'; // Import your Home component
import Register from '../components/Register.vue'; // Import your Register component
import Login from '../components/Login.vue'; // Import your Login component
import GoalsList from  '../components/GoalsList.vue';
import GoalsForm from '../components/GoalsForm.vue';

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
  { path: '/goals-form', name: 'goals-form', component: GoalsForm }, // Route to GoalsForm.vue
  { path: '/goals-list',name: 'goals-list', component: GoalsList }, // Route to GoalsList.vue
  // Add more routes as needed
];

const router = new VueRouter({
  routes,
});

export default router;
