<template>
  <div id="main">
    <div id="container">
      <p id = "p1">Name</p>
      <form id="textAcc">
        <input type="text"  name="textAcc" />
      </form>
      <p id = "p2">Passwort</p>
      <form id="textPw">
        <input type="password"  name="textPw" />
      </form>
      <div id="anmelden">
        <Button id="anmelden1" name="Anmelden" url="http://www.fh-dortmund.de" />
      </div>
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

<style lang="scss">
#container {
  display: grid;
  grid-template-areas:
    "1 name name"
    "2 pass pass"
    ".  . anm"
    ". pwv reg";
  grid-auto-columns: 25% 40% 35%;
  grid-auto-rows: 30% 30% 25% 15%;

  border-radius: 1em;
  background-color: #009a93;
  padding: 1em;
  width: 22em;
  height: 9em;
  font-size: 1.3em;
  letter-spacing: 0.1em;
  transition: all 0.3s;
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
#textAcc {
  grid-area: name;
}
#textPw {
  grid-area: pass;
}
#reg{
  display: flex;
  align-items: flex-end;
  justify-content: center;

  grid-area: reg;
  font-size: 60%;
  color: white;
  text-align: end;
}
#pwv{
  display: flex;
  align-items: flex-end;
  justify-content: center;
  
  grid-area: pwv;
  font-size: 60%;
  color: white;
  text-align: end;
}

$color: #037c76;
input{
  border: 1px solid #034d4a;
  border-radius: .5em;
  background-color: #037c76;
  color: white;
  width: 80%;
  height: 50%;
  text-align: center;

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
</style>