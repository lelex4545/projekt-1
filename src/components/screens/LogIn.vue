<template>
  <div>
    <div class="tile" id="container1">
      <form class="formular">
        LogIn <input type="text" id="textAcc" name="textAcc"><br>
        Passwort <input type="text" id="textPw" name="textPw"><br>
      </form>
      <div id="container2">
        <Button name="Anmelden" url="http://www.fh-dortmund.de" />
      </div>
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
#container1{
  display: flex;
  border-radius: 1rem;
  background-color: #009a93;

  padding: 2rem 2rem;
  margin: 1rem;
  width: 40rem;
  height: 20rem;
  flex-flow: column nowrap;
  justify-content: center;
  
}
#container2{
  display: flex;
  justify-content: flex-end;
}
.tile {
  font-size: 1rem;
  color: #fff;
  letter-spacing: 0.1rem;

  transition: all 0.3s;
  /*position: relative;*/
  overflow: hidden;
}



</style>