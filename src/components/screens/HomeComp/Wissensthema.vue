<template>
    <div>
        <WissensthemaItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            id="item"
            @deleteItem="deleteItem"
            @contextmenu="contextmenu"
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
        maxItemCount: 7,
    }),
    methods: {
        addItem () {
            this.items.push({id: this.items.length, name: "Neue Katogorie "})
        },
        deleteItem (item) {
            const index = this.items.indexOf(item)
            if(index > -1){
                this.items.splice(index, 1)
                for(var i=index; i < this.items.length; i++){
                    this.items[i].id = i;
                }
            }
        },
        contextmenu (item)
        {
            alert(item.id)
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