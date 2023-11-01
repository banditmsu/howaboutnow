// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "vuetify/dist/vuetify.min.css"; // Add this line
import Vuetify from 'vuetify';
import GoalsForm from './components/GoalsForm.vue'; 
import GoalsList from './components/GoalsList.vue';

Vue.component('GoalsForm', GoalsForm);
Vue.component('GoalsList', GoalsList);

Vue.use(Vuetify);

new Vue({
  render: (h) => h(App),
  router,
  store,
  vuetify: new Vuetify(),
  data: {
    documents: [], 
  },
}).$mount('#app');

const opts = {
  theme: {
    dark: false,
  },
  options: {
    customProperties: true
  },
  icons: {
    iconfont: "mdi"
  }
};

export default new Vuetify(opts);