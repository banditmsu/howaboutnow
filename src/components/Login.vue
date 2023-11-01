<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card elevation="10" class="login-card"> <!-- Apply elevation for a pop effect -->
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
              <v-btn type="submit" color="primary" class="login-button">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { getAuth } from 'firebase/auth';
  import { gsap } from 'gsap';
export default {
  mounted() {
    // Use GSAP to animate the login card
    gsap.from('.login-card', {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: 'power2.inOut',
    });
  },
  methods: {
    async login() {
      try {
        await getAuth.signInWithEmailAndPassword(this.email, this.password);
        alert('Login successful!');
        this.$router.push({ name: 'Home' }); // Redirect to the Home route
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
  },
};

</script>
  
<style scoped>
.login-card {
  animation: slide-up 0.5s ease both;
}

.login-button {
  background-color: #3498db;
  color: #fff;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #2980b9;
}

@keyframes slide-up {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>