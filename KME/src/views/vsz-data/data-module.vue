<template>
  <!--数据管理下数据模板列表-->
  <div class="home-container">
    <div class="home-content">
      <div class="list-header">
        <div>
          <router-link to="/dataManage/dataNum2">
            <el-button
              v-btn ="{text: '新增数据模板'}"
              class="filter-item"
              type="primary"
            >新增数据模板</el-button>
          </router-link>
          <el-button  v-btn ="{text: '删除模板'}" class="filter-item" type="danger" @click="delMore">删除数据模板</el-button>
        </div>
        <div>
          <el-input
            v-model.trim="listQuery.title"
            placeholder="请输入数据模板名称"
            style="width: 200px;"
            class="filter-item"
          />
          <el-button class="filter-item" type="primary" @click="search">搜索</el-button>
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
        <el-table-column slot="mark" label="备注">
          <template scope="scope" >
            <div :title=" scope.row.mark"  class="mark-beizhu">{{ scope.row.mark }}</div> 
          </template>
        </el-table-column>
        <el-table-column slot="operation" align="center" label="功能操作">
          <template slot-scope="scope">
            <span v-btn ="{text: '数据点管理'}" @click="handledetails(scope.row)">数据点管理</span>
            <span v-btn ="{text: '编辑模板'}" @click="handleEdit(scope.row)">编辑</span>
            <span v-btn ="{text: '删除模板'}" @click="handleDelete(scope.row)">删除</span>
          </template>
        </el-table-column>
      </vs-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    this.colConfigs = [
      { prop: 'tplName', label: '数据模板名称' },
      { prop: 'pointCount', label: '数据点个数' },
      { prop: 'collectRate', label: '采集频率' },
      { prop: 'createTime', label: '添加时间' },
      // { prop: 'mark', label: '备注'}
    ]
    return {
      listQuery: {
        title: ''
      },
      direction: 'left',
      page: 1,
      rows: 10,
      tableData: [],
      checkBoxData: [] // 多选框选择的值
    }
  },
  created() {
    // this.fetchData()
  },
  mounted: function() {
    const _this = this
    _this.dataGet()
  },
   computed:{
        isCollapse(){
            return this.listQuery.title;
        }
    },
  watch:{
    isCollapse(newValue,oldValue){  //监听用户输入框无数据时
      if(newValue==''){
      this.page = 1;
      this.dataGet()
      }
      
    }
  },
  methods: {
    search(){
      this.page = 1;
      this.dataGet();
    },
    dataGet: function() {
      const data = {
        page: this.page,
        rows: this.rows,
        name: this.listQuery.title
      }
      this.common.getTableList(this, '/data/template/list', data, res => {
        console.log(res)
        this.tableData = res
        this.checkBoxData.length = 0
      })
    },
    // 详情
    handledetails(row) {
      this.$router.push({
        path: '/dataManage/dataNum3',
        query: {
          templateId: row.id
        }
      })
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: '/dataManage/dataNum5',
        query: {
          dataProId: row.id
        }
      })
    },
    // 删除
    handleDelete(row) {
      this.checkBoxData = [row]
      this.common.delFun(
        this.checkBoxData,
        this,
        '/data/template',
        this.dataGet
      )
    },
    handleSelectId(val) {
      this.checkBoxData = val
    },
    handleNum(num) {
      this.page = num
      this.dataGet()
    },
    //      删除多选
    delMore() {
      this.common.delMore(
        this.checkBoxData,
        this,
        '/data/template',
        this.dataGet
      )
    }
  }
}
</script>

<style scoped="">
.list-header {
  display: flex;
  justify-content: space-between;
  height: 70px;
  width: 98%;
  line-height: 70px;
  margin: 0 auto;
}
.sel-item {
  width: 160px;
  height: 35px;
  line-height: 40px;
  border: 1px #c0ccda solid;
  outline: none;
}
span {
  font-size: 14px;
  color: rgb(25, 154, 245);
  margin-right: 10px;
  cursor:pointer;
}
.mark-beizhu{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: inline-block;
}
</style>
