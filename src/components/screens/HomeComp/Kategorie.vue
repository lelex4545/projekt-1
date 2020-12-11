<template>
    <div class="root" @click="show">
      <button @click="addItem">Add Item</button>
      <button>Remove Item</button>
      <SlickList lockAxis="y" v-model="items" :lockToContainerEdges="true" lockOffset="0%">
        <SlickItem id="kItem" v-for="(item, index) in items" :index="index" :key="index">
          {{ item }}
        </SlickItem>
      </SlickList>
    </div>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort';
export default {
    name: 'Kategorie',
    components: {
        SlickItem,
        SlickList
    },
    data() {
        return{
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
        }
    },
    methods: {
        show: function(){
            console.log(this.items)
        },
        addItem: function(){
            this.items.push('Items ' + (this.items.length+1))
        }
    }
}
</script>

<style lang="scss">
.root{
    margin-top: 5px;
    //background-color: #384b5e;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
#kItem{
    background: #384b5e;
    border-radius: .5rem;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    height: 50px;
    width: 250px;
    color: white;
    //border: 1px solid black;

    z-index: 10;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    font-size: 1em;
    letter-spacing: 0.1em;
    margin: .5em;
}
</style>