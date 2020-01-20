<template>
  <div class="content">
    <div class="unit-name"></div>
  </div>
</template>

<script>
  export default{
    name:'edit',
    data(){
      return{
        formData:{
          id:'',
          name:'',
          lines:0,
          count:0,
          threshold:3
        }
      }
    }
  }
</script>

<style>
</style>
