<template>
    <div id="regScreen" class="conDesign" ref="draggableContainer" @mousedown="dragMouseDown">
            <p id="regista">Registrieren</p>
            <p>Name </p>
            <p>Benutzern.</p>
            <p>Email</p>
            <p>Passwort</p>
            <p>Passwort bestätigen</p>
        <form>
            <input type="text" size="20" maxlength="20" v-model="name" @mousedown.stop>
            <input type="text" size="20" maxlength="20" v-model="benutzername" @mousedown.stop>
            <input type="email" size="30" v-model="email" @mousedown.stop>
            <input type="password" size="20" maxlength="20" v-model="passwort" @mousedown.stop>
            <input type="password" size="20" maxlength="20" v-model="passwortVerg" @mousedown.stop>
        </form>
        
    <span @click="regist" id="abs">
    <Button  name="Registrieren"/>
    </span>
    </div>
</template>

<script>
import Button from "./Button";
export default {
    components: {
    Button
  },
  data: () => ({
      name: '',
      benutzername: '',
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
      this.$emit('update:positions', this.positions)
      this.$emit('test')
      document.onmouseup = null
      document.onmousemove = null
    },
    async regist() {
      var vorhanden = false;
      var r=require("request");
      var txUrl = "http://localhost:7474/db/data/transaction/commit";
        function cypher(query,params,cb) {
        r.post({uri:txUrl,
        json:{statements:[{statement:query,parameters:params}]}},
        function(err,res) { cb(err,res.body)})
      }
      if(this.checkExpression()){

       
      var exist = false;
      var exist2 = false;
      var query="MATCH (b:Benutzer { benutzername: $benutzername }) RETURN b"
      var query2="MATCH (b:Benutzer { email: $email }) RETURN b"
      var query3="CREATE (b:Benutzer { name: $name, benutzername: $benutzername, email: $email, passwort: $passwort }) RETURN b"
      var params={benutzername: this.benutzername}
      var params2={email: this.email}
      var params3={name: this.name, benutzername: this.benutzername, email: this.email, passwort: this.passwort}
      var cb= async function(err,data) { 
      if(data.results[0].data.length!=0)
        vorhanden=true;
      if(vorhanden == true) {
        exist = true;
        alert("Benutzername existiert schon"); //Hier sollte ein Rotes häckchen neben Benutzername designed werden
        vorhanden=false;
       }
      else {
        //Hier sollte ein grünes Häckchen neben Benutzername designed werden
        }
        cypher(query2,params2,cb2);
      }

      var cb2=function(err,data) { 
      if(data.results[0].data.length!=0)
        vorhanden=true;
      if(vorhanden == true) {
        exist2 = true;
        alert("Email existiert schon");//Hier sollte ein Rotes häckchen neben "Email" designed werden
        vorhanden=false;
        }
      else {
        //Hier sollte ein grünes Häckchen neben "Email" designed werden
        }

        if(exist==false&&exist2==false) {
        cypher(query3,params3,cb3);
      }
      }

      var cb3=function(err,data) {
        console.log(data);
        alert("Erfolgreich registiert"); // Hier sollte eine "Bestätigung der Registrierung" designed werden
      }

      cypher(query,params,cb);
      }
      
    },
    checkExpression()
    {
      var error = false;
      var pw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      var name = /^[a-zA-Z0-9]{6,}$/;
      var mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!pw.test(this.passwort))
      {
        alert("Passwort passt nicht zu Anforderungen");//rotes Häckchen mit Beschreibung des Fehlers
        error = true;
      }
      if(!name.test(this.benutzername))
      {
        alert("Benutzername passt nicht zu Anforderungen")//rotes Häckchen mit Beschreibung des Fehlers
        error = true;
      }
      if(!name.test(this.name))
      {
        alert("Name passt nicht zu Anforderungen")//rotes Häckchen mit Beschreibung des Fehlers
        error = true;
      }
      if(!mail.test(this.email))
      {
        alert("Mail passt nicht zu Anforderungen")//rotes Häckchen mit Beschreibung des Fehlers
        error = true;
      }
      if(this.passwort!=this.passwortVerg)
      {
        alert("Passwörter passen nicht überein!")//rotes Häckchen mit Beschreibung des Fehlers
        error = true;
      }
      if(error)
        return false;
      else
        return true;
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
    display:flex;
    flex-flow: column;
}
#abs{
    grid-area: a;
    display: flex;
    justify-self: center;
    align-self: flex-end;
    width: 10em;
}
</style>