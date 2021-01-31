<template>
    <div id="netContainer">
        <header-net id="head"/>
        <build-center id="control" @sendNode="sendNode" @sendConnectorNodes="sendConnectorNodes" :existingNodes="existingNodes" :netzId="netzId"/>
        <vuescroll id="scroll-area" :ops="ops">
            <netz id="net" :gridItem="item" :knotenName="knotenName" :connectorNodes="connectorNodes" @sendExistingNodes="sendExistingNodes" @sendNetzId="catchNetzId"/>
        </vuescroll>
    </div>
</template>

<script>
    import BuildCenter from "./NetzComp/BuildCenter";
    import HeaderNet from "./HomeComp/HeaderNet";
    import Netz from "./HomeComp/Netz";
    import vuescroll from 'vuescroll';

    let existingNodes = []

    export default {
        props: [ 'item' ],
        data: ()=> ({
            knotenName: "",
            connectorNodes: [],
            netzId: -1,
            existingNodes: existingNodes,
            ops: {
                vuescroll: {},
                scrollPanel: {},
                rail: {gutterOfSide: '6px',},
                bar: {
                    size: '10px',
                    background: '#c1c1c1',
                    keepShow: true,
                }
            }
        }),
        components: {
            BuildCenter,
            HeaderNet,
            Netz,
            vuescroll
        },
        methods:{
            sendNode(value){
                this.knotenName = value;
            },

            sendConnectorNodes(value){
                this.connectorNodes = value;
            },

            sendExistingNodes(value){
                this.existingNodes = value;
            },
            catchNetzId(id){
                this.netzId = id;
            }
        },
        mounted(){
            //document.documentElement.style.overflow = 'hidden'
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
        background-color: whitesmoke;

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
        background-color: whitesmoke;
    }

    #scroll-area {
        position: fixed;
        /*grid-area: net;
        
        margin: auto;
        width: 100%;  
        height: 100%; */
    }

    #net{
        grid-area: net;
        //position: fixed;
    }

</style>