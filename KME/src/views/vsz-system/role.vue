<template>
  <div class="device-contain">
    <div class="device-select">
      <div class="mg-l-15">
        <router-link to="/system/system5">
          <el-button class="filter-item" v-btn="{text: '新增角色'}" type="primary">新增角色</el-button>
        </router-link>
        <el-button type="danger" @click="delMore" v-btn="{text: '删除角色'}">删除角色</el-button>
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
       
      <el-table-column slot="description" align="center" label="角色描述">
        <template slot-scope="scope">
          <span style="  
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          display: inline-block;"  
          :title="scope.row.description" >{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="operation" align="center" label="功能操作">
        <template slot-scope="scope">
          <span class="color-blue cursor" v-btn="{text: '编辑角色'}" @click="editLink(scope.row)">编辑</span>
          <span class="color-blue cursor" v-btn="{text: '删除角色'}" @click="handleDelete(scope.row)">删除</span>
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
      // { prop: 'deviceName', label: '设备名称' },
      { prop: 'name', label: '角色名称' },
      { prop: 'createTime', label: '创建时间' }
      // { prop: 'expire', label: '功能操作' }
    ]
    return {
      keywords: '',
      page: 1,
      rows: 10,
      tableData: [],
      checkBoxData: []
    }
  },
  mounted() {
    this.dataGet()
  },
  methods: {
    dataGet: function() {
      const data = {
        page: this.page,
        rows: this.rows
      }
      this.common.getTableList(this, '/role/list', data, res => {
        this.tableData = res
        // this.checkBoxData.length = 0;
      })
    },
    delMore() {
      this.common.delMore(this.checkBoxData, this, '/role', this.dataGet)
    },
    handleDelete(row) {
      this.checkBoxData = [row]
      this.common.delFun(this.checkBoxData, this, '/role', this.dataGet,"radio")
    },
    handleNum(num) {
      this.page = num
      this.dataGet()
    },
    handleSelectId(val) {
      this.checkBoxData = val
    },
    editLink(row) {
      this.$router.push({
        path: '/system/system6',
        query: {
          roleId: row.id
        }
      })
    }
  }
}
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
      >>>.el-input-group__prepend {
        border: none;
      }
      .el-select{
        /*width: 150px;*/
        /*border: 1px solid #199af5;*/
      }
      .el-input__inner {
        background: #233149!important;
        border: none;
        color: #b2bdcd;
      }
    }
  }
</style>
