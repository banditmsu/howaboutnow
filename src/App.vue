<template>
  <div id="app">
    <nav class="navigation">
      <router-link to="/home" class="nav-link customColor">Home</router-link>
      <router-link to="/login" class="nav-link customColor">Login</router-link>
      <router-link to="/register" class="nav-link customColor">Register</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default( {
  name: 'App',
});
</script>

<style scoped>
/* Global styles */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}
/* Navigation styles */
.navigation {
  background-color: #3498db;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  color: #ffffff;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #2980b9;
}
.customColor {
  color: #ffffff !important;
}
</style>