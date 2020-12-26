<template>
    <div id="pwScreen" class="conDesign" ref="draggableContainer" @mousedown="dragMouseDown">
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
  }),/*
  mounted(){
    this.$nextTick(function() {
      window.addEventListener('resize', this.stayOnScreenRight);
      window.addEventListener('resize', this.stayOnScreenBottom);
    })
  },*/
  methods: {
    dragMouseDown: function () {
        this.$emit("dragEvent", event, this)
    },
    /*
    dragMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
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
    */
  },
  
};
</script>

<style>
#pwScreen{
    color: #ffffff;
    display: grid;
    position: absolute;
    z-index: 2;
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