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
.testtest{
  z-index: 10;
}
.conDesign {
  border-radius: 1em;
  background-color: #009a93;
  border: .5px solid black;
  padding: 1em;
  width: 22em;
  height: 9em;
  font-size: 1.3em;
  letter-spacing: 0.1em;
  transition: font-size 0.65s;
}


.canttouchme {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

$color: #037c76;
input {
  border: 1px solid #034d4a;
  border-radius: 0.5em;
  background-color: #037c76;
  color: white;
  width: 16.2em;
  height: 1.7em;
  text-align: center;
  font-size: 0.8em;
  &:focus {
    outline: none;
    background-color: darken(#037c76, 7%);
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