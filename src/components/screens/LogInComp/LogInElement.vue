<template>
  <div id="container" class="conDesign" ref="draggableContainer" @mousedown.left="dragMouseDown">
    <p id="anmText">Anmelden</p>
    <p id="p1">Name</p>
    <p id="p2">Passwort</p>
    <form id="form" method="get">
      <input type="text" id="acc" name="acc" v-model="name" @mousedown.stop />
      <input type="password" id="pw" name="pw" v-model="passwort" @mousedown.stop />
    </form>
    <span @click="login" id="anmelden" class="canttouchme" @mousedown.stop>
      <Button name="Anmelden"/>
    </span>
    <a id="pwv" @click="pwEvent" class="canttouchme" @mousedown.stop>Passwort vergessen?</a>
    <a id="reg" @click="accEvent" class="canttouchme" @mousedown.stop>Registrieren</a>
  </div>
</template>

<script>
import Button from "./Button";
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);
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
    },
    login() {
      var r=require("request");
      var swal = this.$swal;
      var text = "";
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
            text = text+"Benutzername bitte eingeben\n"
          if(pw=="")
            text = text+"Passwort bitte eingeben\n"
        }
        else if(vorhanden != true) {
          text = text+"Benutzername existiert nicht" //Fehlermeldung und rotes Häckchen
        }
        else
          cypher(query2,params2,cb2)
          if(text!=="")
          swal.fire({
          icon: 'error',
          title: text,
          text: '',
          footer: ''
          })
       }.bind(this)

      var cb2=function(err,data) { 
        vorhanden = false;
        if(data.results[0].data.length!=0)
          vorhanden = true;

        if(vorhanden != true) {
          text = text+"Passwort ist falsch! Überprüfen sie ihren Passwort" // Fehlermeldung rotes Häckchen
        }
        else{
          swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Anmeldung erfolgreich',
          showConfirmButton: false,
          timer: 1500
          })
          //this.$emit('catcher',this.name);
          this.$cookies.set("benutzername", this.name, "expiring time");
          this.$router.push({ name: 'Home', params: {name: this.name }})
        }
        if(text!=="")
        swal.fire({
        icon: 'error',
        title: text,
        text: '',
        footer: ''
        })

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
  left: 150px;
  top: 50px;
  z-index: 2;
  grid-template-areas:
    "a a a"
    "p1 form form"
    "p2 form form"
    ". . anm"
    ". pwv reg";
  grid-auto-columns: 25% 40% 35%;
  grid-auto-rows: 15% 25% 25% 25% 10%;

  border: 1px solid black;
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
  margin-right: 1.3em;
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