<template>
    <div v-if="item.id==0" class="emptyBlock" @click="createNet">  <!-- ??? -->
        <p>{{item.name}}</p>
    </div>
    <div v-else>
        <span @click="pressEnter">
            <input value = "Neues Netz" id="boxInputName" @keydown.enter="enter()">
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
        },
        enter(){
            document.getElementById('boxInputName').addEventListener('keyup',function(e){
                if(e.which == 13)
                    this.blur();
            });
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
    background:transparent;
    margin-bottom: .5em;
    width: 11em;
    height: 2em;
    font-size: 1em;
    border: 0em;
}

::placeholder{ /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: lightgrey;
    opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
 color: lightgrey;
}

::-ms-input-placeholder { /* Microsoft Edge */
 color: lightgrey;
}

#boxName{
    padding-bottom: .3em;
    font-size: 2em;
}
</style>