<template>
    <div id="containerHome" class="canttouchme">
        <HeaderNet/>
        <ControlCenter
            :bname="name" 
            @profilSwitch=profilSwitch
        />
        <component :name2="name" v-bind:is="currentTabComponent"></component>
        

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
    import Netz from "./HomeComp/Netz"; 
    import GridScreen from "./HomeComp/GridScreen";
    
    export default {
        components: {
            ControlCenter,
            Profil,
            HeaderNet,
            //Grid_ui,
            Netz,
            GridScreen
        },
     
        props: [ 'name' ],
        data:() =>({
          currentTab: "grid-screen",
          /*tabs: ["grid-screen", "Profil"],*/
          logInfo: ["", ""],
        }),
        computed: {
          currentTabComponent: function() {
            return this.currentTab.toLowerCase();
          }
        },
        methods:{
            profilSwitch(){
                this.currentTab = "Profil"
            }
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
    //font-size: 1.1em;
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

body {
    background-color: $home_background_color;
}

</style>