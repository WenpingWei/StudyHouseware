<template>
  <div class="data-point-monitor">
    <div class="data-point-content">
      <div class="plat-contain">
        <vs-platDetail name="监控设备" class="monitor" :num="platMsg.deviceCount" unit="台">
          <div slot="square" class="square" />
          <img slot="img" src="../../assets/images/monitorDevice.png" alt="" class="img-two">
        </vs-platDetail>
        <vs-platDetail name="监控数点" class="monitor-point" :num="platMsg.pointCount" unit="个">
          <div slot="square" class="square" />
          <img slot="img" src="../../assets/images/monitorPoint.png" alt="" class="img-three">
        </vs-platDetail>
        <vs-platDetail name="在线设备" class="online-device" :num="platMsg.olDeviceCount" unit="台">
          <div slot="square" class="square" />
          <img slot="img" src="../../assets/images/onlineDevice.png" alt="" class="img-four">
        </vs-platDetail>
        <vs-platDetail name="告警设备" class="alarm-device"  :num="platMsg.warningDeviceCount" unit="台">
          <div slot="square" class="square"  />
          <img slot="img" src="../../assets/images/warnDevice.png" alt="" class="img-five">
        </vs-platDetail>
      </div>
    </div>
    <div class="table-monitor">
      <div class="table-wrapper">
        <div class="select">
          <div>
            <vs-custom-list
              :custom-id="customerId"
              @changeCustom="changeCus"
            />
            <vs-status
              title="设备状态"
              :status-id="status"
              class="mg-l-10"
              @changeStatus="changeStatus"
            />
          </div>
          <el-input v-model="input2"  placeholder="请输入设备名称">
            <template slot="append"><span @click="search">搜索</span></template>
          </el-input>
        </div>
        <div class="table-contain">
        
          <div  v-for="(iten, i) in deviceList" class="device" :key="i">
            <div class="device-title">
              <span
                class="device-icon"
                :class="deviceIcon[iten.status]"
              >
                 <img
                :src="iten.status==2?require('../../assets/images/warn.png'):require('../../assets/images/device.png')"
              />
           
              </span>
              <span class="title-style" :title="iten.deviceName">设备名称：{{ iten.deviceName }}</span>
              <span class="title-style">设备编号：{{ iten.serialNumber }}</span>
              <span class="title-style flex">所属客户：{{ iten.customerName }}</span>
              <el-button
                v-btn="{text: '设备详情'}"
                type="primary"
                @click="deviceDetailLink(iten)"
                style="width:100px;"
              >设备详情</el-button>
              <el-button type="primary" class="mg-r-10" @click="closeEx(iten, i)" style="margin-right:80px; width:100px;">
                <span v-if="iten.show">收 起 </span>
                <span v-else>展 开</span>
              </el-button>
            </div>
            <ul v-show="iten.show" class="device-list">
              <li class="header">
                <div>数据点名称</div>
                <div>参数类别</div>
                <div>数据模板</div>
                <div>当前数值</div>
                <div>数据单位</div>
                <div>刷新时间</div>
                <div>历史数据</div>
              </li>
              <li v-for="(item,index) in iten.pointEntityList" :key="index">
                <div>{{ item.collectName }}</div>
                <div>
                  <span v-if="item.collectType === 0">不保存</span>
                  <span v-if="item.collectType === 1">变化时保存</span>
                  <span v-if="item.collectType === 2">实时保存</span>
                </div>
                <div>{{item.dataTemplateName}}</div>
                <div>
                  <span v-if="typeof item.value.pvalue === 'boolean'">
                    <el-switch
                      v-model="value1"
                      disabled
                    /></span>
                  <span v-else>
                    {{ item.value.pvalue }}
                  </span>
                </div>
                <div>{{ item.unit != "" ? item.unit : "--"}}</div>
                <div>{{ common.datetimeFormat(item.updateTime) }}</div>
                <div v-btn="{text: '历史数据'}"
                     v-if="item.collectType !== 0"
                     class="cursor color-blue"
                     @click="historyDetail(iten, item)"
                >历史数据</div>
              </li >
          <div v-if="Object.keys(iten.pointEntityList).length==0" class="withoutData" >暂无数据</div>
            </ul>
          </div>
          <div v-if="Object.keys(deviceList).length==0" class="withoutData" >没有搜索到相关内容</div>

          <el-pagination
            class="mg-t-20"
            background
            :current-page.sync="page"
            layout="prev, pager, next, jumper"
            :total="listTotal"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import platDetail from '@/views/dashboard/platDetail.vue'
export default {
  components: {
    'vs-platDetail': platDetail
  },
  data() {
    return {
      platMsg: {
        customCount: '',
        deviceCount: '',
        pointCount: '',
        olDeviceCount: '',
        warningDeviceCount: '',
        warningAlarmRecored: ''
      },
      input2: '',
      msgShow: false,
      customerId: '',
      status: '',
      deviceList: [],
      page: 1,
      listTotal: 2,
      value1: true,
      deviceIcon: ['on-line','off-line', 'default']
    }
  },
  computed:{
        isCollapse(){
            return this.input2;
        }
    },
  watch:{
    isCollapse(newValue,oldValue){  //监听用户输入框无数据时
      if(newValue==''){
      this.page = 1;
      this.deviceLs()
      }
      
    }
  },
  mounted() {
    this.statistics() // 平台概况
    this.deviceLs() // 列表展示
  },
  methods: {
    search(){
      this.page = 1;
      this.deviceLs()
    },

    statistics() {
      this.$ajax({
        url: $$('/monitor/statistics'),
        method: 'get'
      }).then((res) => {
        if (res.data.status === 200) {
          this.platMsg = res.data.data
        }
      })
    },
    deviceLs() {
      this.loadding = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$ajax({
        url: $$('/dev/deploy/list'),
        method: 'get',
        params: {
          customerId: this.customerId,
          status: this.status,
          keywords: this.input2,
          needPoints: 1,
          type: 1,
          page: this.page,
          excludedLocation:1
        }
      }).then((res) => {
        if (res.data.status === 200) {
          this.deviceList = res.data.data.list
          this.listTotal = res.data.data.total
          this.deviceList.map(v => {
            v.show = false
          })
          this.loadding.close();
          // this.platMsg = res.data.data
        }
      })
      setTimeout(()=>{
        this.loadding.close();
      },3000)
    },
    closeEx(iten, index) {
      iten.show = !iten.show
      this.$set(this.deviceList, index, iten)
      // iten.show = true
    },
    handleCurrentChange(val) {
      this.page = val;
      this.deviceLs()
    },
    deviceDetailLink(row) { // 设备详情
      this.$router.push({
        path: '/equipmentManage/menu19',
        query: {
          deviceId: row.id
        }
      })
    },
    changeStatus(id) {
      this.status = id
      this.page = 1
      this.deviceLs()
    },
    changeCus(id) {
      this.customerId = id
      this.page = 1
      this.deviceLs()
    },
    historyDetail(item, point) {
      // console.log(item)
      // console.log(point)
      this.$router.push({
        path: '/equipmentManage/menu9',
        query: {
          deviceId: item.id,
          pointId: point.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .data-point-monitor {
    margin: 20px;
    .data-point-content {
      background: #1b2333;
      padding: 14px 0 1px 0;
      border-radius: 10px;
      margin-top: 20px;
      .plat-contain {
        display: flex;
        justify-content: space-around;
        width: 98%;
        margin: 5px auto 20px auto;
        .plat-content {
          width: 24%;
        }
      }
    }
    .table-monitor {
      background: #1b2333;
      padding: 14px 0 1px 0;
      border-radius: 10px;
      margin-top: 20px;
      .table-wrapper {
        width: 98%;
        margin: 5px auto 20px auto;
        .select {
          display: flex;
          justify-content: space-between;
          .el-input-group {
            width: 300px;
          }
        }
        .table-contain {
          .device {
            margin-top: 20px;
            .device-title {
              display: flex;
              align-items: center;
              width: 100%;
              height: 46px;
              line-height: 46px;
              background: #233149;
              border: 1px solid #323c4f;
              .device-icon {
                display: inline-block;
                width: 25px;
                height: 24px;
                line-height: 30px;
                text-align: center;
                border-radius: 0 5px 5px 0;
                &.on-line {
                  background: #66f06f;
                }
                &.default {
                  background: #f06666;
                }
                &.off-line {
                  background: #a3a9c1;
                }
              }
              .title-style {
                display: inline-block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 14px;
                color: #199af5;
                margin-left: 30px;
              }
              .title-style:nth-of-type(2) {
                width: 200px;
              }
              .title-style:nth-of-type(3) {
                width: 200px;
              }
              .title-style:nth-of-type(4) {
                width: 200px;
              }
              .flex{
                flex: 1;
              }
              .el-button {
                padding: 8px 17px;
                /*background: #199af5;*/
                border: 1px solid #199af5;
                color: white;
              }

            }
            .device-list {
              width: 100%;
              background: #1b2333;
              max-height: 375px;
              overflow: scroll;
              overflow-x: hidden;
              .header,li {
                width: 100%;
                display: flex;
                color: #b1bdcd;
                font-size: 14px;
                height: 46px;
                line-height: 46px;
                align-items: center;
                border: 1px solid #323c4f;
                border-top: none;
                > div {
                  width: 14%;
                  text-align: center;
                }
              }
              .header {
                color: #199af5;
              }
              li:nth-of-type(even){
                background: #161e2c;
              }
            }
          }

        }
      }
    }
  }
.withoutData{
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  margin: 10px;
}
</style>
