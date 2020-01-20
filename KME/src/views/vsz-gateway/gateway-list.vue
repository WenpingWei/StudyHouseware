<!--网关管理 网关列表-->
<template>
  <div class="home-container">
    <div class="home-content bigBox">
      <div class="list-header">
        <div>
          <router-link to="/gateway/addGateway">
            <el-button id="addbtn" v-btn="{text: '新增网关'}" class="filter-item" type="primary">新增网关</el-button>
          </router-link>
          <el-button v-btn="{text: '删除网关'}" class="filter-item" type="danger" @click="delMore">删除网关</el-button>
        </div>
        <form action>
          <vs-custom-list
            class="filter-item"
            :custom-id="company"
            title="所有客户"
            @changeCustom="changeCustom"
          />
          <el-select v-model="typeVal" style="width: 200px" class="filter-item" @change="sreach">
            <el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-input
            v-model.trim="name"
            placeholder="请输入网关名称"
            style="width: 200px;"
            class="filter-item"
          />
          <el-button class="filter-item" type="primary" @click="sreach">搜索</el-button>
        </form>
      </div>
      <vs-table
        v-if="tableData"
        :table-data="tableData"
        :col-configs="colConfigs"
        @changeTable="handleSelectId"
        @changeNum="handleNum"
      >
        <el-table-column slot="checkbox" type="selection" width="55" />
        <el-table-column slot="operation" align="center" width="180" label="功能操作">
          <template slot-scope="scope">
            <span v-btn="{text:'绑定设备'}" @click="toDeviceBind(scope.row)">绑定设备</span>
            <!-- <span @click="toOperationalLog(scope.row)">操作日志</span>  -->
            <span v-btn="{text:'编辑网关'}" @click="handleEdit(scope.row)">编辑</span>
            <span v-btn="{text:'删除网关'}" @click="handleDelete(scope.row)">删除</span>
          </template>
        </el-table-column>
      </vs-table>
    </div>
  </div>
</template>

<script type="">
export default {
  data() {
    this.colConfigs = [
      { prop: "name", label: "网关名称" },
      { prop: "state", label: "网关状态" },
      { prop: "hierarchy", label: "关联层级" },
      { prop: "snNumber", label: "SN" },
      { prop: "id", label: "网关ID" },
      { prop: "customerName", label: "所属客户" },
      { prop: "version", label: "固件版本" }
    ];
    return {
      tableData: [],
      checkBoxData: [],
      typeVal: "",
      company: "",
      name: "",
      page: 1,
      rows: 10,
      status: [
        {
          id: "",
          name: "所有状态"
        },
        {
          id: 0,
          name: "离线"
        },
        {
          id: 1,
          name: "在线"
        },
        {
          id: 2,
          name: "告警"
        }
      ]
    };
  },
    computed:{
        isCollapse(){
            return this.name;
        }
    },
  watch:{
    isCollapse(newValue,oldValue){  //监听用户输入框无数据时
      if(newValue==''){
      this.sreach()
      }
    }
  },
  created() {},
  mounted: function() {
    this.dataGet();
  },
  methods: {
    // 获取网关列表
    sreach(){
      this.page = 1;
      this.dataGet();
    },
    dataGet: function() {
      const data = {
        page: this.page,
        rows: this.rows,
        customerId: this.company,
        status: this.typeVal,
        name: this.name
      };
      this.common.getTableList(this, "/gateway/list", data, res => {
        this.tableData = res;
        for(var i of this.tableData.list){

            i.hierarchy = "--"

        }
        this.checkBoxData.length = 0;
      });

    },
    // 新增
    addPoint() {
      this.$router.push({
        path: "/gateway/addGateway"
      });
    },
    // 绑定设备
    toDeviceBind(row) {
      this.$router.push({
        path: "/gateway/deviceBind",
        query: {
          id: row.id
        }
      });
    },
    // 操作日志
    // toOperationalLog(row) {
    //   this.$router.push({
    //     path: "/gateway/operationalLog",
    //     query: {
    //       id: row.id
    //     }
    //   });
    // },
    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: "/gateway/modifyGateway",
        query: {
          id: row.id
        }
      });
    },
    // 删除
    handleDelete(row) {
      this.checkBoxData = [row];
      this.common.delFun(this.checkBoxData, this, "/gateway", this.dataGet,"radio");
      this.checkBoxData = []
    },
    //      获取表格选择的id
    handleSelectId(val) {
      this.checkBoxData = val;
    },
    //      删除多选
    delMore() {
      this.common.delMore(this.checkBoxData, this, "/gateway", this.dataGet);
    },
    //    筛选公司
    changeCustom(id) {
      this.company = id;
      this.page =1;
      this.dataGet();
    },
    handleNum(num) {
      this.page = num;
      this.dataGet();
    }
  }
};
</script>

<style lang="scss" scoped>
.headContent {
  height: 110px;
  padding-top: 30px;
  padding-left: 25px;
  .headContent-box {
    width: 70%;
    display: flex;
    justify-content: space-between;
    p {
      color: #fff;
      font-size: 16px;
    }
  }
}
.list-header {
  display: flex;
  width: 98%;
  margin: 14px auto;
  justify-content: space-between;
}
span {
  font-size: 14px;
  color: rgb(25, 154, 245);
  margin-right: 10px;
  cursor: pointer;
}
.bigBox{
  width: 97%;
}
</style>
