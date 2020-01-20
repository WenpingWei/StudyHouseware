<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted(){
    window.onblur = ()=>{
      this.$store.state.time = false
      this.$store.state.table = false
      this.$store.state.animation = false
      console.log("离开页面")
    }
    window.onfocus = ()=>{
      console.log("激活页面")
      this.$store.state.time = true
      this.$store.state.table = true
      this.$store.state.animation = true
    }
  }
};
</script>
<style>

</style>

