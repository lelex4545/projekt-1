<template>
    <grid
        :draggable="true"
        :sortable="true"
        :items="items"
        :cellWidth="300"
        :cellHeight="300"
        >
        <template slot="cell" slot-scope="props">
            <div 
                id="addNewItem"
                v-if="props.item=='-__-'"
                @click="addNewItem"
            >
                <p>+</p>
            </div>
            <div v-else
                @dblclick="deleteGridItem(props.item)"
                @contextmenu.prevent="handler"
            >
                {{props.item}}
            </div>
        </template>
    </grid>
</template>

<script>
import Vue from 'vue'
import Grid from 'vue-js-grid'
Vue.use(Grid)
export default {
    components: {
        
    },
    data () {
        return {
            items: [
                'Programmierkurs 1',
                'Programmierkrus 2',
                'Einführung in Hallo',
                'Was geht abologie',
                'CoronaMorona',
                'Privat',
                'Privat',
                '-__-'
            ],
            counter: 0
        }
        
    },
    methods: {
        handler: function() {
                
        },
        addNewItem: function(){
            this.items.push("test" + ++this.counter);
            var temp = this.items[this.items.length - 1];
            this.items[this.items.length - 1] = this.items[this.items.length - 2]
            this.items[this.items.length - 2] = temp;
        },
        deleteGridItem: function(item){
            const index = this.items.indexOf(item);
            if(index > -1)
                this.items.splice(index, 1);
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/theme.scss";
.v-grid{
    z-index: 5;  
    left: 17em;
    top: 3em;
}
/*
.v-grid-item-wrapper{

}
*/
.v-grid-item-wrapper div{
    border: 1px black solid;
    border-radius: 1rem;
    background-color: $home_menu_color;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    box-sizing: border-box;
    
    letter-spacing: 0.1em;
    width: 250px;
    height: 250px;
    margin: 1rem;
    color: #ab2121;
}
#addNewItem{
    background-color: #384b5e;
    display: flex;
    
}
#addNewItem p {
    font-size: 8em;
    margin: auto !important;
}
</style>