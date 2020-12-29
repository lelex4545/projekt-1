<template>
    <div id="editContainer">
        <header-net id="head"/>
        <navigation-center id="navCenter"/>
        <text-editor id="textEditor" :knotenId="knotenId"/>
    </div>
</template>

<script>
import NavigationCenter from './EditorComp/NavigationCenter.vue'
import HeaderNet from './HomeComp/HeaderNet.vue'
import TextEditor from './HomeComp/TextEditor.vue'

export default {
    components: { 
        TextEditor, 
        NavigationCenter, 
        HeaderNet 
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
        "nav edit";

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

    width: 100vw;
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
    grid-area: nav;
    display: flex;
    align-items: center;
    flex-flow: column;
    border-radius: 0;  
    padding-top: 2em;
    z-index: 1; 
    height: 100vh;
    background-color: whitesmoke;
}
</style>