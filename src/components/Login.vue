<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label>Email: <input v-model="email" type="email" required></label>
        <label>Password: <input v-model="password" type="password" required></label>
        <button type="submit">Login</button>
      </form>
    </div>
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
  