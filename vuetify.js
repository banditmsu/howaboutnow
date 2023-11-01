// src/plugins/vuetify.js

import vue from 'vue'
import vuetify from 'vuetify/lib'

vue.use(vuetify)

export default new vuetify({
    theme: {
      themes: {
        light: {
          primary: '#fff', // Replace with your custom color value
        },
      },
    },
  });