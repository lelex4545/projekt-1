<template>
    <div id="containerHome" class="canttouchme">
        <ControlCenter/>
        <div id="headerNet" class="containerDesignHome">
            <H1>Insert Wissensnetzname</H1>
        </div>
        <!--<Wissensblock/>-->
        <component v-bind:is="currentTabComponent"></component>

        <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab"
        >
            {{ tab }}
        </button>
    </div>
</template>

<script>
    import ControlCenter from "./HomeComp/ControlCenter";
    import Wissensblock from "./HomeComp/Wissensblock";
    import Graphtest from "./HomeComp/Graphtest";
    import Profil from "./HomeComp/Profil";
    
    export default {
        components: {
            ControlCenter,
            Wissensblock,
            Graphtest,
            Profil
        },
        data:() =>({
          currentTab: "Wissensblock",
          tabs: ["Wissensblock", "Profil", "Graphtest"]
        }),
        computed: {
          currentTabComponent: function() {
            return this.currentTab.toLowerCase();
          }
        }
    }


</script>

<style lang="scss">
@import "@/assets/theme.scss";

button{
    position: relative;
    top: 500px;
    left: 500px;
}

.containerDesignHome {
  border-radius: 1em;
  background-color: $home_menu_color;/*#009a93;*/
  /*border: .5px solid black;*/
  box-shadow: 1px 1px 2px rgb(126, 126, 126);
  letter-spacing: 0.1em;
  transition: font-size 0.8s;
}

#containerHome {
  /*
    display: grid;
    grid-template-areas: 
        "h h h h"
        "c n n n"
        "c n n n";
    grid-auto-columns: 14em 28% 28% 26%;
    grid-auto-rows: 2.5em 46% 46%;
*/
    font-size: 1.1em;
}
#headerNet{
    /*grid-area: h;*/

    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 4em;

    color: $div_color;
    display: flex;
    padding-left: 1em;
    align-items: center;
    border-radius: 0;
    border: 0px;
    z-index: 5;
    font-size: .6em;

    box-shadow: 1px 1px 2px rgb(126, 126, 126);
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