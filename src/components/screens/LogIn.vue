<template>
  <div id="main">
    <div id="container" class="conDesign">
      <p id = "p1">Name</p>
      <p id = "p2">Passwort</p>
      <form id="form">
        <input type="text" id="acc" name="acc" />
        <input type="password" id="pw" name="pw" />
      </form>
      <div id="anmelden">
        <Button id="anmelden1" name="Anmelden" url="http://www.fh-dortmund.de" />
      </div>
      <a id="pwv" href="test.com">Passwort vergessen?</a>
      <a id="reg" href="test.com">Registrieren</a>
    </div>

    <!--
    <br>

    <div id="container2" class="conDesign">
      
    </div>
    -->
  </div>
</template>

<script>
import Button from "./../Button";
export default {
  name: "LogIn",
  
  components: {
    Button
  }
  
};
</script>

<style lang="scss">
.conDesign{
  border-radius: 1em;
  background-color: #009a93;
  padding: 1em;
  width: 22em;
  height: 9em;
  font-size: 1.3em;
  letter-spacing: 0.1em;
  transition: all .65s;
}

#container {
  display: grid;
  grid-template-areas:
    "1 form form"
    "2 form form"
    ".  . anm"
    ". pwv reg";
  grid-auto-columns: 25% 40% 35%;
  grid-auto-rows: 30% 30% 25% 15%;
}

#anmelden {
  grid-area: anm;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1em;
}
#p1{
  grid-area: 1;
}
#p2{
  grid-area: 2;
}
#form {
  grid-area: form;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
#reg{
  display: flex;
  align-items: flex-end;
  justify-content: center;

  grid-area: reg;
  font-size: 60%;
  color: white;

  &:hover{
    color: black;
  }
}
#pwv{
  display: flex;
  align-items: flex-end;
  justify-content: center;
  
  grid-area: pwv;
  font-size: 60%;
  color: white;

  &:hover{
    color: black;
  }
}

$color: #037c76;
input{
  border: 1px solid #034d4a;
  border-radius: .5em;
  background-color: #037c76;
  color: white;
  width: 80%;
  height: 28%;
  text-align: center;
  font-size: .8em;

  &:focus{
    outline: none;
    background-color: darken(#037c76, 7%);
  }
}

form{
  display: flex;
  align-items: center;
  justify-content: center;
}

p{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media screen and (max-width:768px){
    #container{
        font-size: 1em;
    }
}

@media screen and (max-width:480px){
    #container{
        font-size: .75em;
    }
}
</style>