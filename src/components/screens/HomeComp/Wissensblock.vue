<template>
    <div id="netBox">
        <WissensblockItem
            v-for="net in nets" :key="net.id"
            :item="net"

            @addNet="addNetItem"
 
            class="containerDesignHome net"
        />
    </div>
</template>

<script>
import WissensblockItem from "./WissensblockItem";
export default {
    name: "Wissensblock",
    components: {
        WissensblockItem
    },
    data: () => ({
        nets: [{id: 0, name: "+"}]
    }),
    methods: {
        addNetItem () {
            this.nets.unshift({id: this.nets.length, name: ""})
        }
    }
}
</script>

<style lang="scss">
#netBox {
    grid-area: n;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.net{
    display: flex;
    margin: 1em 1em 1em 1em;
    width: 13em;
    height: 13em;
    justify-content: center;
    align-items: flex-end;
}
</style>