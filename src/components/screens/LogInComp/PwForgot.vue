<template>
    <div id="pwScreen" class="conDesign" ref="draggableContainer" @mousedown="dragEvent">
            <p id="pwTitle">Passwort vergessen</p>
            <p id="elem1">Email Adresse eingeben</p>
        <form>
            <input type="text">
        </form>
        <Button id="absPw" name="Absenden"/>
    </div>
</template>

<script>
import Button from "./Button";
export default {
    name: "PWForget",
    components: {
    Button
  },
  data: () => ({
      positions: {
          clientX: undefined,
          clientY: undefined,
          movementX: 0,
          movementY: 0,
      }
  }),
  mounted(){
    this.$nextTick(function() {
      window.addEventListener('resize', this.stayOnScreenRight);
      window.addEventListener('resize', this.stayOnScreenBottom);
    })
  },
  methods: {
      dragEvent() {
          this.$emit('dragEvent', this, event, document)
      }
  }
}
</script>

<style>
#pwScreen{
    display: grid;
    grid-template-areas: 
        "t t"
        "n i"
        ". a";
    grid-auto-columns: 25% 75%;
    grid-auto-rows: 25% 50% 25%;
    height: 6em;
}
#pwTitle{
    grid-area: t;
    display: flex;
    align-self: center;
    justify-self: center;
}
#elem1{
    grid-area: n;
    font-size: .6em;
}
form{
    grid-area: i;
}
#absPw{
    grid-area: a;
    display: flex;
    align-self: center;
    justify-self: center;
}
</style>