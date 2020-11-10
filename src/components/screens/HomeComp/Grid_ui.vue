<template>
    <grid
        :draggable="true"
        :sortable="true"
        :items="items"
        :cellWidth="300"
        :cellHeight="300"
        >
        <template slot="cell" slot-scope="props">
            <div>{{props.item}}</div>
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
                'Privat',
            ]
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/theme.scss";
.v-grid{
    z-index: 5;  
    width: 50%;
    left: 17em;
    //top: 3em;
    //border: 1px solid black;

}
.v-grid-item-wrapper{
    border: 1px solid black;
    
}

.v-grid-item-wrapper div{
    border: 1px black solid;
    border-radius: 1em;
    background-color: $home_menu_color;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    box-sizing: border-box;
    letter-spacing: 0.1em;
    width: 250px;
    height: 250px;
    margin: 1em;
    color: red;
}
</style>