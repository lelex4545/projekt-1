<template>
    <div>
        <WissensthemaItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            id="item"
            @getItem="getItem"
            @contextmenu="contextmenu"
            @deleteItem="deleteItem"
        />
        <div v-if="items.length<maxItemCount" id="item" @click="addItem">
            <p id="emptyItem">+</p>
        </div>
    </div>
</template>

<script>
import WissensthemaItem from "./WissensthemaItem";
export default {
    name: "Wissensthema",
    components: {
        WissensthemaItem
    },
    data: () => ({
        items: [],
        maxItemCount: 7
    }),
    methods: {
        addItem () {
            if(this.items.length < this.maxItemCount)
                this.items.push({id: this.items.length, name: "Neue Katogorie "})
        },
        deleteItem (item) {
            const index = this.items.indexOf(item);
            if(index > -1){
                alert(item.id)
                this.items.splice(index, 1);
            }
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/theme.scss";
#item{
    display: flex;
    align-items: center;
    justify-content: space-around;
    //justify-items: center;
    background-color: $div_color;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    border-radius: 0.5em;
    width: 14em;
    height: 4em;
    margin-top: 1em;
}
#emptyItem{
    color: $add_new_wissensnetz;
    margin: auto;
    font-size: 2.5em;
}
</style>