<template>
  <div id="app">
    <button @click="loginVar=!loginVar">Change Screen</button>
    <span v-if="loginVar"><LogIn/></span>
    <span v-else><Home/></span>
  </div>
</template>

<script>
import LogIn from "./components/screens/LogIn"
import Home from "./components/screens/Home"
export default {
  name: 'App',
  components: {
    LogIn,
    Home
  },
  data: () => ({
    loginVar: true
  }),
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; 
  color: #ffffff;
  margin: 60px;
}
body {
  background-color: #2c3e50;
}
</style>