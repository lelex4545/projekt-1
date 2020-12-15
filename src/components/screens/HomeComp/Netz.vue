<template>
        <ejs-diagram v-dragscroll id="diagram" :width='width' :height='height' :nodes='nodes' :connectors='connectors' :scrollSettings='scrollSettings' :pageSettings='pageSettings' :zoomSettings='zoom' backgroundColor='white' :snapSettings='snapSettings'></ejs-diagram>
</template>

<script>
import Vue from 'vue'
import { DiagramPlugin } from '@syncfusion/ej2-vue-diagrams';
//import { SnapSettingsModel,SnapConstraints,Snapping,Diagram } from '@syncfusion/ej2-vue-diagrams';
import { dragscroll } from 'vue-dragscroll'
//import $ from 'jquery'

Vue.use(DiagramPlugin);

let connectors = [
    {id: "connector1",sourceID: 'xatar',targetID: 'garingan',targetDecorator: {shape: 'Custom'}
}]

let nodes = [
    {id: "xatar", offsetX: 600, offsetY: 300,width: 100,height: 100,annotations: [{content: 'XATAR23'}],style: {fill: '#6964FF',strokeColor: '#8D8AFF',},shape: {type: 'Basic',shape: 'Ellipse',cornerRadius: 10}},
    {id: "garingan",offsetX: 800,offsetY: 500,width: 100,height: 100,annotations: [{content: 'GARINGAN'}],style: {fill: '#6964FF',strokeColor: '#8D8AFF'},shape: {type: 'Basic',shape: 'Ellipse',cornerRadius: 10},
}]

    
export default {
    components: {

    },
    data() {
        return {
            width: "6500px",
            height: "2000px",
            connectors: connectors,
            nodes: nodes,
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

            directives: {
                'dragscroll': dragscroll
            },
            snapSettings: {
                horizontalGridlines: {
                    //lineColor: 'blue',
                },
                verticalGridlines: {
                    //lineColor: 'blue',
                }
            }
        }
    },
    mounted(){
        let diagramInstance;
        let diagramObj = document.getElementById("diagram");
        diagramInstance = diagramObj.ej2_instances[0];
        diagramInstance.connectors[0].style.strokeColor = '#6BA5D7';
        diagramInstance.connectors[0].style.fill = '#6BA5D7';
        diagramInstance.connectors[0].style.strokeWidth = 2;
        diagramInstance.connectors[0].targetDecorator.style.fill = '#6BA5D7';
        diagramInstance.connectors[0].targetDecorator.style.strokeColor = '#6BA5D7';
        diagramInstance.connectors[0].sourcePoint.x = 150;
        diagramInstance.connectors[0].targetPoint.x = 150;
        diagramInstance.bringToFront();
        document.documentElement.style.overflow = 'hidden' 
        diagramInstance.dataBind();
    },
    watch:{
        knotenName: function(){
            if(this.knotenName.toUpperCase() == nodes[0].annotations[0].content.toUpperCase())
                alert(this.knotenName + " existiert bereits")
            else
                this.nodes.push({id: this.knotenName,offsetX: 400,offsetY: 200,width: 100,height: 100,style: {fill: '#6964FF',strokeColor: '#8D8AFF'},annotations: [{content: this.knotenName}],shape: {type: 'Basic',shape: 'Ellipse',cornerRadius: 10}})
            
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
        }
    },
    props: ['knotenName']
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