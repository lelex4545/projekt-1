<template>
    <div id="controlCenter" class="containerDesignHome">
        <div id ="profil">
            <div id="profilBild">
                <img src="https://i.redd.it/mzz6i3sjrsd11.png" id="pb">
            </div>
            <p id="name">Thomas Beitler</p>
        </div>
        <Wissensthema/>
    </div>
</template>

<script>
import Wissensthema from "./Wissensthema";
export default {
    components: {
        Wissensthema
    }
}
</script>

<style>
#controlCenter{
    grid-area: c;
    display: flex;
    align-items: center;
    flex-flow: column;
    border-radius: 0;
    border: 0px;
    border-right: 1px solid black;
    height: 100vh;
}

#profil{
    display: flex;
    background-color: #037c76;
    width: 12em;
    height: 7em;
    margin-top: 1em;
    border: .5px solid black;
    border-radius: 1em;

    justify-content: center;
    align-items: center;
    flex-flow: column;
}

#profilBild{
    width: 4em;
    height: 4em;
   
    transition: font-size 0.8s;

    display: flex;
    justify-content: center;
    align-items: center;
}

#pb{
    width: 100%;
    border-radius: 5em;
    height: auto;
}

#name{
    margin: .5em;
}


</style>