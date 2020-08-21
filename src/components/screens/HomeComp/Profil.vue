<template>
    <div id="profilSettings">
        <h2>Profile</h2>
        <hr style="margin-bottom: 1em;">
        <div class="ueberschrift">Profile Picture</div>
        <div class="profilSetting">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" id= "pb2">
             <Button id="updatePb" class="canttouchme" name="Update Profil Picture" url @mousedown.stop />
             <p id="info">Must be JPEG, PNG, or GIF and cannot exceed 10MB.</p>
        </div>
        <div class="ueberschrift">Profile Settings</div>
        <div class="profilSetting" id="profilInfo">
            <p>Nutzername</p>
            <p>Vorname </p>
            <p>Nachname</p>
            <p>Email</p>
        </div>
    </div>    
</template>

<script>
import Button from "../LogInComp/Button";
export default {
    name: "Profil",
    components: {
        Button
    }
}
</script>

<style lang="scss">
    @import "@/assets/theme.scss";

    #profilSettings{
        position: absolute;
        top: 3em;
        left: 18em;
        color: $div_color;   
        /*display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;*/
    }

    .profilSetting{
        display: flex;
        justify-content: left;
        align-items: center;
        width: 40em;
        height: 8em;
        box-shadow: 1px 1px 2px rgb(126, 126, 126);
        background-color: $home_menu_color;
        margin-bottom: 2em;
        border-radius: 1em;
    }

    #pb2{
        width: 10%;
        border-radius: 5em;
        border: 1px solid $div_color;
        width: 6em;
        height: 6em;
        margin-left: 1em;
    }

    #updatePb{
        width: 15em;
        margin-left: 2em;
        text-transform:unset;
    }

    #info{
        margin-left: 2em;
        font-size: 0.6em;
    }

    #profilInfo{
        height: 20em;
        display: flex;
        flex-flow: column;
    }

    .ueberschrift{
        display: flex;
        align-self: flex-start;
        margin-bottom: 0.5em;
        margin-top: 0.5em;
        margin-left: 1em;
    }



</style>