<template>
    <grid
        id="grid"
        :draggable="true"
        :sortable="true"
        :items="items"
        :cellWidth="250"
        :cellHeight="80"
        @changeArray="changeArray"
        @dragend="end"
        @removeEvent="removeItem"
        >
        <template slot="cell" slot-scope="props">
            <div
                @contextmenu.prevent="() => {props.remove()}"
                @dblclick="addItem"
            >
                {{items[props.sort].name}} {{items[props.sort].id}} {{props.index}}
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
                {id: '0', name: 'Null '},
                {id: '1', name: 'Eins '},
                {id: '2', name: 'Zwei '},
                {id: '3', name: 'Drei '},
                {id: '4', name: 'Vier '},
            ]
        }
        
    },
    methods: {
        addItem: function(){
            this.items.push({id: this.items.length, name: 'Element' + this.items.length})
        },
        removeItem: function(props){
            console.log(props)
            if(props > -1)
                //this.items = this.items.splice(props, 1);
                this.items.splice(props, 1);
            for(var i = 0; i<this.items.length; i++){
                    this.items[i].id = i;
            }
        },
        changeArray: function(list){
            for(var i = 0; i<this.items.length; i++){
                if(this.items[i] !== list[i].item){ 
                    this.items[i] = list[i].item;
                    this.items[i].id = i;
                }
            }
            this.$emit("updateProps",this.items.length)
            //document.getElementById('grid').item=this.items
        },
        end: function(){
            this.items.push("test")
            this.items.pop()
        },
        showProp: function(props){
            console.log(props.item.name + " " + props.item.id)
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/theme.scss";
.v-grid-item-wrapper{
    display: flex;
    justify-items: space-around;
    margin: 1em;
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