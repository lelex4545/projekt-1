<template>
  <div id="main">
    <div id="container" class="conDesign draggable-container" ref="draggableContainer" @mousedown="dragMouseDown">
      <p id="anmText">Anmelden</p>
      <p id="p1">Name</p>
      <p id="p2">Passwort</p>
      <form id="form" method="get">
        <input type="text" id="acc" name="acc" />
        <input type="password" id="pw" name="pw" />
      </form>
      <div id="anmelden">
        <Button id="anmelden1" class="canttouchme" name="Anmelden" url="http://www.fh-dortmund.de" />
      </div>
      <a id="pwv" @click="pwEvent" class="canttouchme">Passwort vergessen?</a>
      <a id="reg" @click="accEvent" class="canttouchme">Registrieren</a>
    </div>

    <!--
    <br>
    <div id="container2" class="conDesign">
    </div>
    -->
    <br class="canttouchme" />
    <span v-if="accScope">
      <Regist/>
    </span>
    <span v-if="pwScope">
      <PwForgot />
    </span>
    <Drag/>
  </div>
</template>

<script>
import Button from "./../Button";
import Regist from "./Regist";
import PwForgot from "./PwForgot";
import Drag from "./Drag";
export default {
  name: "LogIn",

  components: {
    Button,
    Regist,
    PwForgot,
    Drag
  },
  data: () => ({
    accScope: false,
    pwScope: false,
    positions: {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
    },
  }),
  methods: {
    accEvent() {
      this.pwScope = false;
      this.accScope = !this.accScope;
    },
    pwEvent() {
      this.accScope = false;
      this.pwScope = !this.pwScope;
    },
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
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    }
  },
};
</script>

<style lang="scss">

.conDesign {
  border-radius: 1em;
  background-color: #009a93;
  border: .5px solid black;
  padding: 1em;
  width: 22em;
  height: 9em;
  font-size: 1.3em;
  letter-spacing: 0.1em;
  transition: font-size 0.65s;
}

#container {
  display: grid;
  position: absolute;
  z-index: 3;
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
  align-items: center;
  justify-content: center;
  margin-right: 1em;
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
    color: black;
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
    color: black;
    cursor: pointer;
  }
}
.canttouchme {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

$color: #037c76;
input {
  border: 1px solid #034d4a;
  border-radius: 0.5em;
  background-color: #037c76;
  color: white;
  width: 16.2em;
  height: 1.7em;
  text-align: center;
  font-size: 0.8em;
  &:focus {
    outline: none;
    background-color: darken(#037c76, 7%);
  }
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

p {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .conDesign {
    font-size: 1em;
  }
}

@media screen and (max-width: 480px) {
  .conDesign {
    font-size: 0.75em;
  }
}
</style>