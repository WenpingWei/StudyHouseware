<template>
  <div class="plat-content" @click="notification">
    <slot name="square"></slot>
    <div>
      <p class="title">{{name}}</p>
      <p class="num"><span>{{num}}</span>{{unit}}</p>
    </div>
    <slot name="img"></slot>
  </div>
</template>

<script>
export default {
  name: 'PlatDetail',
  data() {
    return {
    }
  },
  props: ['name', 'num', 'unit'],
  computed: {},
  mounted() {
  },
  methods: {
    //告警设备，进入通知中心
    notification(){
      if(this.name == "告警设备"){
        this.$router.push({
        path:"/notifications/notificationsList"
       })
      }else if(this.name == "监控设备"){
        if(this.common.tabRender(this,"设备列表")){
          this.$router.push({
        path:"/equipmentManage/menu1"
        })
      }
        
      }else if(this.name == "企业客户数"){
        if(this.common.tabRender(this,"客户列表")){
          this.$router.push({
        path:"/custom/custom1"
        })
        }
       
      }
    },
    }
}
</script>

<style  lang="scss" scoped>
  .plat-content {
    display: flex;
    align-items: center;
    /*justify-content: space-around;*/
    width: 19%;
    border-radius: 10px;
    height: 98px;
    background: #121926;
    .square {
      width: 6px;
      height: 100%;
      border-radius: 10px 0 0 10px;
    }
    .title {
      font-size: 14px;
      color: #199af5;
    }
    p {
      margin: 0;
    }
    .num {
      font-size: 14px;
      color: white;
      margin-top: 15px;
      span {
        font-size: 30px;
        margin-right: 5px;
      }
    }
    img {
      margin-right: 15px;
      height: 54px;
    }
    .img-one {
      width: 60px;
    }
    .img-two {
      width: 58px;
    }
    .img-three {
      width: 54px;
    }
    .img-four {
      width: 62px;
    }
    .img-five {
      width: 56px;
      height: 61px;
    }
    &.user{
      .square {
        background: #199af5;
      }
      .title {
        color: #199af5;
      }
    }
    &.monitor {
      .square {
        background: #67f06f;
      }
      .title {
        color: #67f06f;
      }
    }
    &.monitor-point {
      .square {
        background: #ed8153;
      }
      .title {
        color: #ed8153;
      }
    }
    &.online-device {
      .square {
        background: #007de3;
      }
      .title {
        color: #007de3;
      }
    }
    &.alarm-device {
      .square {
        background: #f06666;
      }
      .title {
        color: #f06666;
      }
    }
    div:nth-of-type(2){
      margin-left: 12%;
      flex: 1;
    }
  }
</style>
