<template>
<div>
  <mindmap
    :nodes="nodes"
    :connections="connections"
    :editable="true"
  />
</div>
</template>


<script>
import map from './map';
export default {
    name: 'MyMindmap',
    data() {
      return{
        ...map
      }
    }
  }
</script>

<style>
</style>