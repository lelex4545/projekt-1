<template>
    <div class ="netz">
        <VueDragResize id="knoten1" :isActive="false" :w="250" :h="200" y = "100" x = "500" v-on:resizing="resize" v-on:dragging="resize" @click="onDeactivated">
            <h3>Hello ITPabst!</h3>
        </VueDragResize>

        <svg  width="500" height="500"><line svg="./LineTest.svg" id="line1" x1="500" y1="1000" x2="400" y2="100"/></svg>
    </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'
//import $ from 'jquery'



export default {
    components: {
        VueDragResize
    },

    data() {
        return {
            width: 0,
            height: 0,
            top: 0,
            left: 0,

        }
    },
    mounted(){
        /*var canvas = document.getElementById('line1');
        var context = canvas.getContext('2d');
        // Reset the current path
        context.beginPath(); 
        // Staring point (10,45)
        context.moveTo(400, 100);
        // End point (180,47)
        context.lineTo(500, 200);
        // Make the line visible
        context.stroke(); */
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
    }
}
</script>

<style scoped>
    #line1{
        z-index: 1000;
        stroke: red;
        stroke-width:10px;
    }
    #knoten1{
        background-color: rgb(151, 223, 151);  
        border-radius: 15px; 
        color: black;
    }
</style>