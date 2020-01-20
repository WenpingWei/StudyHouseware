<!--绑定设备列表-->
<template>
  <div class="home-container">
    <div class="head">
      <div class="headBox">
        <p>绑定设备</p>
      </div>
      <div class="headContent">
        <div class="headContent-box">
          <p :title="gatewayDetails.name">网关名称：{{gatewayDetails.name}}</p>
          <p :title="gatewayDetails.state">网关状态：{{gatewayDetails.state}}</p>
          <p :title="gatewayDetails.snNumber">SN：{{(gatewayDetails.snNumber)}}</p>
          <p :title="gatewayDetails.id">网关ID：{{gatewayDetails.id}}</p>
          <p :title="gatewayDetails.customerName">所属用户：{{gatewayDetails.customerName}}</p>
          <p :title="gatewayDetails.version">固件版本：{{gatewayDetails.version}}</p>
          <div class="dataBtn">
          <el-button type="primary" v-btn="{text: '网关数据下发'}" @click="updateMQTT">网关数据下发</el-button>
          </div>
        </div>
        
      </div>
    </div>
    <div class="home-content bigBox">
      <div class="list-header">
        <div>
          <el-button
            class="filter-item"
            v-btn="{text: '新增绑定设备'}"
            type="primary"
            @click="addPoint"
          >新增绑定设备</el-button>
          <el-button
            class="filter-item"
            v-btn="{text: '删除绑定设备'}"
            type="danger"
            @click="delMore"
          >删除设备</el-button>
        </div>
        <form action>
          <el-select
            v-model="dataTemplateId"
            style="width: 200px"
            class="filter-item"
            @change="dataGet"
          >
            <el-option
              v-for="item in dataTemplateList"
              :key="item.id"
              :label="item.tplName"
              :value="item.id"
            />
          </el-select>
          <el-input
            v-model.trim="name"
            placeholder="请输入绑定设备名称"
            style="width: 200px;"
            class="filter-item"
          ></el-input>
          <el-button class="filter-item" type="primary" @click="dataGet">搜索</el-button>
        </form>
      </div>
      <div>
        <vs-table
          @changeTable="handleSelectId"
          :table-data="tableData"
          :col-configs="colConfigs"
          @changeNum="handleNum"
        >
          <el-table-column slot="checkbox" type="selection" width="55"></el-table-column>
          <el-table-column slot="detail" label="绑定设备名称">
            <template slot-scope="scope">
              <span class="color-blue cursor" @click="deviceInfo(scope.row)">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column slot="operation" align="center" label="功能操作">
            <template slot-scope="scope">
              <span v-btn="{text: '告警设置'}" @click="handleAlarm(scope.row)">告警设置</span>
              <span v-btn="{text: '编辑绑定设备'}" @click="handleEdit(scope.row)">编辑</span>
              <span v-btn="{text: '删除绑定设备'}" @click="handleDelete(scope.row)">删除</span>
            </template>
          </el-table-column>
        </vs-table>
      </div>
    </div>
  </div>
</template>

<script type="">
export default {
  data() {
    this.colConfigs = [
      { prop: "deviceName", label: "关联设备" },
      { prop: "tplName", label: "数据模板" },
      { prop: "agreement", label: "通信协议" }
    ];
    return {
      tableData: [],
      checkBoxData: [],
      typeVal: "",
      page: 1,
      rows: 10,
      dataTemplateList: [],
      dataPoins: "",
      templateId: "",
      gatewayDetails: {},
      listTotal: 0,
      pageNum: 0,
      currentPage: "",
      name: "",
      dataTemplateId: "",
      id: ""
    };
  },
  created() {},
  methods: {
    //表头颜色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #273753;font-weight:600;font-size:14px;color:#199af5;";
      } else if (rowIndex === 1) {
        return "background-color: #273753;font-size:14px;text-align:center";
      } else if (rowIndex === 2) {
        return "background-color: #273753;font-size:14px;text-align:center";
      }
    },
    //表格隔行换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "single-row";
      } else {
        return "double-row";
      }
    },
    //获取网关详情
    getListData: function() {
      let that = this;
      that.$ajax
        .get($$("/gateway"), { params: { id: that.id } })
        .then(function(data) {
          that.gatewayDetails = data.data.data;
          console.log( data.data.data);
          that.gatewayDetails.state == 0
            ? (that.gatewayDetails.state = "离线")
            : that.gatewayDetails.state == 1
            ? (that.gatewayDetails.state = "在线")
            : "故障";
        });
    },
    //获取数据点列表
    dataGet: function(cid) {
      let data = {
        page: this.page,
        rows: this.rows,
        name: this.name,
        dataTemplateId: this.dataTemplateId,
        gatewayId: this.id
      };
      this.common.getTableList(this, "/plc/list", data, res => {
        this.tableData = res;
      });
    },
    //网关数据下发
    updateMQTT() {
      let that = this;
      if (that.gatewayDetails.state != "在线") {
        that.$message.error(`网关${that.gatewayDetails.state}，无法下发数据`);
      } else {
        that.$ajax
          .put($$("/gateway/update/mqtt"), { gatewayId: that.id })
          .then(function(data) {
            if ((data.data.status = 200)) {
              that.$message({
                message: "网关数据下发成功！",
                type: "success"
              });
            }
          });
      }
    },
    //新增
    addPoint() {
      this.$router.push({
        path: "/gateway/deviceBindAdd",
        query: {
          gatewayId: this.id
        }
      });
    },
    //绑定设备详情
    deviceInfo(row) {
      this.Cookies.set("tabPage", 2);
      this.$router.push({
        path: "/gateway/deviceBindDetails",
        query: {
          id: row.id,
          gatewayId: this.id,
          tab: 0
        }
      });
    },
    //告警设置
    handleAlarm(row) {
      this.Cookies.set("tabPage", 1);
      this.$router.push({
        path: "/gateway/deviceBindDetails",
        query: {
          id: row.id,
          gatewayId: this.id,
          tab: 1
        }
      });
    },
    //编辑
    handleEdit(row) {
      this.$router.push({
        path: "/gateway/deviceBindModify",
        query: {
          id: row.id,
          gatewayId: this.id
        }
      });
    },
    //删除
    handleDelete(row) {
      this.checkBoxData = [row];
      this.common.delFun(this.checkBoxData, this, "/plc", this.dataGet);
    },
    //      获取表格选择的id
    handleSelectId(val) {
      this.checkBoxData = val;
    },
    //      删除多选
    delMore() {
      this.common.delMore(this.checkBoxData, this, "/plc", this.dataGet);
    },
    handleNum(num) {
      this.page = num;
      this.dataGet();
    }
  },
  mounted: function() {
     this.$ajax
        .get($$(`/data/template/list`), {
          params: {
            getPage:0
          }
        })
        .then(res => {
          this.dataTemplateList = res.list;
        });

    // this.common.getTableList(this, "/data/template/list", {}, res => {
    //   this.dataTemplateList = res.list;
    //   this.dataTemplateList.unshift({
    //     id: "",
    //     tplName: "所有数据模板"
    //   });
    // });
    this.id = this.$route.query.id;
    this.getListData();
    this.dataGet();
  }
};
</script>

<style lang="scss" scoped>
.head {
  background-color: #1b2333;
  width: 98%;
  margin: 10px auto 20px;
}
.headBox {
  width: 100%;
  height: 40px;
  background-color: #273753;
  p {
    width: 130px;
    height: 40px;
    background-color: #199af5;
    text-align: center;
    line-height: 40px;
    color: #fff;
  }
}

.headContent {
  height: 110px;
  padding-top: 30px;
  padding-left: 25px;
  position: relative;
  .headContent-box {
    width: 100%;
    display: flex;
    font-size: 16px;
    justify-content: space-around;
    p {
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 10px;
    }
 
  }

}
.dataBtn{
  margin-left: 1%;
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
a {
  color: #009dd9;
  text-decoration: underline;
}
</style>
