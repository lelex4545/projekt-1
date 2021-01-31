<template>
    <div class="root" @click="show">
      <button @click="addItemView">Add Item</button>
      <button @click="rmvBtnClicked=!rmvBtnClicked">Remove Item</button>
      <SlickList lockAxis="y" v-model="items" :lockToContainerEdges="true" lockOffset="0%">
        <SlickItem id="kItem" v-for="(item, index) in items" :index="index" :key="index">
          <span @mousedown="aktuelleKategorie(item)">
          <div id="hi">
          <span>{{ item.titel }}</span>
          <span v-if="rmvBtnClicked" id="removeMode" @contextmenu.prevent="removeItemView(item)"></span>
          </div>
          </span>
        </SlickItem>
      </SlickList>
    </div>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort';
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);
export default {
    name: 'Kategorie',
    props: [ 'name2' ],
    components: {
        SlickItem,
        SlickList
    },
    data() {
        return{
            items: [],
            aktKategorie: null,
            rmvBtnClicked: false

        }
    },
    watch: {
        items: function(){
                var r=require("request");
                var txUrl = "http://localhost:7474/db/data/transaction/commit";
                function cypher(query,params,cb) {
                r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})
                }

                for(var i = 0;i<this.items.length;i++) {
                    this.items[i].index=i; 
                    var query="MATCH (n:Kategorie) WHERE id(n)=$id SET n.index=$index RETURN n"
                    var params={id: this.items[i].id, index: i}
                    var cb=function(err,data){
                    data;
                    }.bind(this)
                    cypher(query,params,cb)
                }
        }
    },
    methods: {
        show: function(){
            console.log(this.items)
        },
        addItemView() {
            this.$swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1']
            }).queue([
            {
                title: 'Wie soll die neue Kategorie heißen?',
                text: '[Maximal 20 Zeichen]'
            }
            ]).then((result) => {
            if (result.value) {
                const answers = JSON.stringify(result.value[0])
                this.addItem(result.value[0])
                this.$swal.fire({
                title: 'Erfolgreich erstellt !',
                html: `
                    Kategorie:
                    <pre><code>${answers}</code></pre>
                `,
                confirmButtonText: 'Zurück',
                icon: 'success'
                })
            }
            })
        },
        
        addItem(titel) {
            var name;
                if(this.name2 === undefined)
                    name=this.$cookies.get("benutzername")
                else 
                    name = this.name2
            var r=require("request");
            var txUrl = "http://localhost:7474/db/data/transaction/commit";
            async function cypher(query,params,cb) {
                r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})
                }
            var tmp = this.items.length;
            var i = this.items.push({titel: titel, id:-1, index:this.items.length-1});
            if(i!=0)
            i= i-1;
            console.log(this.items.length-1)
            console.log(i)
            var query="CREATE(k:Kategorie {titel:$titel, index:$index}) RETURN k"
            var params={titel: this.items[this.items.length-1].titel, index: this.items.length-1}
            var cb= async function(err,data) 
            {
                //console.log(data)
                console.log("ok")
                this.items[i].id = data.results[0].data[0].meta[0].id;
                var query2="MATCH (a:Benutzer),(b:Kategorie) WHERE a.benutzername=$benutzername AND id(b)=$id CREATE (a)-[r:besitzt]->(b) RETURN type(r)"
                var params2={benutzername: name, id: this.items[i].id}
                cypher(query2,params2,cb2)
            }.bind(this)

            var cb2= async function(err,data) 
            {
                console.log(data)
                if(tmp == 0)
                     this.$emit('aktKategorie',this.items[0]);

            }.bind(this)

             cypher(query,params,cb)

        },
        removeItemView(item){
            this.$swal.fire({
            title: 'Kategorie "'+item.titel+'" wirklich löschen ?',
            text: "Die Löschung kann danach nicht rückgängig gemacht werden !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ja, löschen!'
            }).then((result) => {
                this.removeItem(item)
            if (result.isConfirmed) {
                this.$swal.fire(
                'Gelöscht!',
                'Die Kategorie "'+item.titel+'" wurde gelöscht.',
                'success'
                )
            }
            })
        },
        removeItem(value) {
             //this.rmvBtnClicked = false;
            var name;
                if(this.name2 === undefined)
                    name=this.$cookies.get("benutzername")
                else 
                    name = this.name2
            var r=require("request");
            var txUrl = "http://localhost:7474/db/data/transaction/commit";
            async function cypher(query,params,cb) {
                r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})
                }
            const index = this.items.map(item => item).indexOf(value);
            var idIndex = this.items[index].id;
            var query="MATCH (n { benutzername: $name })-[r:besitzt]->(m:Kategorie) WHERE id(m)=$id DELETE r"
            var params={name: name, id: this.items[index].id}
            this.items.splice(index,1)
            var cb2=async function(err,data) 
            {
                //console.log(data)
                data;
                //setTimeout(this.setBtn, 1000);
                if(this.items.length!=0)
                    this.$emit('aktKategorie',this.items[0]);
                else
                    this.$emit('aktKategorie',null);  
            }.bind(this)

            var cb=async function(err,data) 
            {
                console.log(data)
                var query2="MATCH (k:Kategorie) WHERE id(k)=$id CALL apoc.path.subgraphNodes(k, {}) YIELD node DETACH DELETE node"
                var params2={id:idIndex}
                cypher(query2,params2,cb2)
                
            }.bind(this)
            cypher(query,params,cb);

        },
        setBtn() {
            this.rmvBtnClicked = true;
        },
        aktuelleKategorie: function(kategorie)
        {
            this.$emit('aktKategorie',kategorie);
            this.aktKategorie = kategorie;
        }
    },
    mounted: function(){
                var name;
                if(this.name2 === undefined)
                    name=this.$cookies.get("benutzername")
                else 
                    name = this.name2

                var r=require("request");
                var txUrl = "http://localhost:7474/db/data/transaction/commit";
                function cypher(query,params,cb) {
                r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})}

            var query="MATCH (Benutzer { benutzername:$benutzername })--(Kategorie) RETURN Kategorie"
            var params={benutzername: name}
            var cb=function(err,data) 
            {
                console.log(data)
                for(var i = 0;i<data.results[0].data.length;i++){
                    for(var j = 0;j<data.results[0].data.length;j++){
                        if(data.results[0].data[j].row[0].index==i)
                        {
                            this.items.push({titel:data.results[0].data[j].row[0].titel, id:data.results[0].data[j].meta[0].id, index:i})
                        }

                    }
                }
                this.aktKategorie = this.items[0];
                this.$emit('aktKategorie',this.items[0]);
                console.log(this.items)
            }.bind(this)
             cypher(query,params,cb)
    
}
}
</script>

<style lang="scss">
.root{
    margin-top: 5px;
    //background-color: #384b5e;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
#hi{
    //background: #384b5e;
    //border-radius: .5rem;
    //box-shadow: 1px 1px 2px rgb(126, 126, 126);
    height: 50px;
    width: 250px;
    //color: white;
    //border: 1px solid black;

    z-index: 10;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    font-size: 1em;
    letter-spacing: 0.1em;
    margin: .3em;
}
#kItem{
    background: #384b5e;
    border-radius: .5rem;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    height: 50px;
    width: 250px;
    color: white;
    //border: 1px solid black;

    z-index: 10;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    font-size: 1em;
    letter-spacing: 0.1em;
    margin: .5em;
}

#removeMode{
    position: absolute;
    margin: .75em;
    left: 13.5em;
    font-size: 1em;
    width: 1.5em;
    height: 1.5em;
    border: 1px solid black;
    cursor: pointer;
    z-index: 500;
    &:hover{
        background: orangered;
    }
}
</style>