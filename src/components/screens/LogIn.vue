<template>
  <div class="canttouchme">
    <LogInElement :class="{testtest: hidden}"
      @accEvent=accScreen
      @pwEvent=pwScreen
    />
    <br>
    <span v-if="accScope">
      <Regist />
    </span>
    <!--<span v-if="pwScope">-->
      <PwForgot 
        @dragEvent=dragMouseDown
      />
    <!--</span>-->
  </div>
</template>

<script>
import LogInElement from "./LogInComp/LogInElement"
import Regist from "./LogInComp/Regist";
import PwForgot from "./LogInComp/PwForgot";

export default {
  name: "LogIn",
  components: {
    Regist,
    PwForgot,
    LogInElement,
  },
  data: () => ({
    accScope: false,
    pwScope: true,
    hidden: false,
  }),
  methods: {
    accScreen() {
      this.pwScope = false;
      this.accScope = !this.accScope;
    },
    pwScreen() {
      this.accScope = false;
      this.pwScope = !this.pwScope;
    },
    ///////////FORMOVEMENT
    dragMouseDown: function (movObject, event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      movObject.positions.clientX = event.clientX
      movObject.positions.clientY = event.clientY
      //console.log("Function1:  " + movObject.positions.clientX)
      document.onmousemove = this.elementDrag(movObject, event)
      console.log(document.onmousemove)
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (movObject, event) {
    //elementDrag(movObject, event) {
      event.preventDefault()
      movObject.positions.movementX = movObject.positions.clientX - event.clientX
      movObject.positions.movementY = movObject.positions.clientY - event.clientY
      movObject.positions.clientX = event.clientX 
      movObject.positions.clientY = event.clientY 
      // set the element's new position:
      movObject.$refs.draggableContainer.style.top = (movObject.$refs.draggableContainer.offsetTop - movObject.positions.movementY) + 'px'
      //console.log(movObject.$refs.draggableContainer.style.top)
      movObject.$refs.draggableContainer.style.left = (movObject.$refs.draggableContainer.offsetLeft - movObject.positions.movementX) + 'px'
    /*
      //Div Elemente können nicht außerhalb des Bildes gezogen werden
      //Top-Block
      if((movObject.$refs.draggableContainer.offsetTop - movObject.positions.movementY)<0) movObject.$refs.draggableContainer.style.top = 0 + 'px'
      //Bottom-Block
      if((movObject.$refs.draggableContainer.offsetTop + document.getElementById('container').offsetHeight - movObject.positions.movementY)>window.innerHeight) 
        movObject.$refs.draggableContainer.style.top = window.innerHeight - document.getElementById('container').offsetHeight - 1 + 'px'
      //Left-Block
      if((movObject.$refs.draggableContainer.offsetLeft - movObject.positions.movementX)<0) movObject.$refs.draggableContainer.style.left = 0 + 'px'
      //Right-Block
      if((movObject.$refs.draggableContainer.offsetLeft + document.getElementById('container').offsetWidth - movObject.positions.movementX)>window.innerWidth) 
        movObject.$refs.draggableContainer.style.left = window.innerWidth - document.getElementById('container').offsetWidth - 1 + 'px'
    */
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    },
    stayOnScreenRight(movObject) {
        if((movObject.$refs.draggableContainer.offsetLeft + document.getElementById('container').offsetWidth - movObject.positions.movementX)>window.innerWidth) 
        movObject.$refs.draggableContainer.style.left = window.innerWidth - document.getElementById('container').offsetWidth - 1 + 'px'
		},
		stayOnScreenBottom(movObject) {
        if((movObject.$refs.draggableContainer.offsetTop + document.getElementById('container').offsetHeight - movObject.positions.movementY)>window.innerHeight) 
        movObject.$refs.draggableContainer.style.top = window.innerHeight - document.getElementById('container').offsetHeight - 1 + 'px'
		}
  },
};
</script>

<style lang="scss">
@import "@/assets/theme.scss";

.testtest{
  z-index: 10;
}

.conDesign {
  border-radius: 1em;
  background-color: $div_color;
  box-shadow: 1px 1px 2px rgb(29, 29, 29);
  padding: 1em;
  width: 22em;
  height: 9em;
  font-size: 1.3em;
  letter-spacing: 0.1em;
  transition: font-size 0.65s;
}


input {
  border: 1px solid #333838;
  border-radius: 0.5em;
  background-color: $login_input_color;
  color: white;
  width: 16.2em;
  height: 1.7em;
  text-align: center;
  font-size: 0.8em;
  &:focus {
    outline: none;
    background-color: darken($login_input_color, 7%);
  }
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

 .conDesign p {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

body {
    background-color: $login_background_color;
}
</style>