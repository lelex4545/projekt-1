<template>
    <div id="containerHome" class="canttouchme">
        <ControlCenter/>
        <div id="headerNet" class="containerDesignHome">
            <H1>Insert Wissensnetzname</H1>
        </div>
        <Wissensblock/>
    </div>
</template>

<script>
import ControlCenter from "./HomeComp/ControlCenter";
import Wissensblock from "./HomeComp/Wissensblock";
export default {
    components: {
        ControlCenter,
        Wissensblock
    }
}
</script>

<style>
.containerDesignHome {
  border-radius: 1em;
  background-color: whitesmoke;/*#009a93;*/
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

    color: rgb(30, 39, 80);
    display: flex;
    padding-left: 1em;
    align-items: center;
    border-radius: 0;
    border: 0px;
    /*border-bottom: 1px solid black;*/
    font-size: .6em;

    box-shadow: 1px 1px 2px rgb(126, 126, 126);
}


@media screen and (max-width: 960px) {
  
}

@media screen and (max-width: 480px) {

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