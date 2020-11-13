<template>
    <div class ="netz">
        <VueDragResize id="knoten1" :isActive="false" :w="250" :h="200" y = "100" x = "800" v-on:resizing="resize" v-on:dragging="resize" @click="onDeactivated">
            <h3>Hello Xatar Garingan!</h3>
        </VueDragResize>
        <VueDragResize id="knoten2" :isActive="false" :w="250" :h="200" y = "100" x = "500" v-on:resizing="resize" v-on:dragging="resize" @click="onDeactivated">
            <h3>Hello ITPabst!</h3>
        </VueDragResize>
    </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'

export default {
    components: {
        VueDragResize
    },

    data() {
        return {
            width: 0,
            height: 0,
            top: 0,
            left: 0
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
    }
}
</script>

<style>
    #knoten1{
        background-color: paleturquoise;
        border-radius: 15px;
        color: black;
    }
    #knoten2{
        background-color: rgb(151, 223, 151);  
        border-radius: 15px; 
        color: black;
    }

</style>