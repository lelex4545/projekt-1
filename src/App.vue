<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login">LogIn</router-link> |
      <router-link to="/">Home</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#buttonContainer{
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
  //color: #ffffff;
  height: 100%;
  width: 100%;
  margin: 0em;
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
