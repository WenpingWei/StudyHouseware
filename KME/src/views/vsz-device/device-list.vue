<template>
  <div class="device-contain">
    <div class="device-select">
      <div class="mg-l-15" style="width:300px">
        <router-link to="/equipmentManage/menu2">
          <el-button v-btn="{text: '新增设备'}" class="filter-item" type="primary">新增设备</el-button>
        </router-link>
        <el-button v-btn="{text: '删除设备'}" type="danger" @click="delMore">删除设备</el-button>
      </div>
      <div class="search">
        <vs-custom-list class="company-search" :custom-id="customerId" @changeCustom="changeCus" />
        <vs-status :status-id="status" class="mg-l-10" @changeStatus="changeStatus" />
        <el-input v-model="keywords" class="mg-l-10" placeholder="请输入设备名称">
          <template slot="append">
            <el-button class="filter-item" type="primary" @click="sreach">搜索</el-button>
          </template>
        </el-input>
      </div>
    </div>
    <vs-table
      v-if="tableData"
      :table-data="tableData"
      :col-configs="colConfigs"
      @changeTable="handleSelectId"
      @changeNum="handleNum"
    >
      <el-table-column slot="checkbox" type="selection" width="55" />
      <el-table-column slot="detail" label="设备名称">
        <template slot-scope="scope">
          <span
            class="color-blue cursor"
            @click="deviceSurvey(scope.row,1)"
          >{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column slot="lockstate" align="center" label="锁定状态">
        <template slot-scope="scope">
          <span>{{ scope.row.dayNum === ''?'---':(scope.row.dayNum>0?'未锁定':'已锁定') }}</span>
        </template>
      </el-table-column>
      <el-table-column slot="deviceStatus" align="center" label="设备状态">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceStatus === 0?"在线":( scope.row.deviceStatus === 1?"离线":"故障") }}</span>
        </template>
      </el-table-column>
      <el-table-column slot="operation" align="center" label="功能操作">
        <template slot-scope="scope">
          <div>
            <span
              class="color-blue cursor"
              v-btn="{text: '历史轨迹'}"
              @click="deviceSurvey(scope.row,3)"
            >历史轨迹</span>
            <span
              class="color-blue cursor"
              v-btn="{text: '告警记录'}"
              @click="deviceSurvey(scope.row,2)"
            >告警记录</span>
          </div>
          <span class="color-blue cursor" v-btn="{text: '编辑设备'}" @click="editLink(scope.row)">编辑设备</span>
          <span class="color-blue cursor" v-btn="{text: '删除设备'}" @click="handleDelete(scope.row)">删除</span>
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
      { prop: "serialNumber", label: "设备编号" },
      { prop: "typeName", label: "设备类型" },
      { prop: "customerName", label: "所属客户" },
      { prop: "expire", label: "到期日期" },
      { prop: "dayNum", label: "剩余时间" }
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
  mounted() {
    this.dataGet();
  },
    computed:{
        isCollapse(){
            return this.keywords;
        }
    },
  watch:{
    isCollapse(newValue,oldValue){  //监听用户输入框无数据时
      if(newValue==''){
      this.sreach()
      }
    }
  },
  methods: {
    sreach(){
      this.page = 1
      this.dataGet()
    },
    dataGet: function() {
      const data = {
        page: this.page,
        rows: this.rows,
        customerId: this.customerId,
        status: this.status,
        type: 1,
        keywords: this.keywords
      };
      this.common.getTableList(this, "/dev/deploy/list", data, res => {
        console.log(res.list);
        
        this.tableData = res;
      });
    },
    delMore() {
      this.common.delMore(this.checkBoxData, this, "/dev/deploy", this.dataGet);
    },
    handleDelete(row) {
      this.checkBoxData = [row];
      this.common.delFun(this.checkBoxData, this, "/dev/deploy", this.dataGet,"radio");
    },
    handleNum(num) {
      this.page = num;
      this.dataGet();
    },
    changeCus(id) {
      this.customerId = id;
      this.page = 1
      this.dataGet();
    },
    changeStatus(id) {
      this.status = id;
      this.page = 1
      this.dataGet();
    },
    handleSelectId(val) {
      this.checkBoxData = val;
    },
    // 跳转到设备详细界面
    deviceSurvey(row, tab) {
      this.$router.push({
        path: "Menu19",
        query: {
          deviceId: row.id,
          longitude: row.longitude,
          latitude: row.latitude,
          tab
        }
      });
    },
    editLink(row) {
      this.$router.push({
        path: "/equipmentManage/menu10",
        query: {
          deviceId: row.id
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.device-contain {
  width: 97%;
  background: #1b2333;
  border-radius: 10px;
  /*height: 300px;*/
  margin: 20px 1.5% 20px 1.2%;
  padding-bottom: 20px;
  .device-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    margin: 15px 15px 0px auto;
    .search {
      display: flex;
    }
    >>> .el-input-group__prepend {
      border: none;
    }
    .el-input-group {
      width: 300px;
    }
    .el-select {
      /*width: 150px;*/
      /*border: 1px solid #199af5;*/
    }
    .el-input__inner {
      background: #233149 !important;
      border: none;
      color: #b2bdcd;
    }
  }
  .company-search {
    width: 350px;
  }
}
</style>
