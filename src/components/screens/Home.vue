<template>
    <div id="containerHome">
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
    grid-auto-columns: 25% 25% 25% 25%;
    grid-auto-rows: 14% 43% 43%;
    width: 80.35em;
    height: 35em;
    font-size: 1.2em;
}
#headerNet{
    grid-area: h;
    display: flex;
    margin: 1em;
    padding-left: 1em;
    align-items: center;
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

</style>