<template>
  <div class="type-contain">
    <div class="type-select">
      <div class="">
        <router-link to="/system/system4">
          <el-button class="filter-item" v-btn="{text: '新增解决方案'}" type="primary">新增解决方案</el-button>
        </router-link>
        <el-button type="danger" v-btn="{text: '删除解决方案'}" @click="delMore">删除解决方案</el-button>
      </div>
      <div class="search">
        <el-input v-model="keywords" class="mg-l-10" placeholder="请输入解决方案名称">
          <template slot="append">
            <el-button class="filter-item" type="primary" @click="search">搜索</el-button>
          </template>
        </el-input>
      </div>
    </div>

    <vs-table
      v-if="tableData"
      @changeTable="handleSelectId"
      :table-data="tableData"
      :col-configs="colConfigs"
      @changeNum="handleNum"
    >
      <el-table-column slot="checkbox" type="selection" width="55"></el-table-column>
       <el-table-column slot="alarmType" align="center" label="解决方案类型">
      <template slot-scope="scope">
          <div>{{scope.row.alarmType == 0 ? "网关离线" : scope.row.alarmType == 1 ? "设备锁定" : scope.row.alarmType == 2 ? "设备离线" : "采集点告警"}}</div>
        </template>
      </el-table-column>
      <el-table-column slot="bindNum" align="center" label="已绑定目标数量">
      <template slot-scope="scope">
          <div :title="scope.row.bindNum">{{scope.row.bindNum}}</div>
        </template>
      </el-table-column>
      <el-table-column slot="createTime" align="center" label="编写时间">
      <template slot-scope="scope">
          <div :title="scope.row.createTime">{{common.datetimeFormat(scope.row.createTime)}}</div>
        </template>
      </el-table-column>
      <el-table-column slot="operation" align="center" label="操作">
        <template slot-scope="scope">
          <span v-btn="{text: '编辑解决方案'}" @click="handleEdit(scope.row)">编辑</span>
          <span v-btn="{text: '删除解决方案'}" @click="handleDelete(scope.row)">删除</span>
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
      { prop: "solutionName", label: "解决方案名称" },
      // { prop: "alarmType", label: "解决方案类型" },
      // { prop: "bindNum", label: "已绑定目标数量" },
      // { prop: "createTime", label: "编写时间" }
    ];
    return {
      keywords: "",
      select: "0",
      page: 1,
      rows: 10,
      tableData: [],
      customerId: "",
      status: "",
      checkBoxData: []
    };
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
    this.dataGet();
  },
  methods: {
    search(){
      this.page = 1
      this.dataGet()
    },
    dataGet: function() {
      const data = {
        pages: this.page,
        rows: this.rows,
        name:this.keywords
      };
      this.common.getTableList(this, "/solution/list", data, res => {
        this.tableData = res;
      });
    },
    handleNum(num) {
      this.page = num;
      this.dataGet();
    },
    changeCus(id) {
      this.customerId = id;
      this.dataGet();
    },
    changeStatus(id) {
      this.status = id;
      this.dataGet();
    },
    handleSelectId(val) {
      this.checkBoxData = val;
    },
    //编辑
    handleEdit(row) {
      this.$router.push({
        path: "/system/system7",
        query: {
          id: row.id
        }
      });
    },
    //删除
    handleDelete(row) {
      this.checkBoxData = [row];
      this.common.delFun(this.checkBoxData, this, "/solution", this.dataGet,"radio");
    },
    //删除多选
    delMore() {
      this.common.delMore(this.checkBoxData, this, "/solution", this.dataGet);
    }
  }
};
</script>
<style lang="scss" scoped>
.type-contain {
  width: 97%;
  background: #1b2333;
  border-radius: 10px;
  /*height: 300px;*/
  margin: 20px 1.5% 20px 1.2%;
  padding-bottom: 20px;
  .type-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 98%;
    height: 80px;
    margin: 15px 15px 0px auto;
    .search {
      display: flex;
    }
    >>> .el-input-group__prepend {
      border: none;
    }

    .el-input__inner {
      background: #233149 !important;
      border: none;
      color: #b2bdcd;
    }
  }
}
span {
  font-size: 14px;
  color: rgb(25, 154, 245);
  margin-right: 10px;
  cursor: pointer;
}
</style>
