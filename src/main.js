// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "vuetify/dist/vuetify.min.css"; // Add this line
import Vuetify from 'vuetify';

Vue.use(Vuetify);

new Vue({
  render: (h) => h(App),
  router,
  store,
  Vuetify,
}).$mount('#app');

const opts = {
  theme: {
    dark: false
  },
  options: {
    customProperties: true
  },
  icons: {
    iconfont: "mdi"
  }
};

export default new Vuetify(opts);