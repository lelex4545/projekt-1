<template>
    <div>
        <ejs-diagram id="diagram" :width='width' :height='height'  :scrollSettings='scrollSettings' :pageSettings='pageSettings' backgroundColor='white' 
        :snapSettings='snapSettings' :selectedItems='selectedItems' :click="click" :doubleClick="doubleClick"
        >
        </ejs-diagram>
        <context-menu :display="showContextMenu" ref="menu">
            <ul>
                <li> List item 1 </li>
                <li> List item 2 </li>
            </ul>
        </context-menu>
    </div>
</template>

<script>
import Vue from 'vue'
import ContextMenu from '../NetzComp/ContextMenu';
import { DiagramPlugin, ConnectorConstraints, SelectorConstraints} from '@syncfusion/ej2-vue-diagrams';
Vue.use(DiagramPlugin);

let connectors = {}

let nodes = {}
    /*{id: "xatar", offsetX: 600, offsetY: 300,width: 100,height: 100,annotations: [{content: 'XATAR23'}],style: {fill: '#6964FF',strokeColor: '#8D8AFF',},shape: {type: 'Basic',shape: 'Ellipse',cornerRadius: 10}},
    {id: "garingan",offsetX: 800,offsetY: 500,width: 100,height: 100,annotations: [{content: 'GARINGAN'}],style: {fill: '#6964FF',strokeColor: '#8D8AFF'},shape: {type: 'Basic',shape: 'Ellipse',cornerRadius: 10}},*/

export default {
    components: {
        ContextMenu,
    },
    data() {
        return {
            width: "6500px",
            height: "2000px",
            connectors: connectors,
            nodes: nodes,
            puffer: [],
            dragging: false,
            netzId: -1,
            item: undefined,
            showContextMenu: false,
            click: (args) => {
                
                let clickedItem = args.actualObject
                if(args.button === 'Left' && clickedItem instanceof Object && clickedItem.constructor.name === 'Node'){ //Überprüfe, ob ein Node geklickt wurde
                    this.saveInstance();
                }
                
                if(args.button === 'Right' && clickedItem instanceof Object && clickedItem.constructor.name === 'Node'){
                    console.log(args)
                    console.log(clickedItem)
                    this.$refs.menu.open(args.position);
                }
            },
            /*positionChange: () =>{
                console.log("DRAG")            
            },*/
            
            //--------------------------------------------
            scrollSettings: {
                canAutoScroll: true,
                scrollLimit: 'Limited',
                horizontalOffset: 0,
                verticalOffset: 0,
                maxZoom: 0,
                minZoom: 0,
                /*scrollableArea: {
                    x: 0,
                    y: 0,
                    width: 10,
                    height: 10
                }, */
            },
            //--------------------------------------------
            pageSettings:{
                boundaryConstraints: 'Diagram',
                background:{
                    /*color: 'grey',*/
                },
                /*width: 1640,
                height: 1401,*/
            },

            /*directives: {
                'dragscroll': dragscroll
            },*/
            snapSettings: {
                horizontalGridlines: {
                    //lineColor: 'blue',
                },
                verticalGridlines: {
                    //lineColor: 'blue',
                }
            },
            selectedItems: {
                constraints: SelectorConstraints.Default & ~SelectorConstraints.ResizeAll
            }
        }
    },
    mounted(){ 
            document.getElementById("diagram").addEventListener("contextmenu", function(e){
                e.preventDefault()
            }, false);
        
            let diagramInstance;
            let diagramObj = document.getElementById("diagram")
            //console.log(this.$el)
            diagramInstance = diagramObj.ej2_instances[0]; //HIER KOMMT EIN FEHLER!!! ej2_instance == null

            diagramInstance.bringToFront();
            diagramInstance.dataBind();

            document.documentElement.style.overflow = 'hidden' 

            var r=require("request");
                var txUrl = "http://localhost:7474/db/data/transaction/commit";
                function cypher(query,params,cb) {
                r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})}

            var cb=function(err,data) 
            {
                console.log(data);
                
                this.netzId = data.results[0].data[0].meta[0].id;
                data.results[0].data[0].row[0].serialisierung
                if(data.results[0].data[0].row[0].serialisierung != "")
                diagramInstance.loadDiagram(data.results[0].data[0].row[0].serialisierung)
                if(data.results[0].data[0].row[0].puffer != ""){
                    var tmp = JSON.parse(data.results[0].data[0].row[0].puffer);
                    this.puffer = tmp;
                    console.log(this.puffer)
                    for(var i = 0;i<this.puffer.length;i++) {
                        this.connectors = {id: `${this.puffer[i].knoten1}_${this.puffer[i].knoten2}`,sourceID: this.puffer[i].knoten1,targetID: this.puffer[i].knoten2,targetDecorator: {shape: 'Custom'}, constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select, style: {strokeColor: '#7CDE7A', fill: '#7CDE7A', strokeWidth: 2}, }
                        diagramInstance.add(this.connectors)
                    }
                    this.saveInstance();
                }
                this.$emit('sendExistingNodes', diagramInstance.nodes);

                var query2="MATCH(k:Wissensnetz)-[r:beinhaltet]->(n:Netz) WHERE id(k)=$id SET n.puffer='' RETURN n"
                var params2={id: this.item.id}
                cypher(query2,params2,cb2)
            }.bind(this)
            var cb2=function(err,data) 
            {
                data;
            }.bind(this)
            this.item =this.$cookies.get("item");
            var query="MATCH(k:Wissensnetz)-[r:beinhaltet]->(n:Netz) WHERE id(k)=$id RETURN n"
            var params={id: this.item.id};
            cypher(query,params,cb);


    },
    watch:{
        knotenName: function(){
            var x = 1;
            var serialisierung;
            var r=require("request");
                var txUrl = "http://localhost:7474/db/data/transaction/commit";
                function cypher(query,params,cb) {
                r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})}

            var cb=function(err,data) 
            {
                data;

                var query2="CREATE(n:Text {array:'', htmlString:'', knotenId:$knotenId}) RETURN n"
                var params2={knotenId: this.knotenName};
                cypher(query2,params2,cb2)

            }.bind(this)

            var cb2=function(err,data) 
            {
                var query3="MATCH (a:Netz),(b:Text) WHERE id(a)=$id AND id(b)=$id2 CREATE (a)-[r:besitzt]->(b) RETURN b"
                var params3={id: this.netzId, id2: data.results[0].data[0].meta[0].id}
                cypher(query3,params3,cb3);
            }.bind(this)
            var cb3=function(err,data) 
            {
               data;
            }.bind(this)
            for(var i = 0; i < nodes.length; i++){
                if(this.knotenName.toUpperCase() == nodes[i].annotations[0].content.toUpperCase()){  
                    x = 0
                }
            }
            
            if(x){
                let diagramInstance;
                let diagramObj = document.getElementById("diagram")
                diagramInstance = diagramObj.ej2_instances[0];
                console.log(diagramInstance.nodes)
                console.log(this.$el)
                //this.nodes.push({id: this.knotenName, offsetX: 600,offsetY: 300,width: 100,height: 100,style: {fill: '#6964FF',strokeColor: '#8D8AFF'},annotations: [{content: this.knotenName}],shape: {type: 'Basic',shape: 'Ellipse',cornerRadius: 10}, });
                this.nodes = {id: this.knotenName, offsetX: 600,offsetY: 300,width: 100,height: 100,style: {fill: '#6964FF',strokeColor: '#8D8AFF'},annotations: [{content: this.knotenName}],shape: {type: 'Basic',shape: 'Ellipse',cornerRadius: 10}, }
                diagramInstance.add(this.nodes)
                //vorhandene knoten aus diagram benötigt
                this.$emit('sendExistingNodes', diagramInstance.nodes);

                //--------------------------------------TODO

                for(var j = 0; j < this.connectorNodes.length; j++){
                    var targetid = this.connectorNodes[j].substring(0, this.connectorNodes[j].length-1);
                    //this.connectors.push({id: `${this.knotenName} ${j}`, sourceID: this.knotenName, targetID: targetid, targetDecorator: {shape: 'Custom'}, constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select});
                    this.connectors = {id: `${this.knotenName} ${j}`,sourceID: this.knotenName,targetID: targetid,targetDecorator: {shape: 'Custom'}, constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select, style: {strokeColor: '#6BA5D7', fill: '#6BA5D7', strokeWidth: 2}, }             
                    diagramInstance.add(this.connectors)
                    //console.log(diagramInstance.add(this.connectors)) //connector ID ist nicht eindeutig wenn erneut verbindungen erstellt werden
                    //diagramInstance.dataBind();
                }
                //  Datenbankanbindung/Serialisierung
                serialisierung = diagramInstance.saveDiagram();
                var query="MATCH(k:Wissensnetz)-[r:beinhaltet]->(n:Netz) WHERE id(k)=$id SET n.serialisierung=$serialisierung RETURN n"
                var params={id: this.item.id, serialisierung: serialisierung};
                cypher(query,params,cb);
            }
        }
    },
    methods: {
        resize(newRect) {
            this.width = newRect.width;
            this.height = newRect.height;
            this.top = newRect.top;
            this.left = newRect.left;
        },
        onDeactivated(){
            this.isActive = "false";
        },
        doubleClick: function(args){
            let diagramInstance;
            let diagramObj = document.getElementById("diagram")
            diagramInstance = diagramObj.ej2_instances[0];
            if(args['source'].id != null){
                console.log(args['source'].id+ "DOUBLE")
                this.$router.push({name: "Editor", params: {knotenId: args['source'].id}, query: {existingNodes: diagramInstance.nodes, netzId: this.netzId}})

            }
        },
        saveInstance(){
            let diagramInstance;
            let diagramObj = document.getElementById("diagram")
            diagramInstance = diagramObj.ej2_instances[0];
            var serialisierung;
            var r=require("request");
            var txUrl = "http://localhost:7474/db/data/transaction/commit";
            function cypher(query,params,cb) {
            r.post({uri:txUrl,
            json:{statements:[{statement:query,parameters:params}]}},
            function(err,res) { cb(err,res.body)})}

            var cb=function(err,data) {
                    console.log(data.results[0].data[0].meta[0].id);
            }.bind(this)

            serialisierung = diagramInstance.saveDiagram();
            var query="MATCH(k:Wissensnetz)-[r:beinhaltet]->(n:Netz) WHERE id(k)=$id SET n.serialisierung=$serialisierung RETURN n"
            var params={id: this.item.id, serialisierung: serialisierung};
            cypher(query,params,cb);
    
                
        },
        createConnector(connectorKnoten) {
            console.log(connectorKnoten)
            this.puffer.push(connectorKnoten);
            this.savePuffer();
            /*let diagramInstance;
            let diagramObj = document.getElementById("diagram")
            diagramInstance = diagramObj.ej2_instances[0];
            console.log('myMethod called', connectorKnoten);
            this.connectors = {id: `${connectorKnoten.knoten1}_${connectorKnoten.knoten2}`,sourceID: connectorKnoten.knoten1,targetID: connectorKnoten.knoten2,targetDecorator: {shape: 'Custom'}, constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select, style: {strokeColor: '#6BA5D7', fill: '#6BA5D7', strokeWidth: 2}, }
            diagramInstance.add(this.connectors)*/
        },
        savePuffer(){
            var r=require("request");
                var txUrl = "http://localhost:7474/db/data/transaction/commit";
                function cypher(query,params,cb) {
                r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})}

            var cb=function(err,data) 
            {
                data;
            }.bind(this)
            var query="MATCH (n:Wissensnetz)-[r:beinhaltet]->(m:Netz) WHERE id(n)=$id SET m.puffer=$puffer RETURN n"
            var params={id: this.$cookies.get("item").id, puffer: JSON.stringify(this.puffer)};
            cypher(query,params,cb);
        }
    },
    props: ['knotenName', 'connectorNodes', 'gridItem']
}
</script>

<style scoped>
    @import "../../../../node_modules/@syncfusion/ej2-vue-diagrams/styles/material.css";

    #diagram{
        position: relative;
        z-index: 0;
    }


    .grab-bing {
        cursor : -webkit-grab;
        cursor : -moz-grab;
        cursor : -o-grab;
        cursor : grab;
    }

    .grab-bing:active {
        cursor : -webkit-grabbing;
        cursor : -moz-grabbing;
        cursor : -o-grabbing;
        cursor : grabbing;
    }


</style>