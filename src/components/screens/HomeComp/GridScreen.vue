<template>
    <div class="root" @click="show">
      <button v-if="addBtn" id="btnAdd3" @click="addItemView">Add Item</button>
      <SlickList id="slickContainer" axis="xy" v-model="items">
        <SlickItem id="slickItem" v-for="(item, index) in items" :index="index" :key="index">
            {{item.titel}}
            <span>
                <button @click="openNetz(item)">Enter</button>
                <button @click="removeItemView(item)">Delete</button>
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
    props: [ 'name2', 'kategorie' ],
    name: 'GridScreen',
    components: {
        SlickItem,
        SlickList
    },
    data() {
        return{
            items: [],
            addBtn: true,
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
                    var query="MATCH (n:Wissensnetz) WHERE id(n)=$id SET n.index=$index RETURN n"
                    var params={id: this.items[i].id, index: i}
                    var cb=function(err,data){
                    data;
                    }.bind(this)
                    cypher(query,params,cb)
                }
        },
        kategorie: function(){
                var name;
                if(this.name2 === undefined)
                    name=this.$cookies.get("benutzername")
                else 
                    name = this.name2
                var kat = this.kategorie;
                var r=require("request");
                var txUrl = "http://localhost:7474/db/data/transaction/commit";
                function cypher(query,params,cb) {
                r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})}
            if(kat!=null){
            this.items = [];
            this.addBtn = true;
            var query="MATCH (Benutzer { benutzername:$benutzername })--(Kategorie {index:$index})--(Wissensnetz) RETURN Wissensnetz"
            var params={benutzername: name, index: kat.index}
            var cb=function(err,data) 
            {
                console.log(data)
                if(data.results[0].data.length!=0)
                {
                    for(var i = 0;i<data.results[0].data.length;i++){
                        for(var j = 0;j<data.results[0].data.length;j++){
                            if(data.results[0].data[j].row[0].index==i)
                            {
                                this.items.push({titel:data.results[0].data[j].row[0].titel, id:data.results[0].data[j].meta[0].id, index:i})
                            }

                        }
                    }
                }
                else{
                    this.items = [];
                }
                    console.log(this.items)
                }.bind(this)
             cypher(query,params,cb)
            }
            else{
                this.items = [];
                this.addBtn = false;
            }
        }
    },
    methods: {
        show: function(){
            console.log(this.items)
        },
        //Menü zum Erstellen eines Items
        addItemView() {
            this.$swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1']
            }).queue([
            {
                title: 'Wie soll das neue Wissensnetz heißen?',
                text: '[Maximal 20 Zeichen]'
            }
            ]).then((result) => {
            if (result.value) {
                const answers = JSON.stringify(result.value[0])
                this.addItem(result.value[0])
                this.$swal.fire({
                title: 'Erfolgreich erstellt !',
                html: `
                    Wissensnetz:
                    <pre><code>${answers}</code></pre>
                `,
                confirmButtonText: 'Zurück',
                icon: 'success'
                })
            }
            })
        },
        //Fügt ein Element hinzu
        addItem: function(titel){
            var r=require("request");
            var txUrl = "http://localhost:7474/db/data/transaction/commit";
            function cypher(query,params,cb) {
                r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})
                }
            var i = this.items.push({titel:titel, id:-1, index:this.items.length-1})
            var netzId;
            if(i!=0)
            i= i-1;
            var query="CREATE(k:Wissensnetz {titel:$titel, index:$index}) RETURN k"
            var params={titel: this.items[this.items.length-1].titel, index: this.items.length-1}
            var cb=function(err,data) 
            {
                console.log(data)
                this.items[i].id = data.results[0].data[0].meta[0].id;
                var query2="MATCH (a:Kategorie),(b:Wissensnetz) WHERE id(a)=$id AND id(b)=$id2 CREATE (a)-[r:besitzt]->(b) RETURN type(r)"
                var params2={id: this.kategorie.id, id2: this.items[i].id}
                cypher(query2,params2,cb2)
            }.bind(this)
            var cb2=function(err,data) 
            {
                console.log(data)
                var query3="CREATE(k:Netz {serialisierung:$serialisierung, puffer:$puffer, puffer2:$puffer2}) RETURN k"
                var params3={serialisierung: "", puffer: "", puffer2: ""};
                cypher(query3,params3,cb3);

            }.bind(this)
            var cb3=function(err,data) 
            {
                console.log(data.results[0].data[0].meta[0].id);
                var query4="MATCH (a:Wissensnetz),(b:Netz) WHERE id(a)=$id AND id(b)=$id2 CREATE (a)-[r:beinhaltet]->(b) RETURN b"
                var params4={id: this.items[i].id, id2: data.results[0].data[0].meta[0].id}
                netzId = data.results[0].data[0].meta[0].id; 
                cypher(query4,params4,cb4)
            }.bind(this)
            var cb4=function(err,data) 
            {
                console.log(data);
                var query5="CREATE(n:Anki {cards:''}) RETURN n"
                var params5={}
                cypher(query5,params5,cb5)
            }.bind(this)
            var cb5=function(err,data) 
            {
                console.log(data);
                var query6="MATCH (a:Netz),(b:Anki) WHERE id(a)=$id AND id(b)=$id2 CREATE (a)-[r:beinhaltet]->(b) RETURN b"
                var params6={id: netzId, id2: data.results[0].data[0].meta[0].id}
                cypher(query6,params6,cb6)
            }.bind(this)
            var cb6=function(err,data) 
            {
                console.log(data);
            }.bind(this)
            cypher(query,params,cb)
        },
        //Menu zum Löschen eines Items
        removeItemView(item) {
            this.$swal.fire({
            title: 'Wissensnetz "'+item.titel+'" wirklich löschen ?',
            text: "Die Löschung kann danach nicht rückgängig gemacht werden !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ja, löschen!'
            }).then((result) => {
            if (result.isConfirmed) {
                this.removeItem(item)
                this.$swal.fire(
                'Gelöscht!',
                'Die Kategorie "'+item.titel+'" wurde gelöscht.',
                'success'
                )
            }
            })
        },
        //Löschen eines Items
        removeItem: function(value){
            var r=require("request");
            var txUrl = "http://localhost:7474/db/data/transaction/commit";
            function cypher(query,params,cb) {
                r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})
                }
            const index = this.items.map(item => item).indexOf(value);
            var idIndex = this.items[index].id;
            var query="MATCH (n:Kategorie { index: $index })-[r:besitzt]->(m:Wissensnetz) WHERE id(m)=$id DELETE r"
            var params={index: this.kategorie.index, id: idIndex}
            var cb2=function(err,data) 
            {
                console.log(data)
            }.bind(this)
            var cb=function(err,data) 
            {
                console.log(data)
                var query2="MATCH (k:Wissensnetz) WHERE id(k)=$id CALL apoc.path.subgraphNodes(k, {}) YIELD node DETACH DELETE node, k"
                var params2={id:idIndex}
                cypher(query2,params2,cb2)
                
            }.bind(this)
            cypher(query,params,cb);
            this.items.splice(index,1)
        },
        mounted: function(){
                
                var name = this.name2
                var kat = this.kategorie;
                var r=require("request");
                var txUrl = "http://localhost:7474/db/data/transaction/commit";
                function cypher(query,params,cb) {
                r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})}
            var query="MATCH (Benutzer { benutzername:$benutzername })--(Kategorie {index:$index})--(Wissensnetz) RETURN Wissensnetz"
            var params={benutzername: name, index: kat.index}
            var cb=function(err,data) 
            {
                console.log(data)
                alert(data.results[0].data.length)
                for(var i = 0;i<data.results[0].data.length;i++){
                    for(var j = 0;j<data.results[0].data.length;j++){
                        if(data.results[0].data[j].row[0].index==i)
                        {
                            this.items.push({titel:data.results[0].data[j].row[0].titel, id:data.results[0].data[j].meta[0].id, index:i})
                        }

                    }
                }
                console.log(this.items)
            }.bind(this)
             cypher(query,params,cb)
    
        },
        openNetz: function(value){
            this.$cookies.set("item", value, "expiring time");
            this.$router.push({ name: 'NetzScreen', params: {item: value}})
        }
    }
}
</script>

<style lang="scss" scoped>
.root {
    z-index: 20;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
#netzSwitch{
    position: absolute;
    font-size: 1em;
    width: 1.5em;
    height: 1.5em;
    border: 1px solid black;
    cursor: pointer;
    &:hover{
        background: orangered;
    }
}

#slickContainer{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 1em;
    
}

#btnAdd3{
    position: relative;
    z-index: 21;
    top: 0.3em;
    left: -53em;

}

#removeMode{
    position: absolute;
    margin: .75em;
    right: 1em;
    font-size: 1em;
    width: 1.5em;
    height: 1.5em;
    border: 1px solid black;
    cursor: pointer;
    &:hover{
        background: orangered;
    }
}

#slickItem{
    background: whitesmoke;
    border-radius: .7rem;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    height: 270px;
    width: 270px;
    color: #384b5e;

    //z-index: 10;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    font-size: 1em;
    letter-spacing: 0.1em;
    margin: 1em;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>