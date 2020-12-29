<template>
    <div id="containerHome" class="canttouchme">
        <HeaderNet id="head"/>
        <ControlCenter id="controlCenter" :bname="name" @profilSwitch=profilSwitch @aktKategorie2="catchData"/>
        <keep-alive>
            <component id="flexComp" :name2="name" :kategorie="aktKategorie" v-bind:is="currentTabComponent"></component>
        </keep-alive>

        <!-- <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab"
        >
            {{ tab }}
        </button> -->
    </div>
</template>

<script>
    import ControlCenter from "./HomeComp/ControlCenter";
    import Profil from "./HomeComp/Profil";
    import HeaderNet from "./HomeComp/HeaderNet";
    //import Grid_ui from "./HomeComp/Grid_ui";
    import GridScreen from "./HomeComp/GridScreen";
    
    export default {
        components: {
            ControlCenter,
            Profil,
            HeaderNet,
            //Grid_ui,
            GridScreen
        },
     
        props: [ 'name' ],
        data:() =>({
          currentTab: "grid-screen",
          /*tabs: ["grid-screen", "Profil"],*/
          logInfo: ["", ""],
          aktKategorie: null,
          item: null,
        }),
        computed: {
          currentTabComponent: function() {
            return this.currentTab.toLowerCase();
          }
        },
        methods:{
            profilSwitch(){
                this.currentTab = "Profil"
            },
            catchData(kategorie){
                this.currentTab ="Grid-Screen"
                this.aktKategorie=kategorie;
            },
            transportItem(item){
                this.item = item;
                this.currentTab = "Netz"
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

    grid-auto-columns: 15% 80%;
    grid-auto-rows: 45px 925px;

    //font-size: 1.1em;
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

#controlCenter{
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

#flexComp{
    grid-area: comp;

    /*display: flex;
    align-items: center;
    flex-flow: column;*/

    color: $div_color; 
    profil{
        margin-left: 10em;
    }
}

.canttouchme {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

</style>