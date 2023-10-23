<template>
  <div id="app">
    <nav class="navigation">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/register" class="nav-link">Register</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>
  
<style>
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
  color: #fff;
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
</style>