<template>
    <div class="root" @click="show">
      <SlickList id="test" axis="xy" v-model="items">
        <SlickItem id="kItem2" v-for="(item, index) in items" :index="index" :key="index">
          {{ item }}
        </SlickItem>
      </SlickList>
    </div>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort';
export default {
    name: 'GridScreen',
    components: {
        SlickItem,
        SlickList
    },
    data() {
        return{
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
        }
    },
    methods: {
        show: function(){
            console.log(this.items)
        }
    }
}
</script>

<style lang="scss" scoped>
.root {
    //border: 1px solid black;
    //display: grid;
    //grid-template-areas: 
    //"1 1 1"
    //"1 1 1";

    z-index: 20;
    //flex-direction: row;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

#test{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 300px;
    margin-top: 50px;
}

#kItem2{
    background: #384b5e;
    border-radius: .5rem;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    height: 240px;
    width: 240px;
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