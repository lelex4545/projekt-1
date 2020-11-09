<template>
    <VueTrix id = 'editor' v-model="editorContent"/>
</template>

<script>
import VueTrix from 'vue-trix'

export default {
    name: 'TextEditor',
    props: ['trix'],
    data(){
        return{
            attachment_content: '',
        }
    },
    components: {
        'VueTrix': VueTrix
    }
}
</script>

<style>

 </style>