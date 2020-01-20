<template>
  <div class="alarm-detail">
    <div class="device-detail">
      <deviceDetail v-if="alarmDetailObj" :detail-obj="alarmDetailObj" />
    </div>
    <div class="control common-box-contain mg-t-20">
      <h1>告警状态</h1>
      <div class="table-line-contain">
        <table>
          <tr class="header">
            <td>数据点名称</td>
            <td>数据值</td>
            <td>告警描述</td>
            <td>告警类型</td>
          </tr>
          <tr>
            <td>{{alarmDevice.pointName}}</td>
            <td>{{alarmDevice.pointValue}}</td>
            <td>{{alarmDevice.alarmMark}}</td>
            <td>{{alarmType[alarmDevice.alarmType]}}</td>
          </tr>
          <tr class="header">
            <td>告警状态</td>
            <td>设备状态</td>
            <td>告警开始时间</td>
            <td>告警结束时间</td>
          </tr>
          <tr>
            <td>{{status[alarmDevice.status]}}</td>
            <td>{{deviceStatus[alarmDevice.deviceStatus]}}</td>
            <td>{{common.datetimeFormat(alarmDevice.createTime)}}</td>
            <td v-if="alarmDevice.status== 2">{{common.datetimeFormat(alarmDevice.updateTime)}}</td>
            <td v-else >{{"----"}}</td>
          </tr>
        </table>
        <div v-if="lineArr ==''" class="dataChart">暂无数据</div>
        <div id="lineChart" class="chart-alarm" />
      </div>
    </div>
    <div class="common-box-contain solute-method">
      <h1>解决方案</h1>
      <div v-if="solute" ref="solute" v-html="solute" style="line-height: 30px;" class="solute-content"></div>
      <div v-else style="color:#fff;margin-left:50%;margin-top:30px">暂无方案</div>
    </div>
  </div>
</template>

<script>
import deviceDetail from '@/views/vue-common/deviceDetail'
export default {
  name: 'AlarmDetail',
  components: {
    deviceDetail
  },
  data() {
    return {
      alarmDetailObj: {},
      lineArr: [],
      collectName: [],
      alarmDevice: {},
      alarmType: ['设备告警', '设备离线',"设备锁定"],
      status: ['激活', '重复告警', '已结束'],
      deviceStatus: ['在线', '离线', '故障'],
      solute:""
    }
  },

  computed: {},
  mounted() {
    this.alarmDetail()
    this.solutePoint()
    this.alarmDeviceDetail()
    this.line = this.$echarts.init(document.getElementById('lineChart'))
  },
  methods: {
    alarmDetail() {
      this.$ajax({
        url: $$('/dev/deploy/detail'),
        method: 'get',
        params: {
          deviceId: this.$router.history.current.query.deviceId
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.alarmDetailObj = res.data.data
          this.lineData()
        }
      })
    },
    lineData() {
      this.$ajax
        .post($$('/monitor/history'), {
          points: [this.$router.history.current.query.pointId],
          // points: ['33EAEE7C29DC3DAF98FAC9174F2F7631'],
          dateRange: '1',
          serialNumber: this.alarmDetailObj.serialNumber
        }).then(res => {
          this.lineArr = res.data.data[this.$router.history.current.query.pointId]
          this.lineArr.map(v => {
            this.collectName = v.collectName
            v.createTime = this.common.datetimeFormat(v.createTime)
          })
          this.lineShow(this.line)
        })
    },
    solutePoint() { //获取设备解决方案
      if( this.$router.history.current.query.alarmType==1|| this.$router.history.current.query.alarmType==2){
        this.$ajax({
        method: 'get',
        url: $$('/solution/device'),
        params: {
          deviceId: this.$router.history.current.query.deviceId,
          alarmType: this.$router.history.current.query.alarmType
        }
      }).then(res => {
        if (res.data.status === 200) {
          // this.$refs.solute = res.data.data[0].content
          this.solute = res.data.data[0].content
        }
      })
      }else{
        this.$ajax({
            method: 'get',
            url: $$('/solution/point'),
            params: {
              deviceId: this.$router.history.current.query.deviceId,
              pointId: this.$router.history.current.query.pointId
            }
          }).then(res => {
            if (res.data.status === 200) {
              // this.$refs.solute = res.data.data[0].content
              this.solute = res.data.data[0].content
            }
          })
      }
     
    },
    alarmDeviceDetail() {// 设备告警详情
      this.$ajax({
        method: 'get',
        url: $$('/alarm/deviceAlarmDetias'),
        params: {
          deviceId: this.$router.history.current.query.deviceId,
          id:this.$router.history.current.query.id,
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.alarmDevice = res.data.data.list[0];
        }
      })
    },
    // 折线图
    lineShow: function(id) {
      const that = this
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#199af5', '#ffff00', '#00ffff', '#f06666', '#ed8153'],
        legend: {
          itemWidth: 10,
          itemHeight: 2,
          // icon: 'circle',
          right: 10,
          top: -3,
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        grid: [
          {
            top: 30,
            left: 50,
            right: 30,
            bottom: 80,
            containLabel: true
          }
        ],
        dataset: {
          //   dimensions: ,
          source: this.lineArr
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#25334d'
              }
            },
            data: that.xDate,
            axisLabel: {
              color: '#b1bdcd',
              fontSize: 14
            }
          }
        ],
        yAxis: [
          {
            name: '',
            type: 'value',
            axisLabel: {
              color: '#b1bdcd',
              fontSize: 14
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#283143'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#25334d'
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 0,
            end: 40,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#d3dee5',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: {
              color: '#000'
            },
            borderColor: '#90979c'
          }
        ],
        series: [
          {
            name: this.collectName,
            encode: {
              x: 'createTime',
              y: 'value'
            },
            type: 'line',
            hoverAnimation: false
          }
        ]
      }
      id.setOption(option, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm-detail {
  width: 97%;
  /*background: #1b2333;*/
  border-radius: 10px;
  /*height: 300px;*/
  margin: 20px 1.5% 20px 1.2%;
  padding-bottom: 1px;
  .device-detail {
    background: #1b2333;
    border-radius: 10px;
  }
  .control {
    width: 100%;
    margin: 0 auto;
    padding: 15px 0 20px 0;
    h1 {
      margin-left: 35px;
      color: #fff;
      font-size: 14px;
    }
    .table-line-contain {
      display: flex;
      justify-content: space-around;
      width: 95%;
      margin: 30px auto 10px auto;
      table {
        width: 47%;
        text-align: center;
        border: 1px solid #353f52;
        tr {
          height: 50px;
          line-height: 50px;
          color: #b1bdcd;

          border: 1px solid #283143;
          background: #1b2333;
          &.header {
            color: #199af5;
            background: #1b2f47;
          }
        }

      }
      > .chart-alarm {
        width: 52%;
        height: 250px;
      }
    }
  }
  .solute-method {
    width: 100%;
    margin: 10px auto;
    padding: 15px 0 20px 0;
    color: #fff;
    h1 {
      margin-left: 35px;
      color: #fff;
      font-size: 14px;
      
    }
  }
}
.dataChart{
  color: #fff;
  font-size: 16px;
  position: absolute;
  left: 70%;
}
</style>
