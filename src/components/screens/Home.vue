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
  background-color: #009a93;
  border: .5px solid black;
  letter-spacing: 0.1em;
  transition: font-size 0.8s;
}

#containerHome {
    display: grid;
    grid-template-areas: 
        "c h h h"
        "c n n n"
        "c n n n";
    grid-auto-columns: 20% 27% 27% 26%;
    grid-auto-rows: 14% 43% 43%;

    font-size: 1.2em;
}
#headerNet{
    grid-area: h;
    display: flex;
    padding-left: 1em;
    align-items: center;
    border-radius: 0;
    border: 0;
    height: 2em;
}


@media screen and (max-width: 960px) {
  #containerHome {
    font-size: .75em;
  }
}

@media screen and (max-width: 480px) {
  #containerHome {
    font-size: 0.5em;
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