<template>
    <div v-if="item.id==0" class="emptyBlock" @click="createNet">  <!-- ??? -->
        <p>{{item.name}}</p>
    </div>
    <div v-else>
        <span @click="pressEnter">
            <input autocomplete="off" spellcheck="false" value = "Neues Netz" id="boxInputName" @keydown.enter="enter()">
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
@import "@/assets/theme.scss";

.emptyBlock{
    color: $div_color;
    &:hover{
        transition: all .75s;
        z-index: 2;
        transform: scale(1.05);
        color: darken($color: $hover_color_change, $amount: 5);
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
    color:$div_color;
    text-align: center;
    &:focus {
        outline: none;
    }
}
/*
::placeholder{ 
    color: lightgrey;
    opacity: 1; 
}

:-ms-input-placeholder { 
 color: lightgrey;
}

::-ms-input-placeholder { 
 color: lightgrey;
}
*/
#boxName{
    padding-bottom: .3em;
    font-size: 2em;
}
</style>