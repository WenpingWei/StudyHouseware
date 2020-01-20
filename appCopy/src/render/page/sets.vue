<template>
  <div class="content" >
    <div class="flex-row" style="margin: 0 -10px;">
      <vs-chk class="f1" v-for="item in 3"  :key="item.id"></vs-chk>
    </div>
    <div class="flex-row" >
      <div class="btn-group"></div>
      <vs-kg></vs-kg>
    </div>
    <div class="head"><div>dsdsdd</div></div>
  </div>
</template>

<script>
  import chk from '../components/chk.vue'
  import kg from '../components/switch.vue'
  export default{
    name:'chk',
    components:{
      'vs-chk':chk,
      'vs-kg':kg
    },
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
  .head{
    div{
      color: red;
      font-size: 12px;
    }
  }
  .content{
    width: 1024px;
    background-color: #283247;
    height: calc(100%-80px);
    box-sizing: border-box;
    padding: 30px 40px 40px;
 }
  .flex-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .f1{
    margin: 0 10px;
  }
</style>
