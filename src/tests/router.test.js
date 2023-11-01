// Import necessary modules
const { createLocalVue, mount } = require('vue-test-utils'); // Use vue-test-utils for Vue 2
const VueRouter = require('vue-router');
const Home = require('../views/Home.vue');
const Register = require('../components/Register.vue');
const Login = require('../components/Login.vue');
const GoalsList = require('../components/GoalsList.vue');
const GoalsForm = require('../components/GoalsForm.vue');

// Create a local Vue instance
const localVue = createLocalVue();
localVue.use(VueRouter);

// Assuming you've defined your routes somewhere, import them
const routes = require('../router/routes');

describe('Router', () => {
  it('should render Home component for /home route', () => {
    const router = new VueRouter({ routes });
    const wrapper = mount(Home, { localVue, router });

    router.push('/home');
    expect(wrapper.find(Home).exists()).toBe(true);
  });

  it('should render Login component for /login route', () => {
    const router = new VueRouter({ routes });
    const wrapper = mount(Login, { localVue, router });

    router.push('/login');
    expect(wrapper.find(Login).exists()).toBe(true);
  });

  it('should render Register component for /register route', () => {
    const router = new VueRouter({ routes });
    const wrapper = mount(Register, { localVue, router });

    router.push('/register');
    expect(wrapper.find(Register).exists()).toBe(true);
  });

  it('should render GoalsForm component for /goals-form route', () => {
    const router = new VueRouter({ routes });
    const wrapper = mount(GoalsForm, { localVue, router });

    router.push('/goals-form');
    expect(wrapper.find(GoalsForm).exists()).toBe(true);
  });

  it('should render GoalsList component for /goals-list route', () => {
    const router = new VueRouter({ routes });
    const wrapper = mount(GoalsList, { localVue, router });

    router.push('/goals-list');
    expect(wrapper.find(GoalsList).exists()).toBe(true);
  });
});
