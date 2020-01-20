<template>
  <div class="customInfo">
    <div class="customInfo-top">
      <el-button type="primary" style="border-radius: 0;">客户详情</el-button>
    </div>
    <div class="body">
      <div class="particulars">
        <div class="logo" >
        <img v-if="company.path" :src="company.path">
        <div v-else class="logotext"><div class="logoText">公司logo</div></div>
        </div>
        <h2>{{company.sysName}}</h2>
      </div>
      <div>
        <div class="company">
          <div class="customerName text" style="font-size:16px; font-weight:700;margin-bottom: 30px;">{{ company.customerName }}</div>
          <div class="text">客户电话：{{ company.telephone }}</div>
          <div class="text">客户邮箱：{{ company.email }}</div>
          <div class="text">客户地址：{{ company.address }}</div>
          <div class="text" :title="company.mark" style="
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
            " >备注：{{ company.mark }}</div>
        </div>
        <el-button type="primary" style="border-radius: 0;margin-left:20px" v-btn="{text: '重置客户密码'}" @click="reset(company.telephone)">密码重置</el-button>
      </div>
      <div id="allmap" />
    </div>
    <div class="gap" />
    <div style="margin:0 0 10px 30px;">设备列表</div>
    <div class="gateway head-color">
      <span>网关名称</span>
      <span>网关状态</span>
      <span>关联层级</span>
      <span style="width:200px;">SN</span>
      <span>网关ID</span>
      <span>所属用户</span>
      <span>固件版本</span>
      <span>功能操作</span>
    </div>
    <div v-for="(item,index) in facilityList" :key="index">
      <div class="body-color">
        <span class="body-span">{{ item.name }}</span>
        <span class="body-span">{{ item.state }}</span>
        <span class="body-span">{{ item.gatewayInfoList }}</span>
        <span class="body-span" style="width:200px">{{ item.snNumber }}</span>
        <span class="body-span">{{ item.id }}</span>
        <span class="body-span">{{ item.customerName }}</span>
        <span class="body-span">{{ item.version }}</span>
        <span class="body-span click" @click="information(item)">设备详情</span>
      </div>
      <div v-if="detailedId==item.id" class="">
        <div class="show">
          <div style="margin-left:3%;margin-top:5px;">绑定设备</div>
          <el-button class="btn" type="primary" size="mini" @click="pack">收起</el-button>
        </div>
        <div class="show-head">
          <div>绑定设备名称</div>
          <div>关联设备</div>
          <div>数据模板</div>
          <div>通信协议</div>
        </div>
        <div v-for=" i of detailed" :key="i" class="show-body">
          <div>{{ i.deviceName }}</div>
          <div>{{ i.name }}</div>
          <div>{{ i.tplName }}</div>
          <div>{{ i.agreement }}</div>
        </div>
        <div  class="show-body" v-if="Object.keys(detailed).length==0" >没有搜索到相关内容</div>
      </div>
    </div>
    <div v-if="Object.keys(facilityList).length==0" class="body-color"> 没有搜索到相关内容 </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      company: {},
      facilityList: [], // 网关设备信息
      page: 1, // 页码
      rows: 10, // 数据量
      detailed: {}, // 设备详情
      detailedId: '',

    }
  },
  created(){
       this.$ajax({
         url:$$(`/custom/customer?id=${this.$route.query.id}`),
         method:"get",
       }).then( res => {
         console.log(res.data.data)
          this.company = res.data.data
          this.company.path = process.env.VUE_APP_BASE_API +this.company.path
          this.mapShow()
          this.facility()
       })
  },
  methods: {
    reset(res) { // 重置密码
         this.$confirm('密码将重置为初始密码?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                      this.$ajax({
                      url: $$(`/custom/customer/resetPassword?telephone=${res}`),
                      method: 'post'
                      }).then(res => {
                        if(res.status==200){
                            this.$message({
                            type: 'success',
                            message: '重置成功!'
                            });
                        }
                      })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                         message: '已取消重置'
                    });
             });


    },
    pack() {
      this.detailedId = ''
    },
    information(res) {        //plc列表
      this.detailedId = res.id
      const that = this
      this.$ajax
        .get($$('/plc/list'), { params: { gatewayId: res.id,rows:20000 }})
        .then(function(data) {
          that.detailed = data.data.data.list
        })
    },
    facility: function() {      //网关列表
    var that = this
      if(this.company.id){
        this.$ajax
        .get($$('/gateway/list'), { params: { page: this.page, customerId: this.company.id }})
        .then(function(data) {
          that.facilityList = data.data.data.list
          for(var i of that.facilityList){
          if(i.state=="0"){
              i.state = "离线"
          }else{
            i.state = "在线"
          }
          }
          
        })
      }

    },
    mapShow: function() {
      var th = this
      // 创建Map实例
      var map = new BMap.Map('allmap',{enableMapClick:false})
      // 初始化地图,设置中心点坐标，
      var point = new BMap.Point(th.company.longitude,th.company.latitude)
      // 创建点坐标，获得公司的经纬度坐标
      map.centerAndZoom(point, 15)
      map.enableScrollWheelZoom()
      // map.setMapStyleV2({
      //   styleId: 'b6b7251e5a82776f28cad5c468bcb5e4'
      // })
      var marker = new BMap.Marker(point)
      map.addOverlay(marker)
    }
  }
}

</script>

<style  scoped >
.customInfo{
    /* height: 100vh; */
    margin: 20px;
    background-color: rgb(27,35,51);
    color: white;
}
.customInfo-top{
  height: 38px;
  width: 100%;
  background: #273753;
  border-radius: 10px 0 0 0;
  overflow: hidden;
}
.body{
    padding: 10px;
    margin-top:20px;
    display:flex;
    justify-content:space-around;
}
.logo {
  margin-left: 10px;
  display: flex;
  justify-content: center;
}
.particulars{
    width: 300px;
    height: 200px;
}
.particulars h2{
  text-align: center;
  margin-top:20px; 
}
.logotext{
    width: 300px;
    height: 200px;
    text-align: center;
    color: white;
    border:1px solid wheat;
}
.logoText{
    padding-top: 80px;
}
.company{
    display: flex;
    flex-direction:column;
}
.text{
    font-size: 14px;
    margin-bottom: 10px;
    width: 300px;
    margin-left: 20px;
    margin-right:20px;
    word-wrap:break-word; 
    line-height: 22px;
    letter-spacing: 1px;
}
#allmap{
    width: 920px;
    height: 300px;
}
.gap{
    font-size: 14px;
    height: 20px;
    background-color: #1b2232;
}
.gateway span{
     width: 8vh;
}
.gateway span:nth-child(5),.gateway span:nth-child(6){
    width: 200px;
}
.gateway{
    display: flex;
    justify-content: space-around;
    background-color: #1b2233;
    }
.head-color{
    font-weight: 700;
    color: #199af5;
    border:1px solid rgb(81, 86, 90);
    background-color: rgb(35,49,73);
    padding-bottom: 20px;
    padding-top: 20px;
    }
.body-color{
    padding: 20px 0 20px 0;
    display: flex;
    justify-content: space-around;
    border:1px solid rgb(81, 86, 90);
    border-top: 0;
    background-color: #161e2b;
    color: white;
    }
    .body-span{
        width: 8vh;
        text-overflow:ellipsis;
        word-wrap:break-word;
    }
    .body-span:nth-child(5),.body-span:nth-child(6){
        width: 200px;
    }
   .click{
    color: rgb(25, 154, 245);
    text-decoration:underline;
    cursor: pointer;
   }
   .show{
    padding: 10px;
    display: flex;
    justify-content: space-between;
    vertical-align: top;
    color:white;;
    background-color: #1b2232;
    border:1px solid rgb(81, 86, 90);
    border-top:0;
   }
  .pack{
      margin-right: 5%;
  }
  .show-head{
      padding: 20px 0 30px 0;
      height: 40px;
      display: flex;
      justify-content: space-around;
      color: rgb(25, 154, 245);
      font-weight: 700;
      border:1px solid rgb(81, 86, 90);
      background-color: rgb(35,49,73);
      border-top:0;
  }
  .show-head div{
      width: 200px;
  }
  .show-body{
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    border:1px solid rgb(60, 62, 63);
    border-top: 0;
    background-color: #1b2232;
    padding: 20px 0 30px 0;
      }
 .show-body div{
    width: 200px;
    text-overflow:ellipsis;
    word-wrap:break-word;
}
.btn{
    margin-right:30px;
    font-size: 14px;
    text-align: center;
}
.emptyData{
  text-align: center;
  margin-top: 20px;
}
</style>
