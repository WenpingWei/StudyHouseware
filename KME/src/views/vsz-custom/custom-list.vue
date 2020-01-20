<template>
  <el-row class="custom">
    <!-- 表头部 -->
    <el-header class="custom-top">
      <el-row class="c-t-left">
        <!-- 增删按钮 -->
        <el-button
          type="primary"
          v-btn="{text: '新增客户'}"
          class="btn filter-item"
          @click="addUser"
        >新增客户</el-button>
        <el-button
          type="danger"
          v-btn="{text: '删除客户'}"
          class="btn filter-item"
          @click="delUser(delList)"
        >删除客户</el-button>
      </el-row>
      <!-- 搜索框 -->
      <el-row class="c-t-right">
        <el-input v-model="input" placeholder="请输入客户名称" class="filter-item" autofocus="ture" />
        <el-button type="primary" class="btn-search filter-item" @click="search($index,row)">搜索</el-button>
      </el-row>
    </el-header>
    
    <!-- 表主题 -->
    <el-main>
      <el-table
        :data="ClientList"
        style="width: 100%;"
        :cell-style="tabelCeellStyle"
        :header-cell-style="tableHeaderColor"
        :row-style="tableRowStyle"
        empty-text="没有搜索到相关内容"
        class="table"
        @select-all="selectAll"
        @selection-change="selection"
      >
        <el-table-column type="selection" width="55" class="information" />
        <el-table-column label="客户名称">
          <template scope="scope">
            <a class="gb-bule" @click="customInfo(scope.row)">{{ scope.row.customerName }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="telephone" label="客户电话" />
        <el-table-column prop="email" label="客户邮箱" />
        <el-table-column prop="address" label="客户地址" />
        <el-table-column prop="deviceCount" label="设备数量" />
        <el-table-column label="功能操作">
          <template scope="scope" class="feature">
            <a class="gb-bule" size="mini" v-btn="{text: '编辑客户'}" @click="handleEdit(scope.row)">编辑</a>
            <a
              class="gb-bule"
              size="mini"
              type="danger"
              v-btn="{text: '删除客户'}"
              @click="handleDelete(scope.row)"
            >删除</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top: 10px;margin-left: -5px;">
        <el-pagination
          background
          :current-page.sync="pageNumber"
          :total="listTotal"
          layout="prev, pager, next,jumper,->"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      input: "", // 需要查询的用户名
      ClientList: [], // 客户列表
      checkBoxData: [],
      listTotal: 2,
      pageNumber: 1,
      rows: 10
    };
  },
  created() {
    this.dataGet();
  },
   computed:{
        isCollapse(){
            return this.input;
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
    handleEdit(res) {
      // 编辑客户
      this.$router.push({
        path: "custom2",
        query: {
          id: res.id
        }
      });
    },
    search(){   //搜索处理
      this.pageNumber = 1;
      this.dataGet();
    },
    handleDelete(res) {
      // 删除客户
      this.checkBoxData=[res];
      this.common.delFun(this.checkBoxData,this,"/custom/customer/",this.dataGet,"radio");
    },
    dataGet: function() {
      // 用户列表请求
      this.$ajax
        .get($$(`/custom/customer/page`), {
          params: {
            page: this.pageNumber,
            row: this.row,
            type: 1,
            keywords: this.input,
            getPage:1
          }
        })
        .then(res => {
          this.ClientList = res.data.data.list;
          this.listTotal = res.data.data.total;
        });
    },

    customInfo(res) {
      // 用户信息
      this.$router.push({
        path: "custom3",
        query: {
          id: res.id
        }
      });
    },
    selection(row) {
      // 选中一或多个
      console.log(row)
      for (var i of row) {
        this.checkBoxData.push(i);
      }
    },
    selectAll(selection) {
      console.log(selection)
      // 全部选中
      this.checkBoxData.push(selection);
    },
    delUser() {
      // 删除用户按钮事件
      this.common.delMore(
        this.checkBoxData,
        this,
        "/custom/customer/",
        this.dataGet
      );
    },
    addUser() {
      // 增加用户
      this.$router.push({
        path: "customadd"
      });
    },

    handleCurrentChange(res) {
      // 分页的当前页
      this.pageNumber = res;
      // console.log(res);
      this.dataGet();
    },
    /*
        样式函数代码
        */
    tableRowStyle({ row, rowIndex }) {
      return "background-color:#161e2b;font-size:14px; text-align:center";
    },
    // 设置表头行的样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return "background-color:rgb(39,55,83);color:rgb(25, 154, 245);font-wight:700;font-size:14px;text-align:center";
    },
    tabelCeellStyle({ cell, index }) {
      return "background-color:#161e2b;color:#fff;text-align:center";
    }
  }
};
</script>

<style  scoped >
.custom {
  margin: 20px;
  background-color: rgb(27, 35, 51);
}
.custom-top {
  padding-top: 2vh;
  display: flex;
  justify-content: space-between;
}
.c-t-right {
  display: flex;
}
.btn-search {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.search-title {
  color: white;
}
.information {
  background-color: #1b2232;
}
.gb-bule {
  color: rgb(25, 154, 245);
  text-decoration: underline;
  cursor: pointer;
}
.table {
  font-size: 14px;
}
</style>
