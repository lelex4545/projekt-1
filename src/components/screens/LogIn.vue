<template>
    <div>
        <Button item="Anmelden" url="http://www.fh-dortmund.de"/>
        <br>
        <Button item="Registrieren" url="http://www.vuejs.de"/>
    </div>
</template>

<script>
import Button from "./../Button"
export default {
    name: "LogIn",
    components: {
        Button
    }
}
</script>

<style>

</style>