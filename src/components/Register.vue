<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <label>Email: <input v-model="email" type="email" required></label>
        <label>Password: <input v-model="password" type="password" required></label>
        <button type="submit">Register</button>
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
  