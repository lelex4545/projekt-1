<template>
    <grid
        :draggable="true"
        :sortable="true"
        :items="items"
        :cellWidth="250"
        :cellHeight="80"
        @removeEvent="removeItem"
        >
        <template slot="cell" slot-scope="props">
            <div :id="props.sort"
                @contextmenu.prevent="addItem"
                @dblclick="removeItem"
                @mousedown="changeList"
                @mouseup="changeList2"
            >
                INT: {{items[props.sort].id}} {{items[props.index].name}} EXT: {{props.index}} 
                SORT: {{props.sort}}
            </div>
        </template>
    </grid>
</template>

<script>
import Vue from 'vue'
import Grid from 'vue-js-grid'
Vue.use(Grid)
export default {
    data () {
        return {
            items: [
                {id: '0', name: 'Element0'},
                {id: '1', name: 'Element1'},
                {id: '2', name: 'Element2'},
                {id: '3', name: 'Element3'},
                {id: '4', name: 'Element4'},
            ],
            from: 0,
            to: 0,
        }
        
    },
    methods: {
        addItem: function(){
            console.log("Push")
            this.items.push({id: this.items.length, name: 'Element' + (this.items.length)})
        },
        removeItem: function(props){
            /*console.log(props)
            if(props > -1)
                //this.items = this.items.splice(props, 1);
                this.items.splice(props, 1);
            for(var i = 0; i<this.items.length; i++){
                    this.items[i].id = i;
            }*/
            console.log(props)
            this.items.splice(props.srcElement.id,1)
            for(var i = 0; i<this.items; i++)
                this.items[i].id = i;
        },
       /* changeArray: function(list){
            for(var i = 0; i<this.items.length; i++){
                if(this.items[i] !== list[i].item){ 
                    this.items[i] = list[i].item;
                    this.items[i].id = i;
                }
            }
        },*/
        changeList: function(props){
            //console.log(props.srcElement.id);
            this.from = props.srcElement.id;

        },
        changeList2: function(props){
            //console.log(props.srcElement.id);
            this.to = props.srcElement.id;
            let cutOut = this.items.splice(this.from, 1) ; // cut the element at index 'from'
            cutOut[0].id = this.to;
            this.items[this.from].id = this.from
            this.items.splice(this.to, 0, cutOut[0]);         // insert it at index 'to'
            //console.log(this.items)
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/theme.scss";
.v-grid{
    //margin: auto;
    //border: 1px solid black;
}
.v-grid-item-wrapper{
    margin-left: 1.35em;
    margin-top: 1em;
    //border: 1px solid black;
}
.v-grid-item-wrapper div{
    border: 1px black solid;
    border-radius: 1rem;
    background-color: #384b5e;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    box-sizing: border-box;
    
    letter-spacing: 0.1em;
    width: 250px;
    height: 70px;
    color: white;
}
#addNewItem{
    display: flex;
}
#addNewItem p {
    font-size: 2em;
    margin: auto !important;
}
</style>