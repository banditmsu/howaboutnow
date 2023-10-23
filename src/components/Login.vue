<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import auth from '@/firebase/auth';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          await auth.signInWithEmailAndPassword(this.email, this.password);
          alert('Login successful!');
        } catch (error) {
          console.error('Error logging in:', error);
        }
      },
    },
  };
  </script>
  