<template>
  <div class="dashboard-container">
    <div class="dashboard-plat">
      <h1>平台概况</h1>
      <div class="plat-contain">
        <vs-platDetail
          name="企业客户数"
          class="user"
          :num="platMsg.customCount"
          unit="家"
        >
          <div slot="square" class="square" />
          <img slot="img" src="../../assets/images/userNum.png" alt="" class="img-one">
        </vs-platDetail>
        <vs-platDetail name="监控设备" class="monitor" :num="platMsg.deviceCount" unit="台">
          <div slot="square" class="square" />
          <img slot="img" src="../../assets/images/monitorDevice.png" alt="" class="img-two">
        </vs-platDetail>
        <vs-platDetail name="监控点数" class="monitor-point" :num="platMsg.pointCount" unit="个">
          <div slot="square" class="square" />
          <img slot="img" src="../../assets/images/monitorPoint.png" alt="" class="img-three">
        </vs-platDetail>
        <vs-platDetail name="在线设备" class="online-device" :num="platMsg.olDeviceCount" unit="台">
          <div slot="square" class="square" />
          <img slot="img" src="../../assets/images/onlineDevice.png" alt="" class="img-four">
        </vs-platDetail>
        <vs-platDetail name="告警设备" class="alarm-device" :num="platMsg.warningDeviceCount" unit="台">
          <div slot="square" class="square"  />
          <img slot="img" src="../../assets/images/warnDevice.png"  alt="" class="img-five">
        </vs-platDetail>
      </div>
    </div>
    <div class="year-device-default" id="demo">
      <div class="fault-contain">
        <div class="chart-fault">
          <h2>年度设备故障统计</h2>
          <div>
            <div id="equipmentLoss" style="width:100%;height:100%;"></div>
            <!-- <vs-oneBar
              :arr="companyArr"
              :rotate="0"
              :flag="true"
              left="10%"
              pro="DUMP_QTY"
              name="故障数"
            /> -->
          </div>
        </div>
        <div class="chart-fault">
          <h2>设备故障客户占比</h2>
          <div>
            <div id="customer" style="width:100%;height:100%"></div>
            <!-- <vs-pie :arr="faultMsgArr" :legend="false" :index="0" /> -->
          </div>
        </div>
        <div class="chart-fault">
          <h2>客户设备统计</h2>
          <div id="equipmentAll"  ></div>
          <!-- <vs-oneBar
            :arr="customer"
            :rotate="25"
            top="7%"
            :flag="false"
            color="#025db0"
            left="10%"
            pro="DUMP_QTY"
            name=""
          /> -->
        </div>
      </div>
    </div>
    <div class="status-alarm">
      <div>
        <div class="user">
          <h2>即将到期客户设备</h2>
          <vs-commonTable class="mg-t-20" :list-total="freezeNumber" :rows="4">
            <ul slot="header" class="header">
              <li>客户名称</li>
              <li>设备名称</li>
              <li style="width: 195px">到期日期</li>
              <li>剩余时间</li>
              <li>联系电话</li>
            </ul>
            <template slot="content-one" scope="props" style="cursor: pointer;">
              <span @click="customerDires(props.item)" style="cursor: pointer;">{{ props.item.customerName }}</span>
              <span @click="customerDires(props.item)" style="cursor: pointer;">{{ props.item.deviceName }}</span>
              <span @click="customerDires(props.item)" style="width: 195px;cursor: pointer;">{{ common.dateFormat(props.item.expire) }}</span>
              <span @click="customerDires(props.item)" style="cursor: pointer;">{{ props.item.dayNum!="已到期"?props.item.dayNum+"天" : "已到期"  }}</span>
              <span @click="customerDires(props.item)" style="cursor: pointer;">{{ props.item.telephone }}</span>
            </template>
            <template slot="content-two" scope="props">
              <span @click="customerDires(props.item)" style="cursor: pointer;">{{ props.item.customerName }}</span>
              <span @click="customerDires(props.item)" style="cursor: pointer;">{{ props.item.deviceName }}</span>
              <span @click="customerDires(props.item)"  style="width: 195px;cursor: pointer;">{{ common.dateFormat(props.item.expire) }}</span>
              <span @click="customerDires(props.item)" style="cursor: pointer;">{{ props.item.dayNum!="已到期"?props.item.dayNum+"天" : "已到期" }}</span>
              <span @click="customerDires(props.item)" style="cursor: pointer;">{{ props.item.telephone }}</span>
            </template>
          </vs-commonTable>
        </div>
        <div class="user">
          <h2>告警状态</h2>
          <vs-commonTable class="mg-t-20" :list-total="alarmListArr" :rows="5">
            <template slot="content-one" scope="props">
              <span @click="redirectDetail(props)" style="cursor: pointer;">{{ props.item.customerName }}</span>
              <span @click="redirectDetail(props)" style="cursor: pointer;">{{ props.item.deviceName }}</span>
              <span @click="redirectDetail(props)" style="color: #ee8158;cursor: pointer;">{{ props.item.alarmMark }}</span>
              <span @click="redirectDetail(props)" style="width: 195px;cursor: pointer;">{{ common.datetimeFormat(props.item.updateTime) }}</span>
            </template>
            <template slot="content-two" scope="props">
              <span @click="redirectDetail(props)" style="cursor: pointer;">{{ props.item.customerName }}</span>
              <span @click="redirectDetail(props)" style="cursor: pointer;">{{ props.item.deviceName }}</span>
              <span  @click="redirectDetail(props)" style="color: #ee8158;cursor: pointer;">{{ props.item.alarmMark }}</span>
              <span @click="redirectDetail(props)" style="width: 195px;cursor: pointer;">{{ common.datetimeFormat(props.item.updateTime) }}</span>
            </template>
          </vs-commonTable>
        </div>
      </div>
    </div>
    <div class="fast-msg">
      <div>
        <div class="fast-left-wrapper">
          <h2 style="margin-left:px;">快速指南说明</h2>
          <div class="fast-left mg-t-20">
            <router-link to="/dataManage/dataNum2">
              <div>
                <img src="../../assets/images/common/dataTem.png" alt=""  class="img"> 
                <p>新增数据模板</p>
              </div>
            </router-link>
            <img src="../../assets/images/common/arrow.png" alt="" class="arrow">
            <div>
              <img src="../../assets/images/common/dataPoint.png" alt="" class="img">
              <p>新增数据点</p>
            </div>
            <img src="../../assets/images/common/arrow.png" alt="">
            <router-link to="/equipmentManage/menu2">
              <div>
                <img src="../../assets/images/common/addMonitorDevice.png" alt=""  class="img">
                <p>新增监控设备</p>
              </div>
            </router-link>
            <img src="../../assets/images/common/arrow.png" alt="">
            <router-link to="/gateway/addGateway">
              <div>
                <img src="../../assets/images/common/gateWay.png" alt=""  class="img">
                <p>新增网关</p>
              </div>
            </router-link>
            <img src="../../assets/images/common/arrow.png" alt="">
            <div>
              <img src="../../assets/images/common/bindDevice.png" alt=""  class="img">
              <p>新增绑定设备</p>
            </div>
            <img src="../../assets/images/common/arrow.png" alt="">
            <div>
              <img src="../../assets/images/common/gateWayDown.png" alt=""  class="img">
              <p>网关数据下发</p>
            </div>
          </div>
        </div>
        <div class="fast-right">
          <span>微信公众号平台</span>
          <img style="width:110px;height:110px;" src="../../assets/images/common/coedBig.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import platDetail from '@/views/dashboard/platDetail.vue'
import commonTable from '@/views/dashboard/commonTable.vue'
import oneBar from '@/views/dashboard/oneBar.vue'
import pie from '@/views/dashboard/pie.vue'
// import { setTimeout } from 'timers';

export default {
  props: ['arr', 'name', 'pro', 'left', 'rotate', 'bottom', 'top',
    'color', 'flag'],
  props2: ['arr', 'index', 'legend'],
  name: 'home',
  data() {
    return {
      myChart:"",
      myChart1:"",
      myChart2:"",
      freezeNumber: [],
      companyArr: [
        {
          'month': 1,
          'number': '2'
        }, {
          'month': 2,
          'number': '2'
        }, {
          'month': 3,
          'number': '2'
        }],
      customer: [],
      platMsg: {
        customCount: '',
        deviceCount: '',
        pointCount: '',
        olDeviceCount: '',
        warningDeviceCount: '',
        warningAlarmRecored: ''
      },
      alarmListArr: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.faultYear() // 年度设备故障统计
    this.faultPercent() // 设备故障客户占比
    this.customerCount() // 客户设备统计
    this.statistics() // 平台概况
    this.customerFun() // 即将到期客户
    this.alarmList() // 告警状态
    this.myChart = this.$echarts.init(document.getElementById('equipmentLoss'))
    this.myChart1 = this.$echarts.init(document.getElementById('equipmentAll'))
    this.myChart2 = this.$echarts.init(document.getElementById('customer'))
      window.addEventListener("resize",() => {
      this.myChart.resize();
      this.myChart1.resize();
      this.myChart2.resize();
    })
    //   window.onblur=(e)=>{
    //   this.myChart.clear()
    //   this.myChart1.clear()
    //   this.myChart2.clear()
    //   }
    //   window.onfocus=(e) =>{
    // this.faultYear() // 年度设备故障统计
    // this.faultPercent() // 设备故障客户占比
    // this.customerCount() // 客户设备统计
    //   }

      },
       beforeDestroy() {    //在vue实例销毁的时候，清理掉Echarts图表
        this.myChart.clear()
      this.myChart1.clear()
      this.myChart2.clear()
  },
      computed:{
        isCollapse(){
            return this.$store.state.isCollapse;
        },
         table(){
            return this.$store.state.table
         }
    },
      watch: {
    isCollapse(newValue, oldValue){
            console.log(this.$store.state.isCollapse+"======监听按钮事件"+"重置图表")
            setTimeout(()=>{
            this.myChart.resize()
            this.myChart1.resize()
            this.myChart2.resize()
            },500)
  },
   table(newValue, oldValue){
       if(newValue==false){
          //  this.myChart.clear()
          // this.myChart1.clear()
          // this.myChart2.clear()
       }else{
    // this.faultYear() // 年度设备故障统计
    // this.faultPercent() // 设备故障客户占比
    // this.customerCount() // 客户设备统计
       }
              
      }
  },
  methods: {      
    
     updateChart: function() {
      const option = {
        color: this.color || ['#199af5'],
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#283143'
            }
          },
          axisLabel: {
            show: true,
            color: '#b1bdcd',
            rotate: 0,
            fontSize: 14
          },
          splitLine: {
            lineStyle: {
              color: '#023d40'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          minInterval: 1,
          type: 'value',
          nameLocation: 'end',
          // boundaryGap: ['20%', '50%'],
          nameTextStyle: {
            color: '#b1bdcd',
            fontSize: 14,
            align: 'left'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#283143'
            }
          },
          axisLabel: {
            color: '#b1bdcd',
            fontSize: 16
            // formatter: '{value}万只'
          },
          splitLine: {
            // show: false,
            lineStyle: {
              color: '#283143'
            }
          }
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          icon: 'circle',
          right: 10,
          textStyle: {
            color: '#00b7ee',
            fontSize: 16
          }
        },
        grid: {
      
          left: "10%" || '6%',
          top: this.top || '21%',
          bottom: this.bottom || '16%',
          right: '2%'
        },
        tooltip: {
          //       formatter(params) {
          //         const div = `<div class="tooltip" style="width: 43px;
          // height: 51px;
          // background: url('../../assets/images/common/1.png');">${params.name}：${params.seriesId}</div>`
          //         return div
          //       }
            },
        dataset: {
          //   dimensions: ,
          source: this.companyArr
        },
        series: [
          {
            name: "",
            encode: {
              x: "",
              // y: this.pro
            },
            // data: data.val,
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                // borderColor: '#00b7ee',
                barBorderRadius: [30, 30, 0, 0]
                // borderWidth: 1
              }
            }
          }]
      }

      this.myChart.setOption(option, true)
    },
    faultYear() {
      this.$ajax({
        url: '/monitor/statistics/fault/devices',
        method: 'get'
      }).then((res) => {
        if (res.data.status === 200) {
          this.companyArr = res.data.data
          this.companyArr.filter(v => {
            return v.month = v.month + '月'
          })
          this.updateChart()
        }
      })
    },
    faultPercent() {
      this.$ajax({
        url: $$('/monitor/statistics/fault/percent'),
        method: 'get'
      }).then((res) => {
        if (res.data.status === 200) {
          const data = res.data.data
          const arr = []
          data.map(v => {
            v.value = v.percent
            delete v.percent
            arr.push(v)
          })
          this.faultMsgArr = arr
          const option = {
        color: ['#ffff00', '#199af5', '#00ffff', '#a847d7', '#025db0','#FF0000','#D5F7D5','#f541a1'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          // show: show,
          icon: 'circle',
          itemWidth: 11,
          itemHeight: 11,
          orient: 'vertical',
          left: 20,
          top: 30,
          itemGap: 16,
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        series: [
          {
            name: '故障信息',
            type: 'pie',
            radius: ['50%', '60%'],
            center: ['65%', '50%'],
            // center: ['80%', '20%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                formatter: '{d}%',
                position: 'outside'
              }
              // emphasis: {
              //   show: true,
              //   textStyle: {
              //     fontSize: '12',
              //     fontWeight: 'bold'
              //   }
              // }
            },
            labelLine: {
              normal: {
                // show: false,
                // length: 0,
                // length2: 0,
                fontSize: 16
              }
            },
            data: this.faultMsgArr
          }
        ]
      }
           this.myChart2.setOption(option,true)
        }
      })
    },
    customerCount() {
      this.$ajax({
        url: $$('/monitor/statistics/deviceNumber/customer'),
        method: 'get'
      }).then((res) => {
        if (res.data.status === 200) {
          this.customer = res.data.data
      const option = {
        color: "#025db0"|| ['#199af5'],
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#283143'
            }
          },
          axisLabel: {
            show: false,
            color: '#b1bdcd',
            rotate: 25,
            fontSize: 14
          },
          splitLine: {
            lineStyle: {
              color: '#023d40'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          minInterval: 1,
          type: 'value',
          nameLocation: 'end',
          // boundaryGap: ['20%', '50%'],
          nameTextStyle: {
            color: '#b1bdcd',
            fontSize: 14,
            align: 'left'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#283143'
            }
          },
          axisLabel: {
            color: '#b1bdcd',
            fontSize: 16
            // formatter: '{value}万只'
          },
          splitLine: {
            // show: false,
            lineStyle: {
              color: '#283143'
            }
          }
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          icon: 'circle',
          right: 10,
          textStyle: {
            color: '#00b7ee',
            fontSize: 16
          }
        },
        grid: {
      
          left: "10%" || '6%',
          top: "6%" || '21%',
          bottom: this.bottom || '16%',
          right: '2%'
        },
        tooltip: {
          //       formatter(params) {
          //         const div = `<div class="tooltip" style="width: 43px;
          // height: 51px;
          // background: url('../../assets/images/common/1.png');">${params.name}：${params.seriesId}</div>`
          //         return div
          //       }
            },
        dataset: {
          //   dimensions: ,
          source: this.customer
        },
        series: [
          {
            encode: {
              x: "故障数",
              // y: this.pro
            },
            // data: data.val,
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                // borderColor: '#00b7ee',
                barBorderRadius: [30, 30, 0, 0]
                // borderWidth: 1
              }
            }
          }]
      }
           this.myChart1.setOption(option, true)
        }
      })
    },
    statistics() {
      this.$ajax({
        url: $$('/monitor/statistics'),
        method: 'get'
      }).then((res) => {
        if (res.data.status === 200) {
          this.platMsg = res.data.data
          // console.log(this.platMsg)
        }
      })
    },
    customerFun() {
      this.$ajax({
        url: $$('/monitor/expire/customer'),
        method: 'get',
        params: {
          getPage: 0
        }
      }).then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.data)
          this.freezeNumber = res.data.data
          console.log(this.platMsg)
        }
      })
    },
    alarmList() {
      this.$ajax({
        url: $$('/alarm/list'),
        method: 'get',
        params: {
          getPage: 1, 
          rows:10
        }
      }).then((res) => {
        if (res.data.status === 200) {
          this.alarmListArr = res.data.data.list
        }
      })
    },
    //告警详情
    redirectDetail(row) {
      this.$router.push({
        path: '/equipmentManage/menu7',
        query: {
          pointId: row.item.pointId,
          deviceId: row.item.deviceId
        }
      })
    },
    //设备详情
    customerDires(row){

     if(this.common.tabRender(this,"设备详情")){
        this.$router.push({
        path: '/equipmentManage/menu19',
        query: {
          deviceId: row.deviceId
        }
      })
     } 
        
    }
  },
  components: {
    'vs-platDetail': platDetail,
    'vs-commonTable': commonTable,
    'vs-pie': pie,
    'vs-oneBar': oneBar
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px;
    margin-bottom: 5px;
    .year-device-default {
      width: 100%;
      background: #1b2333;
      padding: 14px 0 14px 0;
      border-radius: 10px;
      margin-top: 20px;
      .fault-contain {
        display: flex;
        justify-content: space-around;
        width: 98%;
        margin: 0 auto;
        .chart-fault {
          h2 {
            font-size: 14px;
            color: white;
          }
          > div {
            height: 230px;
            border: 1px solid #2a3345;
            box-sizing: border-box;
            margin-top: 15px;
          }
          &:nth-of-type(1) {
            width: 43%;
          }
          &:nth-of-type(2) {
            width: 26%;
          }
          &:nth-of-type(3) {
            width: 28%;
          }
        }
      }
    }
    .status-alarm {
      background: #1b2333;
      padding: 14px 0 14px 0;
      border-radius: 10px;
      margin-top: 20px;
      > div {
        display: flex;
        justify-content: space-around;
        width: 98%;
        margin: 0 auto;
        .user {
          width: 49%;
          h2 {
            font-size: 14px;
            color: white;
          }
          > div {
            width: 100%;
            margin-top: 15px;
            min-height: 250px;
            /*height: 230px;*/
          }

        }
      }
    }
    .fast-msg {
      /*background: #1b2333;*/
      padding: 7px 0 0 0;
      /*margin-top: 20px;*/
      h2 {
        font-size: 14px;
        color: white;
        margin-left: 1%;
      }
      > div {
        display: flex;
        padding: 14px 0 14px 0;
        justify-content: space-around;
        .fast-left-wrapper {
          width: 82%;
          padding: 14px 0 14px 0;
          padding-bottom: 30px;
          border-radius: 10px;
          background: #1b2333;
          h2{
            margin-left: 24px;
          }
          .fast-left {
            display: flex;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            .img{
              height: 50px;
            }
            p {
              font-size: 14px;
              color: #b1bdcd;
              padding-top: 17px;

            }
            .arrow {
              width: 11px;
              height: 19px;
            }
          }
        }
        .fast-right {
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          width: 18%;
          border-radius: 10px;
          background: #1b2333;
          margin-left: 1%;
          span {
            display: inline-block;
            width: 16px;
            color: #fff;
            font-size: 14px;
            margin-right: 10px;
          }
        }
      }

    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-plat {
    background: #1b2333;
    border-radius: 10px;
    padding: 14px 0 1px 0;
    h1 {
      font-size: 14px;
      color: white;
      padding-left: 18px;
      margin: 0 0 10px 0;
    }
    .plat-contain {
      display: flex;
      justify-content: space-around;
      width: 98%;
      margin: 5px auto 20px auto;
    }
  }
}
.dashboard-plat .user,.monitor,.alarm-device{
  cursor: pointer;
}
</style>
