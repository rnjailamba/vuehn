<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-link to="/">Home</router-link>    
    <router-link to="/industriesupload">Upload Industries</router-link>    
    <router-link to="/industriesview">View All Industries</router-link>    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 50px;
  margin-left: 50px;
  
}
</style>
