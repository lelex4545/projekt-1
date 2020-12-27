<template>
  <div id="container" class="conDesign" ref="draggableContainer" @mousedown="dragMouseDown">
    <p id="anmText">Anmelden</p>
    <p id="p1">Name</p>
    <p id="p2">Passwort</p>
    <form id="form" method="get">
      <input type="text" id="acc" name="acc" v-model="name" @mousedown.stop />
      <input type="password" id="pw" name="pw" v-model="passwort" @mousedown.stop />
    </form>
    <span @click="login">
    <Button id="anmelden" class="canttouchme" name="Anmelden"  @mousedown.stop />
    </span>
    <a id="pwv" @click="pwEvent" class="canttouchme" @mousedown.stop>Passwort vergessen?</a>
    <a id="reg" @click="accEvent" class="canttouchme" @mousedown.stop>Registrieren</a>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "LogIn",
  props: [ 'nameLog', 'passwortLog' ],
  components: {
    Button
  },
  data: () => ({
    name: '',
    passwort: '',
    positions: {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
    }
  }),
  computed: {
    nameInput: {
      get: function() {
        return this.nameLog;
      },
      set: function(newValue) {
        this.$emit('update:nameLog', newValue);
      }
    },
    passwortInput: {
      get: function() {
        return this.passwortLog;
      },
      set: function(newValue) {
        this.$emit('update:passwortLog', newValue);
      }
    }
  },
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
    },/*
    stayOnScreenRight() {
        if((this.$refs.draggableContainer.offsetLeft + document.getElementById('container').offsetWidth - this.positions.movementX)>window.innerWidth) 
          this.$refs.draggableContainer.style.left = window.innerWidth - document.getElementById('container').offsetWidth - 1 + 'px'
		},
		stayOnScreenBottom() {
        if((this.$refs.draggableContainer.offsetTop + document.getElementById('container').offsetHeight - this.positions.movementY)>window.innerHeight) 
          this.$refs.draggableContainer.style.top = window.innerHeight - document.getElementById('container').offsetHeight - 1 + 'px'
    },*/
    login() {
      var r=require("request");
      var txUrl = "http://localhost:7474/db/data/transaction/commit";
        function cypher(query,params,cb) {
        r.post({uri:txUrl,
        json:{statements:[{statement:query,parameters:params}]}},
        function(err,res) { cb(err,res.body)})
      }
      var vorhanden = false;
      var pw = this.passwort;
      var name = this.name;
      var query="MATCH (b:Benutzer { benutzername: $benutzername }) RETURN b"
      var query2="MATCH (b:Benutzer { benutzername: $benutzername, passwort: $passwort }) RETURN b"
      var params={benutzername: this.name}
      var params2= {benutzername: this.name, passwort: this.passwort}
     
      var cb=function(err,data) { 
        if(data.results[0].data.length!=0)
          vorhanden = true;

        if(name == "" || pw == "") {
          if(name=="")
            alert("Benutzername bitte eingeben")
          if(pw=="")
            alert("Passwort bitte eingeben");
        }
        else if(vorhanden != true) {
          alert("Benutzername existiert nicht") //Fehlermeldung und rotes Häckchen
        }
        else
          cypher(query2,params2,cb2)

       }

      var cb2=function(err,data) { 
        vorhanden = false;
        if(data.results[0].data.length!=0)
          vorhanden = true;

        if(vorhanden != true) {
          alert("Passwort ist falsch! Überprüfen sie ihren Passwort") // Fehlermeldung rotes Häckchen
        }
        else{
          alert("Anmeldung erfolgreich.");
          //this.$emit('catcher',this.name);
          this.$cookies.set("benutzername", this.name, "expiring time");
          this.$router.push({ name: 'Home', params: {name: this.name }})
        }
       }.bind(this);

      cypher(query,params,cb)
      
    }
  },
};

</script>

<style lang="scss">
@import "@/assets/theme.scss";
#container {
  color: #ffffff;
  display: grid;
  position: absolute;
  left: 700px;
  top:100px;
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