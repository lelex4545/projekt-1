<template>
    <div id="regScreen" class="conDesign colorTheme_1" ref="draggableContainer" @mousedown="dragMouseDown">
            <p id="regista">Registrieren</p>
            <p>Vorname </p>
            <p>Nachname</p>
            <p>Email</p>
            <p>Passwort</p>
            <p>Passwort bestätigen</p>
        <form>
            <input type="text" size="20" maxlength="20" v-model="vorname" @mousedown.stop>
            <input type="text" size="20" maxlength="20" v-model="nachname" @mousedown.stop>
            <input type="email" size="30" v-model="email" @mousedown.stop>
            <input type="password" size="20" maxlength="20" v-model="passwort" @mousedown.stop>
            <input type="password" size="20" maxlength="20" v-model="passwortVerg" @mousedown.stop>
        </form>
        <Button id="abs" name="Registrieren"/>
    </div>
</template>

<script>
import Button from "./Button";
export default {
    components: {
    Button
  },
  data: () => ({
      vorname: '',
      nachname: '',
      email: '',
      passwort: '',
      passwortVerg: '',

    //für Draggable
      positions: {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
    }
  }),
  methods: {
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

      //
      if((this.$refs.draggableContainer.offsetTop - this.positions.movementY)<0) this.$refs.draggableContainer.style.top = 0 + 'px'
      if((this.$refs.draggableContainer.offsetTop + document.getElementById('regScreen').offsetHeight - this.positions.movementY)>window.innerHeight) 
            this.$refs.draggableContainer.style.top = window.innerHeight - document.getElementById('regScreen').offsetHeight - 1 + 'px'
      if((this.$refs.draggableContainer.offsetLeft - this.positions.movementX)<0) this.$refs.draggableContainer.style.left = 0 + 'px'
      if((this.$refs.draggableContainer.offsetLeft + document.getElementById('regScreen').offsetWidth - this.positions.movementX)>window.innerWidth) 
          this.$refs.draggableContainer.style.left = window.innerWidth - document.getElementById('regScreen').offsetWidth - 1 + 'px'
      
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}

</script>

<style scoped>
#regScreen{
    display: grid;
    position: absolute;
    z-index: 2;
    grid-auto-rows: 10% 15% 15% 15% 15% 15% 15%;
    grid-auto-columns: 25% 75%;
    grid-template-areas: 
        "r r"
        "p f"
        "p f"
        "p f"
        "p f"
        "p f"
        ". a";
    height: 15em;
}
#regista{
    grid-area: r;
    justify-self: center;
    margin: 0 0 .5em 0;
}
form{
    grid-area: f;
}
#abs{
    grid-area: a;
    display: flex;
    justify-self: center;
    align-self: flex-end;
    width: 10em;
}
</style>