<template>
    <div id="controlCenter" class="containerDesignHome">
        <div id ="profil">
            <div id="profilBild">
                <img src="https://media1.tenor.com/images/bb516b458a66c715aca4c7f6076813bb/tenor.gif?itemid=14806536" id="pb">
            </div>
            <p>Thomas Beitler</p>
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
    height: 100vh;
}

#profil{
    display: flex;
    background-color: #037c76;
    width: 15em;
    height: 10em;
    margin-top: 2em;
    border: .5px solid black;
    border-radius: 1em;

    justify-content: center;
    align-items: center;
    flex-flow: column;
}

#profilBild{
    width: 5em;
    height: 5em;
   
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

</style>