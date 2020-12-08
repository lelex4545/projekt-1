<template>
    <div id="headerNet" class="containerDesignHome">
        <H1>Insert Wissensnetzname</H1>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "@/assets/theme.scss";

#headerNet {
    position: fixed;
    width: 100vw;
    height: 30px;

    color: $div_color;
    display: flex;
    padding-left: 1em;
    align-items: center;
    border-radius: 0;
    border: 0px;
    z-index: 20;
    font-size: .6em;

    box-shadow: 1px 1px 2px rgb(126, 126, 126);
}
</style>