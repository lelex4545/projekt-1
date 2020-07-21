<template>
  <a :href="url" class="button">{{name}}</a>
</template>

<script>
export default {
  name: "Button",
  props: ["name", "url"]
};
</script>

<style lang="scss" scoped>
$color: #037c76;

.button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 8em;
  height: 2em;
  border-radius: .3em;
  color: #fff;
  text-transform: uppercase;
  font-size: .7em;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $color;
    border-radius: .3em;
    z-index: -2;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: darken($color, 7%);
    transition: all 0.3s;
    border-radius: .3em;
    z-index: -1;
  }
  &:hover {
    color: #fff;
    &:before {
      width: 100%;
    }
  }
}

* {
  text-decoration: none;
}
</style>