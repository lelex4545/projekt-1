<template>
    <div id="profilSettings">
        <div id="pbSetting">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" id= "pb2">
        </div>
    </div>    
</template>

<script>
export default {
    name: "Profil"
    
}
</script>

<style lang="scss">
    @import "@/assets/theme.scss";

    #profilSettings{
        position: absolute;
        top: 3em;
        left: 17em;
        color: black;
    }

    #pbSetting{
        display: flex;
        justify-content: left;
        align-items: center;
        width: 50em;
        height: 10em;
        box-shadow: 1px 1px 2px rgb(126, 126, 126);
        background-color: $home_menu_color;
    }

    #pb2{
        width: 10%;
        border-radius: 5em;
        border: 1px solid black;
        width: 7em;
        height: 7em;
        margin-left: 1em;
    }
</style>