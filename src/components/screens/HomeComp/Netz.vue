<template>
        <ejs-diagram id="diagram" :width='width' :height='height'  :scrollSettings='scrollSettings' :pageSettings='pageSettings' backgroundColor='white' :snapSettings='snapSettings' :selectedItems='selectedItems' :click="click" :doubleClick="doubleClick" :positionChange="positionChange"></ejs-diagram>
</template>

<script>
import Vue from 'vue'
import { DiagramPlugin, ConnectorConstraints, SelectorConstraints} from '@syncfusion/ej2-vue-diagrams';
//import { SnapSettingsModel,SnapConstraints,Snapping,Diagram } from '@syncfusion/ej2-vue-diagrams';
//import { dragscroll } from 'vue-dragscroll' //v-dragscroll in den html tag rein

Vue.use(DiagramPlugin);

let connectors = {}


let nodes = {}
    /*{id: "xatar", offsetX: 600, offsetY: 300,width: 100,height: 100,annotations: [{content: 'XATAR23'}],style: {fill: '#6964FF',strokeColor: '#8D8AFF',},shape: {type: 'Basic',shape: 'Ellipse',cornerRadius: 10}},
    {id: "garingan",offsetX: 800,offsetY: 500,width: 100,height: 100,annotations: [{content: 'GARINGAN'}],style: {fill: '#6964FF',strokeColor: '#8D8AFF'},shape: {type: 'Basic',shape: 'Ellipse',cornerRadius: 10}},*/

    


export default {
    components: {

    },
    data() {
        return {
            width: "6500px",
            height: "2000px",
            connectors: connectors,
            nodes: nodes,
            dragging: false,
            click: (args) => {
                let diagramInstance;
                let diagramObj = this.$el;
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

                let clickedItem = args.actualObject
                if(args.button === 'Left' && clickedItem instanceof Object && clickedItem.constructor.name === 'Node'){ //Überprüfe, ob ein Node geklickt wurde
                    console.log(clickedItem.id)
                    serialisierung = diagramInstance.saveDiagram();
                    var query="MATCH(k:Wissensnetz)-[r:beinhaltet]->(n:Netz) WHERE id(k)=$id SET n.serialisierung=$serialisierung RETURN n"
                    var params={id: this.gridItem.id, serialisierung: serialisierung};
                    cypher(query,params,cb);
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
            let diagramInstance;
            let diagramObj = this.$el;
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
                data.results[0].data[0].row[0].serialisierung
                if(data.results[0].data[0].row[0].serialisierung != "")
                diagramInstance.loadDiagram(data.results[0].data[0].row[0].serialisierung)
                this.$emit('sendExistingNodes', diagramInstance.nodes);

            }.bind(this)
            var query="MATCH(k:Wissensnetz)-[r:beinhaltet]->(n:Netz) WHERE id(k)=$id RETURN n"
            var params={id: this.gridItem.id};
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
                console.log(data.results[0].data[0].meta[0].id);

            }.bind(this)


            for(var i = 0; i < nodes.length; i++){
                if(this.knotenName.toUpperCase() == nodes[i].annotations[0].content.toUpperCase()){  
                    x = 0
                }
            }
            
            if(x){
                let diagramInstance;
                let diagramObj = this.$el;
                diagramInstance = diagramObj.ej2_instances[0];
                console.log(diagramInstance.nodes)
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
                    console.log(diagramInstance.add(this.connectors))
                    diagramInstance.add(this.connectors)
                    //diagramInstance.dataBind();
                }
                //  Datenbankanbindung/Serialisierung
                serialisierung = diagramInstance.saveDiagram();
                var query="MATCH(k:Wissensnetz)-[r:beinhaltet]->(n:Netz) WHERE id(k)=$id SET n.serialisierung=$serialisierung RETURN n"
                var params={id: this.gridItem.id, serialisierung: serialisierung};
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
            if(args['source'].id != null){
                console.log(args['source'].id+ "DOUBLE")
                this.$router.push({name: "Editor", params: {knotenId: args['source'].id}})
            }
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