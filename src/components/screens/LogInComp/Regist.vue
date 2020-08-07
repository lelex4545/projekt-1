<template>
    <div id="regScreen" class="conDesign">
            <p id="regista">Registrieren</p>
            <p>Vorname </p>
            <p>Nachname</p>
            <p>Email</p>
            <p>Passwort</p>
            <p>Passwort bestätigen</p>
        <form>
            <input type="text" size="20" maxlength="20" placeholder="gay" v-model="vorname">
            <input type="text" size="20" maxlength="20" v-model="nachname">
            <input type="email" size="30" v-model="email">
            <input type="password" size="20" maxlength="20" v-model="passwort">
            <input type="password" size="20" maxlength="20" v-model="passwortVerg">
        </form>
        <Button id="abs" name="Registrieren"/>
    </div>
</template>

<script>
import Button from "./Button";
export default {
    components: {
    Button
  },
  data: () => ({
      vorname: '',
      nachname: '',
      email: '',
      passwort: '',
      passwortVerg: ''
  })
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