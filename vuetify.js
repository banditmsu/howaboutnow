// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
      themes: {
        light: {
          customColor: '#fff', // Replace with your custom color value
        },
      },
    },
  });