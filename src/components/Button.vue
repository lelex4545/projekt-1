<template>
    <a :href= "url" class="button">{{name}}</a>
</template>

<script>
export default {
    name: "Button",
    props: ['name', 'url'],
}
</script>

<style lang="scss" scoped>
$color: #037c76;

.button {
    display: inline-block;

    text-decoration: none;

    padding: .75rem 2rem;
    border-radius: 10rem;
    color: #fff;
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: .10rem;
    transition: all .3s;
    position: relative;
    overflow: hidden;
    z-index: 1;
    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 10rem;
        height: 100%;
        background-color: $color;
        border-radius: 10rem;
        z-index: -2;
    }
    &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0rem;
        height: 100%;
        background-color: darken($color, 3%);
        transition: all .2s;
        border-radius: 10rem;
        z-index: -1;
    }
    &:hover {
        color: #fff;
        &:before {
            width: 10rem;
        }
    }
}
</style>