<template>
  <div id="main">
    <div class="tile" id="container">
      <form id="textAcc">
        Name: <input type="text"  name="textAcc" />
      </form>
      <form id="textPw">
        Passwort: <input type="text"  name="textPw" />
      </form>
      
      <Button id="anmelden" name="Anmelden" url="http://www.fh-dortmund.de" />
      
      <a id="pwv" href="test.com">Passwort vergessen?</a>
      <a id="reg" href="test.com">Registrieren</a>
    </div>
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

<style>
#container {
  display: grid;
  grid-template-areas:
    "name name name"
    "pass pass pass"
    ". . anm"
    ". pwv reg";
  grid-auto-columns: 20% 50% 30%;
  grid-auto-rows: 35% 35% 20% 10%;
  
}

#anmelden {
  grid-area: anm;
}
input{
  border: .1rem solid #025a56;
  border-radius: .8rem;
  background-color: #037c76;
  color: white;
}
#textAcc {
  grid-area: name;
}
#textPw {
  grid-area: pass;
}
#reg{
  grid-area: reg;
  font-size: 60%;
  color: white;
  text-align: end;
  margin-top: 0.75rem;
  
}
#pwv{
  grid-area: pwv;
  font-size: 60%;
  color: white;
  text-align: end;
  margin-top: 0.75rem;
  margin-left: 0.5rem;
}

.tile {
  border-radius: 1em;
  background-color: #009a93;

  padding: 20px;
  width: 350px;
  height: 150px;

  
  font-size: 1rem;
  letter-spacing: 0.1rem;
  transition: all 0.3s;
}
</style>