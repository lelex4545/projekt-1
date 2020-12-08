<template>
  <div id="app">
    
    <span id="log" v-if="loginVar == 0"><LogIn @catcher2="catchData" /></span>
    <span v-if="loginVar == 1"> <Home :name="name" /> </span>
    <span v-if="loginVar == 2"> <TextEditor id = "myeditor"/> </span>
    <span v-if="loginVar == 3"> <NetzScreen/> </span>
    <div id="gay">
      <button class="autismusKnopf" @click="loginVar=0">Login</button>
      <button class="autismusKnopf" @click="loginVar=1">Home</button>
      <button class="autismusKnopf" @click="loginVar=2">Editor</button>
      <button class="autismusKnopf" @click="loginVar=3">Netz</button>
    </div>
  </div>
</template>

<script>
import LogIn from "./components/screens/LogIn"
import Home from "./components/screens/Home"
import TextEditor from "./components/screens/HomeComp/TextEditor"
import NetzScreen from "./components/screens/NetzScreen"

export default {
  name: 'App',
  components: {
    LogIn,
    TextEditor,
    Home,
    NetzScreen
  },
  data: () => ({
    loginVar: 0,
    name: "",
  }),
  methods: {
    catchData(value) {
      alert("Benutzername: "+value);
      this.name = value;
      this.loginVar = 1;
    }
  }
}
</script>

<style lang="scss">
#gay{
  margin: 10em;
}
#myeditor{
  margin-left: 400px;
  margin-top: 100px;
  border-radius: 30px;
  padding: 50px;
  background-color: white;
  color: black;
  width: 1000px;
  text-align: left;
}
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