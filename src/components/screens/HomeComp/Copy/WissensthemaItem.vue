<template>
    <div 
        @contextmenu.prevent="contextmenu"
    >
        {{item.name}} {{item.id}}
        <div id="deleteItem" @click="deleteItem"></div>
    </div>
</template>

<script>
export default {
    name: "WissensthemaItem",
    props: ['item'],
    methods: {
        deleteItem(){
            this.$emit('deleteItem', this.item)
        },
        contextmenu(){
            this.$emit('contextmenu', this.item)
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/theme.scss";
#deleteItem{
    border: 1px solid black;
    border-radius: 0.3em;
    background-color: rgb(175, 45, 45);
    width: 1.2em;
    height: 1.2em;
}
</style>