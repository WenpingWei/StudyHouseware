<template>
  <div class="type-contain">
    <div class="type-select">
      <div class="mg-l-15" style="margin-left:0" >
        <router-link to="/equipmentManage/menu3">
          <el-button class="filter-item" type="primary" v-btn="{text: '新增类型'}">新增类型</el-button>
        </router-link>
        <el-button type="danger" @click="delMore" v-btn="{text: '删除类型'}">删除类型</el-button>
      </div>
      <div class="search">
        <el-input v-model="keywords" class="mg-l-10" placeholder="请输入类型名称">
          <template slot="append">
            <el-button class="filter-item" type="primary" @click="reacht">搜索</el-button>
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
      <el-table-column slot="operation" align="center" label="功能操作" >
        <template slot-scope="scope" class="function">
          <span v-btn="{text: '编辑类型'}" @click="handleEdit(scope.row)">编辑</span>
          <span v-btn="{text: '删除类型'}" @click="handleDelete(scope.row)">删除</span>
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
      { prop: "typeName", label: "类型名称" },
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
      this.reacht()
      }
    }
  },
  mounted() {
    this.dataGet();
  },
  methods: {
    reacht(){
      this.page = 1
      this.dataGet();
    },
    dataGet: function() {
      const data = {
        page: this.page,
        rows: this.rows,
        typeName: this.keywords
      };
      this.common.getTableList(this, "/deviceType/list", data, res => {
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
        path: "/equipmentManage/menu17",
        query: {
          id: row.id
        }
      });
    },
    //删除
    handleDelete(row) {
      this.checkBoxData = [row];
      console.log(this.checkBoxData)
      this.common.delFun(this.checkBoxData, this, "/deviceType", this.dataGet,"radio");
      console.log(this.checkBoxData)
    },
    //删除多选
    delMore() {
      this.common.delMore(this.checkBoxData, this, "/deviceType", this.dataGet);
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
  cursor: pointer;
  padding: 10px;
}
.function{
  width: 150px;
  display: flex;
  justify-content: space-around;
}
</style>
