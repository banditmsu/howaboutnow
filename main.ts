import { createApp } from 'vue';
import App from './src/App.vue'
import router from './src/router/index.ts'
import store from './src/store/index.ts'
import { createVuetify } from 'vuetify';
import GoalsForm from './src/components/GoalsForm.vue';
import GoalsList from './src/components/GoalsList.vue';

// Define your Vuetify options here
const vuetifyOptions = {
  theme: {
    dark: true, // You can toggle this for dark mode
    themes: {
      light: {
        primary: '#4CAF50', // green
        secondary: '#FFC107', // amber
        accent: '#9C27B0', // purple
        error: '#FF5722', // deep orange
        warning: '#FFEB3B', // yellow
        info: '#2196F3', // blue
        success: '#4CAF50' // green
      },
      dark: {
        primary: '#81C784', // light green
        secondary: '#FFD54F', // light amber
        accent: '#BA68C8', // light purple
        // ... (you can continue or modify as per your requirements)
      }
    }
  },
  icons: {
    iconfont: 'mdi',  // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  components: {
    GoalsForm,
    GoalsList
 // ... Other components
  },
  lang: {
    current: 'en',  // Default language
  }
  // ... other Vuetify options
};



const app = createApp(App, {
});
const vuetify = createVuetify(vuetifyOptions);

// Registering global components
app.component('GoalsForm', GoalsForm);
app.component('GoalsList', GoalsList);
app.component('VCardTitle', VCardTitle);
app.component('VTextField', VTextField);
app.component('VBtn', VBtn);
app.component('VCard', VCard);
app.component('VCardText', VCardText);
app.component('VForm', VForm);
app.component('VLayout', VLayout);
app.component('VDataTable', VDataTable);
app.component('VCol', VCol);
app.component('VRow', VRow);
app.component('VSnackbar', VSnackbar);
app.component('VDataTable', VDataTable);

app.use(vuetify)
  .use(router)
  .use(store)
  .mount('#app');
// Only use these if you have them set up in your project
