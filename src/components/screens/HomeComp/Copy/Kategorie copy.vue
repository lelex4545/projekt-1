<template>
    <div id="container">
        <span id="butPos">
            <button v-if="layout.length<12" @click="addItem">Add Item</button>
            <button @click="removeOn = !removeOn">Remove</button>
        </span>
        <grid-layout 
            id="canttouchme"
            :layout.sync="layout"
            :col-num="colNum"
            :maxRows="maxRows"
            :row-height="20"
            :is-draggable="true"
            :is-resizable="false"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[0, 10]"
            :use-css-transforms="true"
        >
            <grid-item v-for="item in layout"
               :x="item.x"
               :y="item.y"
               :w="item.w"
               :h="item.h"
               :i="item.i"
               :key="item.i"
            >
                <span>{{item.i}}</span>
                <span v-if="removeOn" class="remove" @click="removeItem(item.i)">x</span>
            </grid-item>
        </grid-layout>
    </div>
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout"
export default {
    components:{
        GridLayout,
        GridItem
    },
    data: () => ({
        layout: [
            {"x":0,"y":0,"w":2,"h":2,"i":"0"},
            {"x":0,"y":2,"w":2,"h":2,"i":"1"},
            {"x":0,"y":4,"w":2,"h":2,"i":"2"},
            {"x":0,"y":6,"w":2,"h":2,"i":"3"}
            ],
        colNum: 2,
        maxRows: 0,
        index: 0,
        removeOn: false
    }),
    mounted(){
        this.maxRows = 12 * this.colNum
        this.index = this.layout.length
    },
    methods: {
        addItem: function(){
            if(this.layout.length<this.maxRows/2)
                this.layout.push({"x":0,"y":this.layout.length*2,"w":2,"h":2,"i":this.index++})
        },
        removeItem: function(value){
            const index = this.layout.map(item => item.i).indexOf(value);
            this.layout.splice(index,1)
        }
    }
}
</script>

<style lang="scss" scoped>
#container{
    position: absolute;
    left: 1em;
    top: 11em;
    display: flex;
    flex-flow: column;
}
.vue-grid-layout{
    width: 250px;
}
.vue-grid-item:not(.vue-grid-placeholder) {
    background: #384b5e;
    border-radius: 1rem;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    box-sizing: border-box;
    color: white;
    touch-action: none !important;
    border: 1px solid black;
    cursor: default !important;
}
.vue-grid-item.vue-grid-placeholder { //NOTWORKING?!
    background: blue !important;
    border: 1px solid black;
}  
.remove{
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 2em;
    color: white;
    cursor: pointer;
    &:hover{
        color: orangered;
    }
}
#butPos{
}
#canttouchme {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>