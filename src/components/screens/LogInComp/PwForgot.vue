<template>
    <div id="pwScreen" class="conDesign" ref="draggablePW" @mousedown="dragMouseDown">
            <p id="pwTitle">Passwort vergessen</p>
            <p id="elem1">Email Adresse eingeben</p>
        <form>
            <input type="text">
        </form>
        <span id="absPw" name="Absenden" class="canttouchme"  @mousedown.stop>
          <Button name="Absenden"/>
        </span>
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
    /*
    window.addEventListener('resize', this.stayOnScreenRight2);
    window.addEventListener('resize', this.stayOnScreenBottom2);
    */
  },
  methods: {
    dragMouseDown: function (event) {
      event.preventDefault()
      //Mausposition durch event bestimmen
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
      //Neue Position des Elementes bestimmen
      this.$refs.draggablePW.style.top = (this.$refs.draggablePW.offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggablePW.style.left = (this.$refs.draggablePW.offsetLeft - this.positions.movementX) + 'px'
    
      //Div Elemente können nicht außerhalb des Bildes gezogen werden
      //Top-Block
      if((this.$refs.draggablePW.offsetTop - this.positions.movementY)<0) this.$refs.draggablePW.style.top = 0 + 'px'
      //Bottom-Block
      if((this.$refs.draggablePW.offsetTop + document.getElementById('pwScreen').offsetHeight - this.positions.movementY)>window.innerHeight) 
        this.$refs.draggablePW.style.top = window.innerHeight - document.getElementById('pwScreen').offsetHeight - 1 + 'px'
      //Left-Block
      if((this.$refs.draggablePW.offsetLeft - this.positions.movementX)<0) this.$refs.draggablePW.style.left = 0 + 'px'
      //Right-Block
      if((this.$refs.draggablePW.offsetLeft + document.getElementById('pwScreen').offsetWidth - this.positions.movementX)>window.innerWidth) 
        this.$refs.draggablePW.style.left = window.innerWidth - document.getElementById('pwScreen').offsetWidth - 1 + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    },
    stayOnScreenRight2() {
        if((this.$refs.draggablePW.offsetLeft + document.getElementById('pwScreen').offsetWidth - this.positions.movementX)>window.innerWidth) 
          this.$refs.draggablePW.style.left = window.innerWidth - document.getElementById('pwScreen').offsetWidth - 1 + 'px'
		},
		stayOnScreenBottom2() {
        if((this.$refs.draggablePW.offsetTop + document.getElementById('pwScreen').offsetHeight - this.positions.movementY)>window.innerHeight) 
          this.$refs.draggablePW.style.top = window.innerHeight - document.getElementById('pwScreen').offsetHeight - 1 + 'px'
    },
  },
  
};
</script>

<style>
#pwScreen{
    color: #ffffff;
    display: grid;
    position: absolute;
    left: 500px;
    top: 300px;
    z-index: 3;
    grid-template-areas: 
        "t t"
        "n i"
        ". a";
    grid-auto-columns: 25% 75%;
    grid-auto-rows: 25% 50% 25%;
    height: 6em;

    border: 1px solid black;
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