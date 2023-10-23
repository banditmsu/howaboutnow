
import store from './store';
import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css"; // Add this line

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

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

