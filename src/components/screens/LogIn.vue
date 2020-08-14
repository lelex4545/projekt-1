<template>
  <div class="canttouchme">
    <LogInElement :class="{testtest: hidden}"
      @accEvent=accScreen
      @pwEvent=pwScreen
    />
    <br>
    <span v-if="accScope">
      <Regist />
    </span>
    <span v-if="pwScope">
      <PwForgot />
    </span>
  </div>
</template>

<script>
import LogInElement from "./LogInComp/LogInElement"
import Regist from "./LogInComp/Regist";
import PwForgot from "./LogInComp/PwForgot";
export default {
  name: "LogIn",
  components: {
    Regist,
    PwForgot,
    LogInElement,
  },
  data: () => ({
    accScope: false,
    pwScope: false,
    hidden: false
  }),
  methods: {
    accScreen() {
      this.pwScope = false;
      this.accScope = !this.accScope;
    },
    pwScreen() {
      this.accScope = false;
      this.pwScope = !this.pwScope;
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/theme.scss";

.testtest{
  z-index: 10;
}

.conDesign {
  border-radius: 1em;
  background-color: $div_color;
  box-shadow: 1px 1px 2px rgb(29, 29, 29);
  padding: 1em;
  width: 22em;
  height: 9em;
  font-size: 1.3em;
  letter-spacing: 0.1em;
  transition: font-size 0.65s;
}


input {
  border: 1px solid #333838;
  border-radius: 0.5em;
  background-color: $login_input_color;
  color: white;
  width: 16.2em;
  height: 1.7em;
  text-align: center;
  font-size: 0.8em;
  &:focus {
    outline: none;
    background-color: darken($login_input_color, 7%);
  }
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

p {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .conDesign {
    font-size: 1em;
  }
}

@media screen and (max-width: 480px) {
  .conDesign {
    font-size: 0.75em;
  }
}
</style>