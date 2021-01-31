<template>
    <div id="navCenter" class="containerDesignHome">
        <h2 id="titel">{{knotenId}}</h2><br>
        <button id="linkButton" @click="linkEvent">Link</button><br>
        <button id="linkButton" @click="saveEditor">Save</button><br>
        <button id="linkButton" @click="backEditor">Zurück</button>
    </div>
</template>

<script>
export default {
    methods:{
        linkEvent(){
            this.$emit('sendLinkEvent', null);
        },
        saveEditor(){
            this.$emit('sendSaveEvent', null);
        },
        backEditor(){
            this.$emit('sendBackEvent', null);
        }
    },
    props:['knotenId'],
}
</script>

<style lang="scss" scoped>
@import "@/assets/theme.scss";

#titel{
    color: $div_color;
}
</style>