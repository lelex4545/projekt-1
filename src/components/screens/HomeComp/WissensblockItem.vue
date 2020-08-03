<template>
    <div v-if="item.id==0" class="emptyBlock" @click="createNet">
        <p>{{item.name}}</p>
    </div>
    <div v-else>{{item.name}}</div>
</template>

<script>
export default {
    name: "WissensblockItem",
    props: ['item'],
    methods: {
        createNet() {
            this.$emit('addNet', this.item)
        }
    }
}
</script>

<style>
.emptyBlock{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    color: gold;
}
.emptyBlock p {
    font-size: 8em;
}
</style>