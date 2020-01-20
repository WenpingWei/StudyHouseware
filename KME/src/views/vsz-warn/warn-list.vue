<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="home-container">
    <div class="home-content">
      <vs-search-limit :list="deviceList" name="deviceName"
                       :defalutId="defalutId"
                       @search="searchContent" @limitSelect="handleLimitSearch">
        <vs-btn-del slot="delete" title="删除告警" @del="delMore"></vs-btn-del>
      </vs-search-limit>
      <vs-table @changeTable="handleSelectId"
                :tableData="tableData"
                v-if="tableData"
                :colConfigs="colConfigs"
                @changeNum="handleNum">
        <el-table-column slot="checkbox"
                         type="selection"
                         width="55">
        </el-table-column>
        <el-table-column slot="operation" label="操作">
          <template slot-scope="scope">
            <i class="el-icon-delete" @click="handleDelete(scope.row)"></i>
          </template>
        </el-table-column>
      </vs-table>
    </div>
  </div>
</template>

<script>
  import table from '@/views/vue-common/table.vue'
  import searchLimit from '@/views/vue-common/searchLimit.vue'
  export default {
    name: 'home',
    data() {
      this.colConfigs = [
        { prop: 'deviceName', label: '设备名称'},
        { prop: 'customerName', label: '所属客户'},
        { prop: 'deviceStatus', label: '设备状态'},
        { prop: 'pointName', label: '数据监控点名'},
        { prop: 'pointValue', label: '数据监控点值'},
        { prop: 'alarmMark', label: '告警描述'},
        { prop: 'createTime', label: '告警开始时间'},
        { prop: 'finishTime', label: '告警结束时间'},
        { prop: 'status', label: '告警状态'},
      ];
      return {
        tableData: [],
        rows: 10,
        page: 1,
        defalutId: 1,
        deviceList: [
          {
            'id': 0,
            deviceName: '设备名称'
          },
          {
            'id': 1,
            deviceName: '设备编号'
          }
        ],
        deviceSelect: '35973F9D903099A74A9175B497D86617',
        checkBoxData: [],
        limit: {
          content: '',
        }
      }
    },
   methods: {
     delMore () {
       this.common.delMore(this.checkBoxData, this, '/alarm/remove', this.dataGet)
     },
//     改变页数
     handleNum (num) {
       this.page = num;
       this.tableInit();
     },
//     点击删除
     handleDelete (row) {
       this.checkBoxData = [row];
       this.common.delFun(this.checkBoxData, this, '/alarm/remove', this.dataGet)
     },
     //表格列表
     dataGet:function () {
       let data = {
         page: this.page,
         rows: this.rows,
         type: this.defalutId,
         keywords: this.limit.content
       };
       this.common.getTableList(this, '/alarm/list', data, res => {
         this.tableData = res
       });
     },
//     筛选设备名称和设备编号
     handleLimitSearch (val) {
       this.defalutId = val
     },
//     选中表格的行
     handleSelectId (val) {
       this.checkBoxData = val
     },
//     点击搜索
     searchContent (val) {
       this.limit.content = val;
       this.dataGet();
     },
   },
   components: {
     'vs-search-limit': searchLimit,
     'vs-table': table
   },
   created() {

   },
   mounted: function() {
     const _this = this
     _this.dataGet();
//     _this.deviceListInit();
   }
  }
</script>

<style scoped>
i {
  font-size: 20px;
  font-weight: 700;
  color: rgb(25, 154, 245);
  margin-right: 10px;
}
</style>
