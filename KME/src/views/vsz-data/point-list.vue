<!--数据管理 数据点列表-->
<template>
  <div class="home-container">
    <div class="head">
      <div class="headBox">
        <p>数据点管理</p>
      </div>
      <div class="headContent">
        <div class="headContent-box">
          <p>数据模板名称：{{templateDetails.tplName}}</p>
          <p>数据点个数：{{templateDetails.pointCount}}</p>
          <p>添加时间：{{this.common.datetimeFormat(templateDetails.createTime)}}</p>
          <p style="width:40%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;"
          :title="templateDetails.mark">备注：{{templateDetails.mark}}</p>
        </div>
      </div>
    </div>
    <div class="home-content bigBox">
      <div class="list-header">
        <div>
          <el-button class="filter-item" v-btn ="{text: '新增数据点'}" type="primary" id="addbtn" @click="addPoint">新增数据点</el-button>
          <el-button class="filter-item" v-btn ="{text: '删除数据点'}" type="danger" @click="delMore">删除数据点</el-button>
        </div>
        <form action>
          <el-select v-model="typeVal" style="width: 200px" class="filter-item" @change="search">
            <el-option v-for="item in dataType" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-input
            v-model.trim="dataPoins"
            placeholder="请输入数据点名称"
            style="width: 200px;"
            class="filter-item"
          ></el-input>
          <el-button class="filter-item" type="primary" @click="search">搜索</el-button>
        </form>
      </div>
      <vs-table
        @changeTable="handleSelectId"
        v-if="tableData"
        :tableData="tableData"
        :colConfigs="colConfigs"
        @changeNum="handleNum"
      >
        <el-table-column slot="checkbox" type="selection" width="55"></el-table-column>
          <el-table-column slot="mark" align="center" label="告警描述">
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
        <el-table-column slot="operation" align="center" label="操作">
          <template slot-scope="scope">
            <span v-btn ="{text: '编辑数据点'}" @click="handleEdit(scope.row)">编辑</span>
            <span v-btn ="{text: '删除数据点'}" @click="handleDelete(scope.row)">删除</span>
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
      { prop: "collectName", label: "数据点名称" },
      { prop: "shortName", label: "缩略名" },
      { prop: "collectId", label: "ID" },
      { prop: "dataType", label: "数据类型" },
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
      checkBoxData: [],
      typeVal: "",
      page: 1,
      rows: 10,
      dataType: [
        {
          id: "",
          name: "数据类型"
        },
        {
          id: 1,
          name: "Number"
        },
        {
          id: 2,
          name: "String"
        },
        {
          id: 3,
          name: "Bool"
        },
         {
          id: 4,
          name: "Float"
        }
      ],
      dataPoins: "",
      templateId: "",
      templateDetails: {
        tplName: "",
        pointCount: "",
        createTime: "",
        mark: ""
      }
    };
  },
  created() {},
   computed:{
        isCollapse(){
            return this.dataPoins;
        }
    },
  watch:{
    isCollapse(newValue,oldValue){  //监听用户输入框无数据时
      if(newValue==''){
      this.page = 1;
      this.search()
      }
    }
  },
  methods: {
    search(){
      this.page = 1
      this.dataGet()
    },
    //获取模板详情
    getTemplate: function() {
      let that = this;
      that.$ajax
        .get($$("/data/template"), { params: { id: that.templateId } })
        .then(function(data) {
          that.templateDetails = data.data.data;
        });
    },
    //获取数据点列表
    dataGet: function() {
    this.getTemplate();
      let data = {
        page: this.page,
        rows: this.rows,
        name: this.dataPoins,
        dataType: this.typeVal,
        templateId: this.templateId
      };
      this.common.getTableList(this, "/data/point/list", data, res => {
        this.tableData = res;
        this.checkBoxData.length = 0;
      });
    },
    //新增
    addPoint() {
      this.$router.push({
        path: "/dataManage/dataNum6",
        query: {
          templateId: this.templateId
        }
      });
    },
    //编辑
    handleEdit(row) {
      this.$router.push({
        path: "/dataManage/dataNum4",
        query: {
          id: row.id,
          templateId: this.templateId
        }
      });
    },
    //删除
    handleDelete(row) {
      this.checkBoxData = [row];
      this.common.delFun(this.checkBoxData, this, "/data/point", this.dataGet,"radio");
    },
    //      获取表格选择的id
    handleSelectId(val) {
      this.checkBoxData = val;
    },
    //      删除多选
    delMore() {
      this.common.delMore(this.checkBoxData, this, "/data/point", this.dataGet);
    },
    handleNum(num) {
      this.page = num;
      this.dataGet();
    }
  },
  mounted: function() {
    this.templateId = this.$route.query.templateId;
    this.dataGet();
    // this.getTemplate();
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
  padding-top: 30px;
  padding-left: 25px;
  padding-bottom: 30px;
  .headContent-box {
    display: flex;
    justify-content: space-between;
    p {
      line-height: 25px;
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
  cursor:pointer;
}
.home-content{
  width: 98%;
  padding: 5px; 
}
</style>
