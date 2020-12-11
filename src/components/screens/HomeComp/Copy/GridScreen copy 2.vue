<template>
<div id="container123">
    <div>
    <grid-layout 
            id="canttouchme"
            :layout.sync="layout"
            :col-num="colNum"
            :maxRows="maxRows"
            :row-height="285"
            :is-draggable="true"
            :is-resizable="false"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"

            :preventCollision="false"
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
                <span > ADD ITEM </span>
            </grid-item>
        </grid-layout>
    </div>
</div>
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout"
export default {
    components: {
        GridLayout,
        GridItem,
    },
    data: () => ({
        layout: [
            {"x":0,"y":0,"w":1,"h":1,"i":"0"},
            {"x":1,"y":0,"w":1,"h":1,"i":"1"},
            {"x":2,"y":0,"w":1,"h":1,"i":"2"},
            {"x":3,"y":0,"w":1,"h":1,"i":"3"},
            {"x":4,"y":0,"w":1,"h":1,"i":"4"},
            {"x":0,"y":1,"w":1,"h":1,"i":"5"},
            /*{"x":1,"y":1,"w":1,"h":1,"i":"6"},
            {"x":2,"y":1,"w":1,"h":1,"i":"7"},
            {"x":3,"y":1,"w":1,"h":1,"i":"8"},
            {"x":4,"y":1,"w":1,"h":1,"i":"9"},
            {"x":0,"y":2,"w":1,"h":1,"i":"10"},
            {"x":1,"y":2,"w":1,"h":1,"i":"11"},
            {"x":2,"y":2,"w":1,"h":1,"i":"12"},
            {"x":3,"y":2,"w":1,"h":1,"i":"13"},*/
            ],
        colNum: 5,
        maxRows: 3,
        index: 0,
        removeOn: false
    }),
    mounted(){
        //this.maxRows = 12 * this.colNum
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
#container123{
    border: 1px solid black;
    width: 1500px;
    height: 900px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.vue-grid-item:not(.vue-grid-placeholder) {
    background: #384b5e;
    border-radius: 3rem;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    box-sizing: border-box;
    color: white;
    touch-action: none !important;
    border: 1px solid black;
    cursor: default !important;
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