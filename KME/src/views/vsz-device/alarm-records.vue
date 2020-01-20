<template>
  <div class="alarm-contain">
    <div class="alarm-select">
      <el-select
        slot="prepend"
        v-model="select"
        placeholder="请选择"
        @change="dataGet(1)"
      >
        <el-option label="所有类型" value="" />
        <el-option label="设备告警" value="0" />
        <el-option label="设备离线" value="1" />
        <el-option label="设备锁定" value="2" />
      </el-select>
      <!--<el-select v-model="status"-->
      <!--class="mg-l-10"-->
      <!--@change="dataGet"-->
      <!--slot="prepend"-->
      <!--placeholder="请选择">-->
      <!--<el-option label="所有状态" value=""></el-option>-->
      <!--<el-option label="未解除" value="0"></el-option>-->
      <!--<el-option label="已解除" value="1"></el-option>-->
      <!--</el-select>-->
      <el-select
        slot="prepend"
        v-model="datetime"
        class="mg-l-10"
        placeholder="请选择"
        @change="dataGet(1)"
      >
        <el-option label="全部时间" value="0" />
        <el-option label="今天" value="1" />
        <el-option label="七天内" value="2" />
      </el-select>
    </div>
    <vs-table
      v-if="tableData"
      :table-data="tableData"
      :col-configs="colConfigs"
      @changeNum="handleNum"
    >
     <el-table-column slot="deviceStatus" align="center" label="告警状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">激活</span>
          <span v-if="scope.row.status ===1">重复告警</span>
          <span v-if="scope.row.status ===2">已结束</span>
        </template>
      </el-table-column>

      <el-table-column slot="operation" align="center" label="功能操作">
        <template slot-scope="scope">
          <span class="color-blue cursor" v-btn="{text: '告警记录'}" @click="alarmDetail(scope.row)">告警详情</span>
        </template>
      </el-table-column>
    </vs-table>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    this.colConfigs = [
      { prop: 'pointName', label: '数据点名称' },
      { prop: 'pointValue', label: '数据值' },
      { prop: 'alarmMark', label: '告警描述' },
      { prop: 'alarmType', label: '告警类型' },
      { prop: 'createTime', label: '告警时间' },
      { prop: 'updateTime', label: '结束时间' }
    ]
    return {
      keywords: '',
      select: '',
      datetime: '0',
      time: '0',
      page: 1,
      rows: 10,
      tableData: [],
      deviceId:""
    }
  },
  mounted() {
    this.deviceId = this.$router.history.current.query.deviceId
    this.dataGet(this.deviceId)
  },
  methods: {
    dataGet: function(e) {
      if(e==1){
        this.page = e
      }
      const data = {
        page: this.page,
        rows: this.rows,
        alarmType: this.select,
        datetime: this.datetime,
        deviceId:this.deviceId, 
        getPage:1,
      }
      this.common.getTableList(this, '/alarm/list', data, res => {
        this.tableData = res
      })
    },
    handleNum(num) {
      this.page = num
      this.dataGet()
    },
    alarmDetail(row) {
      this.$router.push({
        path: '/equipmentManage/menu7',
        query: {
          pointId: row.pointId,
          deviceId: row.deviceId,
          id:row.id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .alarm-contain {
    width: 97%;
    background: #1b2333;
    border-radius: 10px;
    /*height: 300px;*/
    margin: 20px 1.5% 20px 1.2%;
    padding-bottom: 20px;
    .alarm-select {
      display: flex;
      float: right;
      /*width: 30%;*/
      height: 40px;
      margin: 15px 15px 15px auto;
      >>>.el-input-group__prepend {
        border: none;
      }
      .el-select{
        /*width: 150px;*/
        /*border: 1px solid #199af5;*/
      }
      .el-input__inner {
        background: #233149!important;
        border: none;
        color: #b2bdcd;
      }
    }
  }
</style>
