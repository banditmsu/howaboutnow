<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="10">
          <v-card-title class="headline">
            Register
          </v-card-title>
          <v-card-text>
            <form @submit.prevent="register">
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
              <v-btn type="submit" color="primary">Register</v-btn>
            </form>
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
      async register() {
        try {
          await auth.createUserWithEmailAndPassword(this.email, this.password);
          alert('Registration successful!');
        } catch (error) {
          console.error('Error registering:', error);
        }
      },
    },
  };
  </script>
  