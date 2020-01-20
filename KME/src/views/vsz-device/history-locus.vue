<template>
  <div class="bigBox history-locus">
    <div class="btn-group">
      <el-button :class="{active: currentTime === 1}"
                 @click="changeDay(1)">当天</el-button>
      <el-button :class="{active: currentTime === 2}"
                 @click="changeDay(2)">近三天</el-button>
      <el-button :class="{active: currentTime === 3}"
                 @click="changeDay(3)">近五天</el-button>
      <el-button :class="{active: currentTime === 4}"
                 @click="changeDay(4)">近一周</el-button>
    </div>
    <div id="historyLocus" />
  </div>
</template>

<script>
import marker from '@/assets/images/common/ellipse.png'
export default {
  name: 'HistoryLocus',
  data() {
    return {
      currentTime: 1,
      locusDataArr: [],
      startTime: this.getDay(0).substr(0, 10) + ' 00:00:00',
      endTime: this.getDay(0),
      longitude:"104.079853",
      latitude:"30.703259",
    }
  },
  computed: {},
  mounted() {
    
    this.locusData()
  },
  methods: {
    changeDay(id) {
      this.currentTime = id
      switch (id) {
        case 1:
          this.startTime = this.getDay(0).substr(0, 10) + ' 00:00:00'
          this.endTime = this.getDay(0)
          break
        case 2:
          this.startTime = this.getDay(-3)
          this.endTime = this.getDay(0)
          break
        case 3:
          this.startTime = this.getDay(-5)
          this.endTime = this.getDay(0)
          break
        case 4:
          this.startTime = this.getDay(-7)
          this.endTime = this.getDay(0)
          break
      }
      this.locusData();
      this.map.centerAndZoom(
        new BMap.Point(
          this.longitude || 104.079853,
          this.latitude || 30.703259
        ),
        12
      )
    },
    getDay(day) {
      const today = new Date()
      const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
      today.setTime(targetday_milliseconds) // 注意，这行是关键代码
      const year = today.getFullYear()
      const mouth = parseInt(today.getMonth() + 1)
      const dateDay = today.getDate()
      const hours = today.getHours()
      const minutes = today.getMinutes()
      const seconds = today.getSeconds()
      const showMonth = mouth < 10 ? '0' + mouth : mouth;
      const showDay = dateDay < 10 ? '0' + dateDay : dateDay;
      const showHour = hours < 10 ? '0' + hours : hours;
      const showMinutes = minutes < 10 ? '0' + minutes : minutes;
      const showSeconds = seconds < 10 ? '0' + seconds : seconds;
      const datetimeType = year + '-' + showMonth + '-' + showDay +
        ' ' + showHour + ':' + showMinutes + ':' + showSeconds // yyyy-MM-dd 00:00:00格式日期
      return datetimeType
    },
    mapInit() {
      this.map = new BMap.Map('historyLocus',{enableMapClick:false})
      // 初始化地图,设置中心点坐标和地图级别
      this.map.centerAndZoom(
        new BMap.Point(
          this.longitude || 104.079853, 
          this.latitude || 30.703259
        ),
        12
      )
      // 自定义地图样式
      // this.map.setMapStyleV2({
      //   styleId: 'b6b7251e5a82776f28cad5c468bcb5e4'
      // })
      // 添加滚轮缩放
      this.map.enableScrollWheelZoom(true)
      const size = new BMap.Size(10, 20)
      this.locusCreate()
    },
    locusData() {
      this.$ajax({
        url: $$('/monitor/location/record'),
        method: 'get',
        params: {
          deviceId: this.$router.history.current.query.deviceId,
          startTime: this.startTime,
          endTime: this.endTime
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.locusDataArr = res.data.data
          if(res.data.data.length>0){
          this.longitude = res.data.data[0].longitude
          this.latitude = res.data.data[0].latitude
          }
       
           this.mapInit()
          
         
        }
      })
    },
    addOverLay(log, lng, time) {
      const pt = new BMap.Point(log, lng)
      const myIcon = new BMap.Icon(marker, new BMap.Size(45, 46))
      const marker2 = new BMap.Marker(pt, { icon: myIcon }) // 创建标注
      const label = new BMap.Label(this.common.datetimeFormat(time), { offset: new BMap.Size(36, 10) })
      label.setStyle({
        color: '#ffffff',
        fontSize: '18px',
        height: '36px',
        lineHeight: '36px',
        borderRadius: '5px',
        background: '#1b2333',
        border: 'none',
        padding: '0 10px',
        fontFamily: '微软雅黑'
      })
      marker2.setLabel(label)
      this.map.addOverlay(marker2)
    },
    locusCreate() {
      const points = []
      this.map.clearOverlays();
      this.locusDataArr.map(v => {
        points.push(new BMap.Point(v.longitude, v.latitude))
        this.addOverLay(v.longitude, v.latitude, v.createTime)
      })
      const curve = new BMap.Polyline(points,
        { strokeColor: '#199bf4', strokeWeight: 3, strokeOpacity: 0.8 }) // 创建弧线对象
      this.map.addOverlay(curve) // 添加到地图中
    }
  }
}
</script>

<style lang="scss" scoped>
  .history-locus {
    position: relative;
    .btn-group {
      position: absolute;
      z-index: 2;
      top: 10px;
      background: #1b2333;
      border-radius: 10px;
      .el-button {
        background: #273753;
        font-size: 16px;
        color: #b2bdcd;
        border: none;
        &.active {
          background: #199af5;
          color: white;
        }
      }
    }
    #historyLocus {
      width: 100%;
      height: 950px;
      
    }
  }
.bigBox{
  width: 100%!important;
}
</style>
