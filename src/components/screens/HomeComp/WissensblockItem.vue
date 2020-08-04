<template>
    <div v-if="item.id==0" class="emptyBlock" @click="createNet">
        <p>{{item.name}}</p>
    </div>
    <div v-else>
        <span v-if="message==''" >
            <input v-model.lazy="message" placeholder="InsertName" id="boxInputName" autofocus>
        </span>
        <span v-else id="boxName" @click="message=''">
            {{item.name=message}}
        </span>
    </div>
</template>

<script>
export default {
    name: "WissensblockItem",
    props: ['item'],
    methods: {
        createNet() {
            this.$emit('addNet', this.item)
        }
    },
    data: () => ({
        message: ""
    })
}
</script>

<style lang="scss">
.emptyBlock{
    color: darkslategray;
    &:hover{
        transition: all .75s;
        z-index: 2;
        transform: scale(1.05);
        color: darken($color: darkslategray, $amount: 5);
        &:after{
            transition: all 1s;
        }
    }
    
}
.emptyBlock p {
    margin: auto;
    font-size: 8em;
}

#boxInputName{
    margin-bottom: .5em;
    width: 11em;
    height: 2em;
    font-size: 1em;
    border: 0em;
}

#boxName{
    padding-bottom: .3em;
    font-size: 2em;
}
</style>