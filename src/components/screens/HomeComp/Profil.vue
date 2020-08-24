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
            <p>Username</p>
            <p>First name</p>
            <p>Last name</p>
            <p>E-Mail</p>
            <p id="bio">Bio</p>
            <input type="text" size="20" maxlength="20" value="Byteler10" autocomplete="off" spellcheck="false" id="boxInputProfil"> 
            <input type="text" size="20" maxlength="20" value="Thomas" autocomplete="off" spellcheck="false">
            <input type="text" size="20" maxlength="20" value="Beitler" autocomplete="off" spellcheck="false">  
            <input type="text" size="20" maxlength="20" value="thomas_b@gmail.com" autocomplete="off" spellcheck="false">
            <textarea placeholder="Tell something about you..." autocomplete="off" spellcheck="false"></textarea>
        </div>
        <div class="ueberschrift">Change Password</div>
        <div class="profilSetting" id="changePw">
            <p>Old Password</p>
            <p>New Password</p>
            <p>Confirm Password</p>
            <Button id="updatePw" class="canttouchme" name="Change Password" url @mousedown.stop />
            <input type="password" size="20" maxlength="20" autocomplete="off" spellcheck="false">
            <input type="password" size="20" maxlength="20" autocomplete="off" spellcheck="false">
            <input type="password" size="20" maxlength="20" autocomplete="off" spellcheck="false">
        </div>
    </div>    
</template>

<script>
import Button from "../LogInComp/Button";
export default {
    name: "Profil",
    components: {
        Button
    },
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
        width: 45em;
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
        display: grid;
        grid-auto-flow: column;

        grid-auto-rows: 15% 15% 15% 15% 40%;
        grid-auto-columns: 25% 75%;
        grid-template-areas: 
            "name inpu"
            "name inpu"
            "name inpu"
            "name inpu"
            "name inpu";

    }

    #profilInfo input{
        width: 30em;
        height: 1.8em;
        border: 1px solid #ccc;
        border-radius: 0.5em;
        &:focus {
            outline: none;
            background-color: darken(#ccc, 7%);
        }
    }

    #profilInfo textarea{
        width: 30em;
        height: 7em;
        font-family: Tahoma, sans-serif;
        margin-bottom: 1em;
        border: 1px solid #ccc;
        border-radius: 0.5em;
        &:focus {
            outline: none;
            background-color: darken(#ccc, 7%);
        }
    }

    #bio{
        margin-bottom: 6em;
    }
    .ueberschrift{
        display: flex;
        align-self: flex-start;
        margin-bottom: 0.5em;
        margin-top: 0.5em;
        margin-left: 1em;
    }

    #changePw{
        height: 12em;
        display: grid;
        grid-auto-flow: column;

        grid-auto-rows: 25% 25% 25% 25%;
        grid-auto-columns: 25% 75%;
        grid-template-areas: 
            "pw in"
            "pw in"
            "pw in"
            "but but";

    }

    #changePw input{
        width: 30em;
        height: 1.8em;
        border: 1px solid #ccc;
        border-radius: 0.5em;
        &:focus {
            outline: none;
            background-color: darken(#ccc, 7%);
        }
    }

    #updatePw{
        display: flex;
        justify-self: center;
        grid-area: but;
        width: 15em;
            
    }


</style>