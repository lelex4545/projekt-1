<template>
    <div class="root" @click="show">
      <SlickList axis="x" lockAxis="x" v-model="items">
        <SlickItem v-for="(item, index) in items" :index="index" :key="index">
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
    display: flex;
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
    //grid-area: 1;
    width: 50px;
    height: 50px;
    border: 1px solid black;
}
</style>