<template>
    <div id="regScreen" class="conDesign">
            <p id="regista">Registrieren</p>
            <p>Vorname </p>
            <p>Nachname</p>
            <p>Email</p>
            <p>Passwort</p>
            <p>Passwort bestätigen</p>
        <form>
            <input type="text">
            <input type="text">
            <input type="text">
            <input type="text">
            <input type="text">
        </form>
        <Button id="abs" name="Registrieren"/>
    </div>
</template>

<script>
import Button from "./../Button";
export default {
    components: {
    Button
  }
}
</script>

<style scoped>
#regScreen{
    display: grid;
    grid-auto-rows: 10% 15% 15% 15% 15% 15% 15%;
    grid-auto-columns: 25% 75%;
    grid-template-areas: 
        "r r"
        "p f"
        "p f"
        "p f"
        "p f"
        "p f"
        ". a";
    height: 15em;
}
#regista{
    grid-area: r;
    justify-self: center;
    margin: 0 0 .5em 0;
}
form{
    grid-area: f;
}
#abs{
    grid-area: a;
    display: flex;
    justify-self: center;
    align-self: flex-end;
    width: 10em;
}
</style>