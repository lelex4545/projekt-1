<template>
  <div id="app">
    <LogIn />
  </div>
</template>

<script>
import LogIn from "./components/screens/LogIn"

export default {
  name: 'App',
  components: {
    LogIn
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; 
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: #2c3e50;
}
</style>