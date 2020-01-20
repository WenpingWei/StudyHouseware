<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="home-container">
    <div class="home-content">
      <vs-search-limit :list="triggerList" name="name"
                       :defalutId="defalutId"
                       @search="searchContent" @limitSelect="handleLimitSearch">
        <router-link to="/warnMessage/warn3" slot="add">
          <vs-btn-add title="新增触发器"></vs-btn-add>
        </router-link>
        <vs-btn-del slot="delete" title="删除触发器" @del="delMore"
                    style="margin-left: 10px"></vs-btn-del>
        <el-select slot="enabled" v-model="isEnable" @change="enableFun">
          <el-option v-for="item in isEnableList" :value="item.id" :key="item.id" :label="item.name"/>
        </el-select>
      </vs-search-limit>
      <vs-table @changeTable="handleSelectId"
                v-if="tableData"
                :tableData="tableData"
                :colConfigs="colConfigs"
                @changeNum="handleNum">
        <el-table-column slot="checkbox"
                         type="selection"
                         width="55">
        </el-table-column>
        <el-table-column slot="operation" label="操作">
          <template slot-scope="scope">
            <i class="el-icon-edit-outline" @click="handleEdit(scope.row)"></i>
            <i class="el-icon-delete" @click="handleDelete(scope.row)"></i>
          </template>
        </el-table-column>
      </vs-table>
    </div>
  </div>
</template>

<script>
import searchLimit from '@/views/vue-common/searchLimit.vue'
import table from '@/views/vue-common/table.vue'
export default {
  name: 'home',
  data() {
    this.colConfigs = [
      { prop: 'triggerName', label: '触发器名称'},
      { prop: 'tplName', label: '数据模板名称'},
      { prop: 'pointName', label: '数据点名称'},
      { prop: 'conditionStatement', label: '触发条件'},
      { prop: 'mark', label: '告警描述'},
      { prop: 'triggerSwitch', label: '是否启用'},
      { prop: 'deviceNames', label: '设备选择'},
    ];
    return {
      list: [],
      page: 1,
      rows: 10,
      listTotal: 1,
      tableData: [],
      triggerList: [
        {
          id: 1,
          name: '触发器名称'
        },
        {
          id: 2,
          name: '数据模板名称'
        },
        {
          id: 3,
          name: '数据点名称'
        }
      ],
      defalutId: 1,
      isEnable: '',
      isEnableList: [
        {
          id: '',
          name: '是否启用'
        },
        {
          id: 0,
          name: '否'
        },
        {
          id: 1,
          name: '是'
        }
      ],
      content: '',
      checkBoxData: []
    }
  },
  components: {
    'vs-search-limit': searchLimit,
    'vs-table': table
  },
  created() {
    // this.fetchData()
  },
  methods: {
    tableInit () {
      let data = {
        page: this.page,
        rows: this.rows,
        status: this.isEnable,
        type: this.defalutId,
        keywords: this.content,
      };
      this.common.getTableList(this, '/alarm/trigger/page', data, res => {
        this.tableData = res
        this.checkBoxData.length = 0;
      })
    },
    handleLimitSearch (val) {
      this.defalutId = val
    },
    searchContent (val) {
      this.content = val
      this.tableInit();
    },
    handleNum (num) {
      this.page = num
      this.tableInit();
    },
    enableFun (val) {
      this.isEnable = val
      this.tableInit();
    },
    delMore () {
      this.common.delMore(this.checkBoxData, this, '/alarm/trigger', this.tableInit)
    },
    handleSelectId (val) {
      this.checkBoxData = val
    },
    handleEdit (row) {
//      console.log(row)
      this.$router.push({
        path: '/warnMessage/warn4',
        query: {
          triggerId: row.id
        }
      })
    },
    handleDelete (row) {
      this.checkBoxData = [row];
      this.common.delFun(this.checkBoxData, this, '/alarm/trigger', this.tableInit)
    }
  },
  mounted:function () {
    let that = this;
//    let data = {
//      page: that.page,
//      rows: that.rows
//    };
////    获取触发器名称列表
//    that.common.getList(that, '/alarm/trigger/page', data, res => {
//      this.triggerList = res.list;
//      this.triggerList.unshift({
//        triggerName: '触发器名称',
//        id: ''
//      })
//    })
    this.tableInit();
  }
}
</script>

<style scoped>
  .home-container {
    width: 100%;
    height: 100%;
    min-height: 800px;
    /*padding: 10px 20px 10px 20px;*/
    margin: 0 auto;
    background: #e8ebf0;
  }
  i {
  font-size: 20px;
  font-weight: 700;
  color: rgb(25, 154, 245);
  margin-right: 10px;
}
</style>
