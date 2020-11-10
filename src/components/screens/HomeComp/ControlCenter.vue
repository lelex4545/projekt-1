<template>
    <div id="controlCenter" class="containerDesignHome">
        <div id ="profil" @click ="profilSwitch" class="canttouchme">
            <div id="profilBild">
                <!--<img src="https://i.redd.it/mzz6i3sjrsd11.png" id="pb">-->
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" id= "pb">
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
    },
    methods:{
        profilSwitch(){
            this.$emit("profilSwitch")
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/theme.scss";

#controlCenter{
    /*grid-area: c;*/
    display: flex;
    align-items: center;
    flex-flow: column;
    border-radius: 0;  

    position: fixed;
    left: 0;
    top: 0;
    padding-top: 4em;
    height: 100vh;
    width: 16em;
}

#profil{
    display: flex;
    /*background-color: #037c76;*/
    background-color: $div_color;
    width: 14em;
    height: 7em;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    border-radius: 1em;

    justify-content: center;
    align-items: center;
    flex-flow: column;

    &:hover {
        color: $hover_color_change;
        cursor: pointer;
    }
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