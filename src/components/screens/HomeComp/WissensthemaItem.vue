<template>
    <div v-if="item.id==0" class="emptyThema" @click="createThema">
        <p>{{item.name}}</p>
    </div>
    <div v-else>{{item.name}}</div>
</template>

<script>
export default {
    name: "WissensthemaItem",
    props: ['item'],
    methods: {
        createThema() {
            this.$emit('addThema', this.item)
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/theme.scss";

.emptyThema{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    color: $add_new_wissensnetz;
}
</style>