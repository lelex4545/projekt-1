<template>
  <div>
    <div class="tile" id="draggable">
      <Button name="Anmelden" url="http://www.fh-dortmund.de" />
      <Button name="Registrieren" url="http://www.vuejs.de" />
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
.tile {
  display: inline-block;

  margin: 5rem;
  padding: 12rem 18rem;
  border-radius: 1rem;
  background-color: #009a93;

  text-transform: uppercase;
  font-size: 1rem;
  color: #fff;
  letter-spacing: 0.1rem;

  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}
</style>