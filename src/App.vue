<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">LogIn</router-link> |
      <router-link to="/home">Home</router-link> |
      <router-link to="/netz">Netz</router-link> |
      <router-link to="/editor">Editor</router-link>  |
      <router-link to="/learningscreen">LearningScreen</router-link>
    </div>
    <router-view/>
  </div>
</template>

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

#nav {
  padding-right: 30px;
  position: absolute;
  z-index: 50;
  top: 0.85em;
  left: 18em;
  color: #2c3e50;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
html{
  margin: 0;
  padding: 0;
}
body {
  background-color: lightgray; // #2c3e50;
  margin: 0em;
  padding: 0em;
  height: 100%;
  width: 100%;
}
.canttouchme {   
  -webkit-touch-callout: none;  
  -webkit-user-select: none;   
  -khtml-user-select: none;    
  -moz-user-select: none;   
  -ms-user-select: none;    
  user-select: none;  
}
</style>
