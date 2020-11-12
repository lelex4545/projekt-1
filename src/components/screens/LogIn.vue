<template>
  <div class="canttouchme" id="canttouch">
    <div id="headerNet" class="containerDesignHome">
      <H1>Insert Wissensnetzname</H1>
    </div>
    <LogInElement 
      @catcher="catchData"
      @accEvent=accScreen
      @pwEvent=pwScreen
    />
    <br>
    <span v-if="accScope">
      <Regist 
        v-bind:positions.sync="positionsREG"
        @test=test
      />
    </span>
    <span v-if="pwScope">
      <PwForgot/>
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
    positionsREG: {}
  }),
  methods: {
    accScreen() {
      this.pwScope = false;
      this.accScope = !this.accScope;
    },
    pwScreen() {
      this.accScope = false;
      this.pwScope = !this.pwScope;
    },
    test(){
      console.log(this.possitionsREG)
    },
    catchData(value) {
     console.log(1);
     this.$emit('catcher2', value);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/theme.scss";
.containerDesignHome {
  border-radius: 1em;
  background-color: $home_menu_color;/*#009a93;*/
  /*border: .5px solid black;*/
  box-shadow: 1px 1px 2px rgb(126, 126, 126);
  letter-spacing: 0.1em;
  transition: font-size 0.8s;
}
#headerNet{
    /*grid-area: h;*/

    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 4em;

    color: $div_color;
    display: flex;
    padding-left: 1em;
    align-items: center;
    border-radius: 0;
    border: 0px;
    z-index: 5;
    font-size: .6em;

    box-shadow: 1px 1px 2px rgb(126, 126, 126);
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

#canttouch input {
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
.conDesign p {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
body {
    background-color: $login_background_color;
}
</style>