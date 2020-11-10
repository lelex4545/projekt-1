<template>
    <div id="items">{{props.item}}</div>
</template>

<script>
export default {
    data () {
        return {
            items: [
                'a',
                'b',
                'c',
                'd',
                'e',
                'f',
            ]
        }
    }
}
</script>