<template>
  <div class="header">
    <div class="sys-name">
      <slot>电缆断线检测控制系统</slot>
    </div>
    <div class="felx">
      <div class="net"></div>
      <div  class="systime">11:22<br/>2020/01/16</div>
    </div>
  </div>
</template>

<script>
  // import {getDateTime} from '@/util/'
  export default{
    name:'vsHeader',
    components:{},
    data(){
      return{
        // dateTime:{
        //   year:2019,
        //   mon:1
        // }
      }
    }
  }
</script>

<style scoped>
  .header{
      display: flex;
      justify-content: space-between;
    	height: 80px;
    	background-color: #1d2236;
      align-items: center;
      padding: 0 45px;
  }
  .sys-name{
    font-family: MicrosoftYaHei;
    font-size: 28px;
    letter-spacing: 3px;
    color: #ffffff;
    display: block;
  }
  .felx{
    display: flex;
   justify-content: space-between;
     align-items: center;
  }
 .net{
    background: url(../assets/img/net_01.png);
    background-position: ;
    width: 28px;
    height: 30px;
    line-height: 80px;
  }
  .systime{
    width: 110px;
    	height: 44px;
    	font-family: MicrosoftYaHei;
    	font-size: 20px;
    	line-height: 22px;
    	text-align: center;
    	letter-spacing: 0px;
    	color: #ffffff;
  }
</style>
