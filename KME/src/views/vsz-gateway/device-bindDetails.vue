<template>
  <div>
    <div class="alarmSetting fristBox">
      <div class="alarmSetting-heade">
        <p>绑定设备名称：{{plcDetails.name}}</p>
      </div>
    </div>
    <div class="alarmSetting">
      <div class="alarmSetting-heade">
        <p>通讯协议信息</p>
      </div>
      <div class="alarmSetting-content">
        <p>通讯协议：{{plcDetails.agreement}}</p>
        <p>IP地址：{{plcDetails.ipAddress}}</p>
        <p>端口：{{plcDetails.port}}</p>
      </div>
    </div>
    <div class="alarmSetting">
      <div class="alarmSetting-heade">
        <p>关联设备信息</p>
        <p>
          <span class="device-icon" :class="deviceIcon[state]">
            <img src="../../assets/images/device.png" alt />
          </span>
          {{state==0?"在线":(state==2?"故障":"离线")}}
        </p>
      </div>
      <div class="alarmSetting-content">
        <p>关联设备：{{plcDetails.deviceName}}</p>
        <p>设备编号：{{plcDetails.deviceSerial}}</p>
        <p>所属客户：{{plcDetails.customerName}}</p>
      </div>
    </div>
    <div class="alarmSetting lastBox">
      <div class="alarmSetting-heade">
        <p>数据模板信息</p>
      </div>
      <div class="alarmSetting-content">
        <p>数据模板名称：{{templateDetails.tplName}}</p>
        <p>数据点个数：{{templateDetails.pointCount}}</p>
        <p style="  
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          display: inline-block;" >备注：{{templateDetails.mark}}</p>
      </div>
      <div>
        <vs-table :tableData="tableData" :colConfigs="colConfigs" @changeNum="handleNum">
      <el-table-column slot="mark" align="center" label="备注">
        <template slot-scope="scope">
          <div style="  
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          display: inline-block;" 
      :title="scope.row.mark">{{scope.row.mark}}</div>
        </template>
      </el-table-column>
        </vs-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.colConfigs = [
      { prop: "collectName", label: "数据点名称" },
      { prop: "shortName", label: "缩略名" },
      { prop: "collectId", label: "ID" },
      { prop: "dataType", label: "类型" },
      { prop: "transmissionType", label: "传输类型" },
      { prop: "collectRate", label: "传输频率" },
      { prop: "address", label: "寄存器地址" },
      { prop: "size", label: "寄存器大小" },
      { prop: "upload", label: "是否上传" },
      { prop: "functionCode", label: "功能码" },
      { prop: "collectType", label: "存储方式" },
      { prop: "unit", label: "数据单位" },
    ];
    return {
      tableData: [],
      page: 1,
      rows: 10,
      plcId: "",
      templateDetails: {
        tplName: "",
        pointCount: "",
        mark: ""
      },
      plcDetails: {},
      state: "",
      deviceIcon: ["on-line","off-line","default"]
    };
  },
  methods: {
    //获取plc详情
    getListData: function() {
      let that = this;
      that.$ajax
        .get($$("/plc"), { params: { id: that.plcId } })
        .then(function(data) {
          that.plcDetails = data.data.data;
          that.dataGet();
          that.getTemplate();
          that.getDevice();
        });
    },
    //获取模板详情
    getTemplate: function() {
      let that = this;
      that.$ajax
        .get($$("/data/template"), {
          params: { id: that.plcDetails.dataTemplateId }
        })
        .then(function(data) {
          that.templateDetails = data.data.data;
        });
    },
    //获取数据点列表
    dataGet: function() {
      let data = {
        page: this.page,
        rows: this.rows,
        templateId: this.plcDetails.dataTemplateId
      };
      this.common.getTableList(this, "/data/point/list", data, res => {
        this.tableData = res;
      });
    },
    //获取设备详情
    getDevice: function() {
      let that = this;
      console.log(that.plcDetails.deviceId)
      that.$ajax
        .get($$("/dev/deploy/detail"), {
          params: { deviceId: that.plcDetails.deviceId }
        })
        .then(function(data) {
          that.state = data.data.data.status;
        });
    },
    handleNum(num) {
      this.page = num;
      this.dataGet();
    }
  },
  mounted() {
    this.plcId = this.$route.query.id;
    this.getListData();
  }
};
</script>

<style lang="scss" scoped>
.alarmSetting {
  background-color: #1a2331;
  margin-bottom: 10px;
  height: 100px;
  border-radius: 7px;
  padding: 25px;
  font-size: 16px;
  color: #fff;
  .alarmSetting-heade {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    .device-icon {
      display: inline-block;
      width: 25px;
      height: 25px;
      line-height: 30px;
      text-align: center;
      border-radius: 25px;
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
  }
  .alarmSetting-content {
    width: 100%;
    display: flex;
     p{
      width: 33%;
    }
  }
}
.fristBox {
  border-radius: 0 0 7px 7px;
}
.lastBox {
  height:100%;
}
.table-content[data-v-0213bf2b] {
  width: 100%;
  margin-top: 20px;
}
</style>
