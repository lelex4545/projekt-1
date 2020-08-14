<template>
  <div id="app">
    
    <span id="log" v-if="loginVar"><LogIn/></span>
    <span v-else><Home/></span>
    <button @click="loginVar=!loginVar">Change Screen</button>
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

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; 
  color: #ffffff;
  height: 100%;
  width: 100%;
  margin: 0em;
}
html{
  margin: 0;
  padding: 0;
}
body {
  /*background-color: lightgray;/* #2c3e50;*/
  margin: 0em;
  padding: 0em;
  height: 100%;
  width: 100%;
}

.canttouchme {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>