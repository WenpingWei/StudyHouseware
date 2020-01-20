<template>
  <div class="content">
    <div class="top">
      <p class="square">
        <span>字段解释模板</span>
      </p>
      <div class="right-content">
        <template v-for="item in explainList">
          <h2 :key="item.title">{{item.title}}</h2>
          <div :key="item.content" class="msg">{{item.content}}</div>
        </template>
      </div>
    </div>
    <div class="bottom">
      <p class="square">
        <span>快速指南</span>
      </p>
      <div class="height-240">
        <div class="zn-content">
          <router-link to="/dataManage/dataNum2">
            <div>
              <img src="../../assets/images/common/dataTem.png" alt class="img">
              <div class="msg">新增数据模板</div>
            </div>
          </router-link>
          <img src="../../assets/images/common/arrow.png" alt class="arrow">
          <router-link to="">
            <div>
              <img src="../../assets/images/common/dataPoint.png" alt class="img">  
              <div class="msg">新增数据点</div>
            </div>
          </router-link>
          <img src="../../assets/images/common/arrow.png" alt class="arrow">
          <router-link to="/equipmentManage/menu2">
            <div>
              <img src="../../assets/images/common/addMonitorDevice.png" al class="img"t>
              <div class="msg" >新增监控设备</div>
            </div>
          </router-link>
          <img src="../../assets/images/common/arrow.png" alt class="arrow">
          <router-link to="/gateway/addGateway">
            <div>
              <img src="../../assets/images/common/gateWay.png" alt class="img">
              <div class="msg">新增网关</div>
            </div>
          </router-link>
          <img src="../../assets/images/common/arrow.png" alt class="arrow">
          <router-link to="">
            <div>
              <img src="../../assets/images/common/bindDevice.png" alt class="img">
              <div class="msg">新增绑定设备</div>
            </div>
          </router-link>
          <img src="../../assets/images/common/arrow.png" alt class="arrow">
          <router-link to="">
            <div>
              <img src="../../assets/images/common/gateWayDown.png" alt class="img">
              <div class="msg">网关数据下发</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  props: ["explainList"]
};
</script>


<style scoped>
.top {
  height: 67%;
  margin-bottom: 3%;
  background: #1b2333;
  padding-bottom: 30px;
  border-radius: 10px;

}
.bottom {
  background: #1b2333;
  height: 31%;
  border-radius: 10px;
}
.content {
  background: #121926;
  height: 100%;
  color: #fff;
}
.right-content {
  margin-left: 21px;
}
.right-content h2 {
  margin-top: 29px;
  font-size: 14px;
  font-weight: bold;
}
.right-content .msg {
  margin-top: 10px;
  font-size: 14px;
  line-height: 30px;
}
.height-240 {
  background: #1b2333;
}

.zn-content {
  display: flex;
  width: 96%;
  margin: 0 auto;
  padding-bottom: 20px;
  flex-wrap: wrap;
  justify-content: space-around;
}
.zn-content a {
  margin-top: 1.5rem;
}
.zn-content .msg {
  font-size: 12px;
  text-align: center;
  margin-top: 29px;
  width: 55px;
  line-height: 18px;
}
.zn-content .img{
  height: 40px;
}
.zn-content .arrow {
  height: 13px;
  position: relative;
  top: 36px;
  left: -10px;
}
.square {
  height: 35px;
  background: #273753;
  font-size: 14px;
  line-height: 35px;
  border-radius: 10px 10px 0 0;
}
.square span {
  padding-left: 18px;
}
</style>
