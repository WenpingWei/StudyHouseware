<!--设备详情-->
<template>
  <div class="device-detail data-dot">
    <div class="detail-ref">
      <div class="left-content">
        <div class="left-status">
          <span v-if="detailObj.status === 0" :class="deviceIcon[detailObj.status]">在线</span>
          <span v-if="detailObj.status === 1" :class="deviceIcon[detailObj.status]">离线</span>
          <span v-if="detailObj.status === 2" :class="deviceIcon[detailObj.status]">告警</span>
          <span
            class="status"
            :class="deviceIcon[detailObj.status]"
          >
          <img
                :src="detailObj.status==2?require('../../assets/images/warn.png'):require('../../assets/images/device.png')"
          />
          {{ ['离线','在线',  '告警'][devList.status] }}</span>
        </div>
        <!--<slot name="img"></slot>-->
        <template v-if="devList.deviceTemplateId !== '30BC4F3C3ACA43B9F2DD3943D4F9665A'">
          <div class="img-wrapper">
            <img :src="path" class="img-photo">
          </div>
        </template>

        <div class="device-basic">
          <div class="font-weight">{{ detailObj.deviceName }}</div>
          <div class="font-weight">{{ detailObj.serialNumber }}</div>
          <!--<p>-->
            <!--<span class="font-weight">设备位置：</span>-->
            <!--<span>{{ detailObj.address }}</span>-->
          <!--</p>-->
          <p>
            <span class="font-weight">所属客户：</span>
            <span>{{ detailObj.customerName }}</span>
          </p>
          <p>
            <span class="font-weight">状态更新时间：</span>
            <span>{{ common.datetimeFormat(detailObj.updateTime) }}</span>
          </p>
          <p class="mark">
            <span class="font-weight">备注：</span>
            <span :title="detailObj.mark">{{ detailObj.mark }}</span>
          </p>
        </div>
      </div>
      <div class="right-content">
        <vs-map
          :longitude="detailObj.longitude"
          :latitude="detailObj.latitude"
        />
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import defaultModule from '../../assets/images/common/default.png'
export default {
  name: 'App',
  components: {},
  props: ['detailObj'],
  data: function() {
    return {
      devList: '',
      deviceIcon: ['online', 'offLine', 'alarm']
    }
  },
  computed: {
    path() {
      const imgUrl = this.detailObj.attachPath
      if (imgUrl) {
        return process.env.VUE_APP_BASE_API + imgUrl
      } else {
        return defaultModule
      }
    }
  },
  mounted: function() {
    // this.devNow()
  },
  methods: {
    // 当前设备数据
    devNow: function() {
      const that = this
      const deviceId = that.common.urlGet().detailID
      $.ajax({
        url: $$('/monitor/detail'),
        type: 'get',
        data: {
          deviceId
        },
        dataType: 'json',
        contentType: 'application/json;charset-UTF-8',
        success: function(data) {
          that.devList = data.data
        },
        error: function(err) {}
      })
    },
    mapShow: function() {
      const that = this
      // 百度地图API功能
      const map = new BMap.Map('mapShow',{enableMapClick:false}) // 创建Map实例
      map.centerAndZoom(
        new BMap.Point(that.devList.longitude, that.devList.latitude),
        11
      ) // 初始化地图,设置中心点坐标和地图级别
      // 添加地图类型控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      )
      const p1 = new BMap.Point(that.devList.longitude, that.devList.latitude)
      const marker = new BMap.Marker(p1) // 创建标注
      map.addOverlay(marker) // 将标注添加到地图中
      map.enableScrollWheelZoom(true) // 添加滚轮缩放
    }
  }
}
</script>
<style lang="scss" scoped>
  .device-detail {
    width: 95%;
    margin: 10px auto;
    .detail-ref {
      display: flex;
      flex-wrap: wrap;
     
      /*background: white;*/
      .left-content {
        position: relative;
        display :flex;
        width: 45%;
        /*background: white;*/
        .left-status {
          position: absolute;
          right: 10px;
          top: 42px;
          font-size: 16px;
          display:flex;
          .online {
            color: #66f06f;
          }
          .offLine {
            color: #a3a9c1;
          }
          .alarm {
            color: #f06666;
          }
          span{
            padding: 5px;
          }
        }
        .status {
          padding: 3px!important;
          display:inline-block;
          border-radius: 3px;
          margin-left: 5px;
          height: 24px;
          &.online {
            background: #66f06f;
          }
          &.offLine {
            background: #a3a9c1;
          }
          &.alarm {
            background: #f06666;
          }
        }
        .img-wrapper {
          width: 40%;
          height: 165px;
          overflow: hidden;
          margin: 43px 15px 0 0;
        }
        .img-photo {
          width: 100%;
          height: 100%;
        }
        .device-basic {
          width: 50%;
          margin-top: 32px;
          line-height: 35px;
          font-size: 14px;
          color: #fff;
          .font-18 {
            font-size: 18px;
          }
          .font-weight {
            font-weight: bold;
          }
        }
      }
      .right-content {
        width: 55%;
        height: 260px;
        margin-top: 32px;
        margin-bottom: 43px;
      }
    }
    .mark {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 70%;
      display: inline-block;
    }
  }
</style>
