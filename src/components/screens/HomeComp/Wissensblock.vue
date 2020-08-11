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
        nets: [{id: 0, name: "+"}],
        temp: WissensblockItem
    }),
    methods: {
        addNetItem () {
            this.nets.push({id: this.nets.length, name: ""})
            this.temp = this.nets[this.nets.length-1]
            this.nets[this.nets.length-1] = this.nets[this.nets.length-2]
            this.nets[this.nets.length-2] = this.temp
        }
    }
}
</script>

<style lang="scss">
#netBox {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 3em;
    left: 17em;
    z-index: -1;
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