<template>
  <div class="notifications-contain">
    <div class="notifications-select">
      <el-select
        slot="prepend"
        v-model="select"
        placeholder="请选择"
        @change="search"
      >
        <el-option label="所有类型" value="" />
        <el-option label="设备告警" value="0" />
        <el-option label="设备离线" value="1" />
        <el-option label="设备锁定" value="2" />
      </el-select>
      <el-input v-model="keywords" class="mg-l-10" placeholder="请输入设备名称">
        <template slot="append">
          <el-button class="filter-item" type="primary" @click="search">搜索</el-button>
        </template>
      </el-input>
    </div>
    <vs-table
      v-if="tableData"
      :table-data="tableData"
      :col-configs="colConfigs"
      @changeNum="handleNum"
    >
      <el-table-column slot="operation" align="center" label="功能操作">
        <template slot-scope="scope">
          <span class="color-blue cursor"  @click="alarmDetail(scope.row)">告警详情</span>
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
      { prop: 'deviceName', label: '设备名称' },
      { prop: 'customerName', label: '所属客户' },
      { prop: 'pointName', label: '数据点名称' },
      { prop: 'pointValue', label: '数据值' },
      { prop: 'deviceStatus', label: '设备状态' },
      { prop: 'statusReport', label: '告警状态' },
      { prop: 'alarmType', label: '告警类型' },
      { prop: 'alarmMark', label: '告警描述' },
      { prop: 'createTime', label: '时间' }
      // { prop: "mark", label: "告警详情" }
    ]
    return {
      keywords: '',
      select: '',
      page: 1,
      rows: 10,
      tableData: []
    }
  },
  computed:{
        isCollapse(){
            return this.keywords;
        }
    },
  watch:{
    isCollapse(newValue,oldValue){  //监听用户输入框无数据时
      if(newValue==''){
      this.search()
      }
    }
  },
  mounted() {
    this.dataGet()
  },
  methods: {  
    search(){
      this.page = 1
      this.dataGet();
    },
    dataGet: function() {
      const data = {
        page: this.page,
        rows: this.rows,
        getPage: 1,
        alarmType: this.select,
        keywords: this.keywords,
        type: 0,
        isEnd:1
      }
      this.common.getTableList(this, '/alarm/list', data, res => {
        this.tableData = res
        console.log( this.tableData)
        for(var i in this.tableData.list){
              this.tableData.list[i].statusReport = res.list[i].status
        }
        // this.checkBoxData.length = 0;
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
            id: row.id,
          pointId: row.pointId,
          deviceId: row.deviceId,
          alarmType:row.alarmType
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .notifications-contain {
    width: 97%;
    background: #1b2333;
    border-radius: 10px;
    /*height: 300px;*/
    margin: 20px 1.5% 20px 1.2%;
    padding-bottom: 20px;
    .notifications-select {
      display: flex;
      /*float: right;*/
      width: 30%;
      height: 62px;
      margin-left: auto;
      margin-right: 15px;
      /*margin: 15px 15px 24px auto;*/
      padding-top: 10px;
      >>>.el-input-group__prepend {
        border: none;
      }
      .el-input-group {
        width: 70%;
      }
      .el-select{
        width: 150px;
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
