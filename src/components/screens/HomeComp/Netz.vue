<template>
    <div class ="netz">
        <!--<VueDragResize id="knoten1" :isActive="false" :w="250" :h="200" y = "100" x = "500" v-on:resizing="resize" v-on:dragging="resize" @click="onDeactivated">
            <h3>Hello ITPabst!</h3>
        </VueDragResize>-->
        <vue-custom-scrollbar class="scroll-area"  :settings="settings" @ps-scroll-y="scrollHanle">
            <ejs-diagram v-dragscroll id="diagram" :width='width' :height='height' :nodes='nodes' :connectors='connectors' :scrollSettings='scrollSettings' :pageSettings='pageSettings' :zoomSettings='zoom'></ejs-diagram>
        </vue-custom-scrollbar>    
    </div>
</template>

<script>
import Vue from 'vue'
//import VueDragResize from 'vue-drag-resize'
import { DiagramPlugin } from '@syncfusion/ej2-vue-diagrams';
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import { dragscroll } from 'vue-dragscroll'
//import $ from 'jquery'

    Vue.use(DiagramPlugin);

    let connectors = [{
    // Name of the connector
    id: "connector1",
    // Sets source and target points
    sourceID: 'xatar',
    targetID: 'garingan',
    targetDecorator: {
        // Defines the custom shape for the connector's target decorator (Kein Pfeil)
        shape: 'Custom'
        }
    }]

    let nodes = [{
        id: "xatar",
        // Position of the node
        offsetX: 600,
        offsetY: 300,
        // Size of the node
        width: 100,
        height: 100,
        annotations: [{
            content: 'XATAR'
        }],
        style: {
            fill: '#6964FF',
            strokeColor: '#8D8AFF',
        },
        shape: {
        type: 'Basic',
        shape: 'Ellipse',
        cornerRadius: 10
        },
    },
    {
        id: "garingan",
        //Position of the node
        offsetX: 800,
        offsetY: 500,
        // Size of the node
        width: 100,
        height: 100,
        style: {
            fill: '#6964FF',
            strokeColor: '#8D8AFF',
            //strokeWidth: '2px'
        },
        annotations: [{
            content: 'GARINGAN'
        }],
        shape: {
            type: 'Basic',
            shape: 'Ellipse',
            cornerRadius: 10
        },

    // Text(label) added to the node
    }]
export default {
    components: {
        vueCustomScrollbar
    },
    data() {
        return {
            width: "2500px",
            height: "1500px",
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

            settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false
            },

            directives: {
                'dragscroll': dragscroll
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
        scrollHanle(evt) {
            console.log(evt)
        }
    },
    computed: {

    }
}
</script>

<style scoped>
    @import "../../../../node_modules/@syncfusion/ej2-vue-diagrams/styles/material.css";

    #diagram{
        position:absolute;
        z-index: 0;
        /*margin-left: 15.9em;*/
        /*left: 15.9em;*/
    }
    .scroll-area {
        top: 2.4em;
        left: 8em;
        position: relative;
        margin: auto;
        width: 1638px;
        height: 928px;
    }

    /*
    #line1{
        z-index: 1000;
        stroke: red;
        stroke-width:10px;
    }
    #knoten1{
        z-index: 1000;
        background-color: rgb(151, 223, 151);  
        border-radius: 15px; 
        color: black;
    }

</style>