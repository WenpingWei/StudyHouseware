<template>
  <div class="pages">
    <myHeader></myHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from '../components/header.vue'
  export default{
    name:'landing-page',
    data(){
      return{

      }
    },
    components:{
      myHeader:header
    },
    methods:{

    },
    created() {

    },

  }
</script>

<style scoped>

</style>
