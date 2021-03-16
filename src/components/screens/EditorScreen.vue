<template>
    <div id="editContainer">
        <header-net id="head"/>
        <navigation-center id="navCenter"  @sendLinkEvent="sendLinkEvent" @sendSaveEvent="sendSaveEvent" @sendBackEvent="sendBackEvent" :knotenId="knotenId"/>
        <text-editor id="textEditor" ref="childComponent" :knotenId="knotenId"/>
    </div>
</template>

<script>
import NavigationCenter from './EditorComp/NavigationCenter.vue'
import HeaderNet from './HomeComp/HeaderNet.vue'
import TextEditor from './EditorComp/TextEditor.vue'

export default {
    components: { 
        TextEditor, 
        NavigationCenter, 
        HeaderNet 
    },
    methods:{
        sendLinkEvent(){
            this.$refs.childComponent.linkEvent();
        },
        sendSaveEvent(){
            this.$refs.childComponent.saveEditor();
        },
        sendBackEvent(){
            this.$refs.childComponent.backEditor();
        }
    },
    props:['knotenId']
    
}
</script>

<style lang="scss" scoped>
@import "@/assets/theme.scss";

#editContainer {
    display: grid;


    grid-template-areas:
        "he he"
        "navi edit";

    grid-auto-columns: 15% 85%;
    grid-auto-rows: 45px 925px;

}

#textEditor{
    grid-area: edit;

    display: flex;
    justify-content: center;
}

#head{  
    grid-area: he;

    color: $div_color;
    display: flex;
    padding-left: 1em;
    align-items: center;
    border-radius: 0;
    border: 0px;
    z-index: 20;
    font-size: .6em;
    background-color: whitesmoke;

    box-shadow: 1px 1px 2px rgb(126, 126, 126);
}

#navCenter{
    grid-area: navi;
    display: flex;
    align-items: center;
    flex-flow: column;
    border-radius: 0;  
    padding-top: 2em;
    z-index: 1; 
    background-color: whitesmoke;
    height: 100vh;
}
</style>