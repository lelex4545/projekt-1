<template>
    <div id="netContainer">
        <header-net id="head"/>
        <build-center id="control" @sendNode="sendNode" @sendConnectorNodes="sendConnectorNodes" :existingNodes="existingNodes"/>
        <vue-custom-scrollbar class="scroll-area"  settings="settings" @ps-scroll-y="scrollHanle">
            <netz id="net" :gridItem="item" :knotenName="knotenName" :connectorNodes="connectorNodes" @sendExistingNodes="sendExistingNodes"/>
        </vue-custom-scrollbar>  
    </div>
</template>

<script>
    import BuildCenter from "./NetzComp/BuildCenter";
    import HeaderNet from "./HomeComp/HeaderNet";
    import Netz from "./HomeComp/Netz";
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    import "vue-custom-scrollbar/dist/vueScrollbar.css"

    let existingNodes = []

    export default {
        props: [ 'item' ],
        data: ()=> ({
            knotenName: "",
            connectorNodes: [],
            existingNodes: existingNodes
        }),
        components: {
            BuildCenter,
            HeaderNet,
            Netz,
            vueCustomScrollbar
        },
        methods:{
            scrollHanle(evt) {
                console.log(evt)
            },

            sendNode(value){
                this.knotenName = value;
            },

            sendConnectorNodes(value){
                this.connectorNodes = value;
            },

            sendExistingNodes(value){
                this.existingNodes = value;
            }
        },
        settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false
        },
        mounted(){
            document.documentElement.style.overflow = 'hidden'
            //alert(this.item.titel)
        }
    }
</script>

<style lang="scss">
@import "@/assets/theme.scss";

    #netContainer {
        display: grid;


        grid-template-areas:
            "he he"
            "navi net";

        grid-auto-columns: 15% 85%;
        grid-auto-rows: 45px 925px;

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

        box-shadow: 1px 1px 2px rgb(126, 126, 126);
    }

    #control{
        grid-area: navi;
        display: flex;
        align-items: center;
        flex-flow: column;
        border-radius: 0;  
        padding-top: 2em;
        z-index: 1; 
        height: 100vh;
    }

    .scroll-area {
        grid-area: net;
        position: relative;
        margin: auto;
        width: 100%;  
        height: 100%; 
    }
</style>