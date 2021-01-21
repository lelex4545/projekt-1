<template>
    <div id="containerHome" class="canttouchme">
        <HeaderNet id="head"/>
        <ControlCenter id="controlCenter" :bname="name" @profilSwitch=profilSwitch @aktKategorie2="catchData"/>
        <vuescroll :ops="ops">
            <keep-alive>
                <component :id= compId :name2="name" :kategorie="aktKategorie" v-bind:is="currentTabComponent"></component>
            </keep-alive>
        </vuescroll>
    </div>
</template>

<script>
    import ControlCenter from "./HomeComp/ControlCenter";
    import Profil from "./HomeComp/Profil";
    import HeaderNet from "./HomeComp/HeaderNet";
    import vuescroll from 'vuescroll';
    import GridScreen from "./HomeComp/GridScreen";
    
    export default {
        components: {
            ControlCenter,
            Profil,
            HeaderNet,
            GridScreen,
            vuescroll
        },
     
        props: [ 'name' ],
        data:() =>({
          compId: "grid-screen",
          currentTab: "grid-screen",
          logInfo: ["", ""],
          aktKategorie: null,
          item: null,
          ops: {
                vuescroll: {},
                scrollPanel: {},
                rail: {gutterOfSide: '3px', opacity: 0.5,background: 'black',size: '10px',},
                bar: {
                    size: '10px',
                    background: 'whitesmoke',
                    opacity: 1,
                    keepShow: true,
                }
          }
        }),
        computed: {
          currentTabComponent: function() {
            return this.currentTab.toLowerCase();
          }
        },
        methods:{
            profilSwitch(){
                this.currentTab = "Profil"
                this.compId = "profilComp"
            },
            catchData(kategorie){
                this.currentTab ="Grid-Screen"
                this.aktKategorie=kategorie;
                this.compId = "grid-screen"
            },
            transportItem(item){
                this.item = item;
                this.currentTab = "Netz"
                this.compId = "Netz"
            }
        },
        mounted: function(){
           //this.name=this.$cookies.get("benutzername") 
        }
    }


</script>

<style lang="scss">
@import "@/assets/theme.scss";

button{
    top: 100px;
}

.containerDesignHome {
  border-radius: 1em;
  background-color: $home_menu_color;/*#009a93;*/
  box-shadow: 1px 1px 2px rgb(126, 126, 126);
  letter-spacing: 0.1em;
  transition: font-size 0.8s;
}
#containerHome {
    display: grid;
    grid-template-areas:
        "he he"
        "navi comp";

    grid-auto-columns: 15% 85%;
    grid-auto-rows: 45px 925px;
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

#controlCenter{
    grid-area: navi;

    display: flex;
    align-items: center;
    flex-flow: column;
    border-radius: 0;  
    padding-top: 2em;
    z-index: 1; 

    background-color: whitesmoke;
}

#grid-screen{
    grid-area: comp;
    color: $div_color; 
}

#Netz{
    grid-area: comp;
    color: $div_color; 
}

#profilComp{
    grid-area: comp;
    display: flex;
    align-items: center;
    flex-flow: column;
    color: $div_color; 
}
</style>