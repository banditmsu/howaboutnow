<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card elevation="10"> <!-- Apply elevation for a pop effect -->
          <v-card-title class="headline primary">
            Login
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                outlined
              ></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import auth from '@/firebase/auth';
  import $router from '@/router';

export default {
  // ...

  methods: {
    async login() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        alert('Login successful!');
        this.$router.push({ name: 'Home' }); // Redirect to the Home route
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
  },
};

</script>
  