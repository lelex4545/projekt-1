<template>
  <div id="container" class="conDesign" ref="draggableContainer" @mousedown="dragMouseDown">
    <p id="anmText">Anmelden</p>
    <p id="p1">Name</p>
    <p id="p2">Passwort</p>
    <form id="form" method="get">
      <input type="text" id="acc" name="acc" @mousedown.stop />
      <input type="password" id="pw" name="pw" @mousedown.stop />
    </form>
    <Button id="anmelden" class="canttouchme" name="Anmelden" url @mousedown.stop />
    <a id="pwv" @click="pwEvent" class="canttouchme" @mousedown.stop>Passwort vergessen?</a>
    <a id="reg" @click="accEvent" class="canttouchme" @mousedown.stop>Registrieren</a>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "LogIn",
  components: {
    Button
  },
  data: () => ({
    positions: {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
    },
  }),
  mounted(){
    this.$nextTick(function() {
      window.addEventListener('resize', this.stayOnScreenRight);
      window.addEventListener('resize', this.stayOnScreenBottom);
    })
  },
  methods: {
    accEvent() {
        this.$emit('accEvent', this.item)
    },
    pwEvent() {
        this.$emit('pwEvent', this.item)
    },
    dragMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      console.log(document.onmousemove)
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX 
      this.positions.clientY = event.clientY 
      // set the element's new position:
      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
    
      //Div Elemente können nicht außerhalb des Bildes gezogen werden
      //Top-Block
      if((this.$refs.draggableContainer.offsetTop - this.positions.movementY)<0) this.$refs.draggableContainer.style.top = 0 + 'px'
      //Bottom-Block
      if((this.$refs.draggableContainer.offsetTop + document.getElementById('container').offsetHeight - this.positions.movementY)>window.innerHeight) 
        this.$refs.draggableContainer.style.top = window.innerHeight - document.getElementById('container').offsetHeight - 1 + 'px'
      //Left-Block
      if((this.$refs.draggableContainer.offsetLeft - this.positions.movementX)<0) this.$refs.draggableContainer.style.left = 0 + 'px'
      //Right-Block
      if((this.$refs.draggableContainer.offsetLeft + document.getElementById('container').offsetWidth - this.positions.movementX)>window.innerWidth) 
        this.$refs.draggableContainer.style.left = window.innerWidth - document.getElementById('container').offsetWidth - 1 + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    },
    stayOnScreenRight() {
        if((this.$refs.draggableContainer.offsetLeft + document.getElementById('container').offsetWidth - this.positions.movementX)>window.innerWidth) 
        this.$refs.draggableContainer.style.left = window.innerWidth - document.getElementById('container').offsetWidth - 1 + 'px'
		},
		stayOnScreenBottom() {
        if((this.$refs.draggableContainer.offsetTop + document.getElementById('container').offsetHeight - this.positions.movementY)>window.innerHeight) 
        this.$refs.draggableContainer.style.top = window.innerHeight - document.getElementById('container').offsetHeight - 1 + 'px'
		}
  },
};

</script>

<style lang="scss">
@import "@/assets/theme.scss";
#container {
  display: grid;
  position: absolute;
  left: 500px;
  z-index: 2;
  grid-template-areas:
    "a a a"
    "p1 form form"
    "p2 form form"
    ". . anm"
    ". pwv reg";
  grid-auto-columns: 25% 40% 35%;
  grid-auto-rows: 15% 25% 25% 25% 10%;
}
#anmText {
  grid-area: a;
  display: flex;
  align-self: center;
  margin: 0;
  margin-bottom: 1em;
  justify-self: center;
}

#p1 {
  grid-area: p1;
}
#p2 {
  grid-area: p2;
}
#form {
  grid-area: form;
}
#anmelden {
  grid-area: anm;
  display: flex;
  align-self: center;
  justify-self: center;
  margin-right: 1.8em;
}

#reg {
  display: flex;
  align-self: flex-end;
  justify-self: center;
  grid-area: reg;
  font-size: 60%;
  width: 7em;
  color: white;
  &:hover {
    color: $hover_color_change;
    cursor: pointer;
  }
}
#pwv {
  display: flex;
  align-self: flex-end;
  justify-self: center;
  grid-area: pwv;
  font-size: 60%;
  width: 13em;
  color: white;
  &:hover {
    color: $hover_color_change;
    cursor: pointer;
  }
}
</style>