<template>
  <div class="body">
    <div class="management-top " style="padding-left: 17px;">
      <el-row class="top-left">
        <el-button type="primary" v-btn="{text: '新增用户'}" class="personalButton filter-item" @click="adduser">新增用户</el-button>
        <el-button type="danger" v-btn="{text: '删除用户'}" class="personalButton filter-item" @click="delUser(checkBoxData)">删除用户</el-button>
      </el-row>
      <el-row class="m-t-right">
        <el-select v-model="data.sex" placeholder="性别" class="select filter-item" @change="dataGet(1)">
          <el-option label="性别" value="" />
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
        <el-select v-model="data.role" placeholder="角色" class="select filter-item" @change="dataGet(1)">
          <el-option label="角色" value=""/>
          <el-option
            v-for="(item,index) in identity"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-input v-model="data.keywords" placeholder="请输入用户名称" class=" filter-item" style="width: 200px;" autofocus="ture" />
        <el-button type="primary" class="personalButton filter-item btnSearch" @click="dataGet(1)">搜索</el-button>
      </el-row>
    </div>
    <vs-table
      style="margin-left:17px"
      v-if="tableData"
      :table-data="tableData"
      :col-configs="colConfigs"
      @changeTable="handleSelectId"
      @changeNum="handleNum"
    >
      <el-table-column slot="checkbox" type="selection" width="55" />
      <el-table-column slot="operation" align="center" label="功能操作">
        <template slot-scope="scope">
          <div class="password color-bule" v-btn="{text: '密码重置'}" @click="reset(scope.row)">重置密码</div>
          <span class="compile color-bule" v-btn="{text: '编辑用户'}" @click="handleEdit(scope.row)">编辑</span>
          <span class="a-delete color-bule" v-btn="{text: '删除用户'}" @click="handleDelete(scope.row)">删除</span>
        </template>
      </el-table-column>
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
    </vs-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colConfigs: [
        { prop: 'username', label: '姓名' },
        { prop: 'sex', label: '性别' },
        { prop: 'age', label: '年龄' },
        { prop: 'role.name', label: '角色' },
        { prop: 'phone', label: '联系电话' },
        { prop: 'email', label: '电子邮箱' },
        { prop: 'status', label: '激活状态' },
      ],
      tableData: {

      },
      identity: [], // 角色列表
      page: 1, // 页码
      data: {
        keywords: '', // 名称
        role: '', // 角色
        sex: '' // 性别
      },
      checkBoxData: [] // 删除的用户id
    }
  },
  computed:{
        isCollapse(){
            return this.data.keywords;
        }
    },
  watch:{
    isCollapse(newValue,oldValue){  //监听用户输入框无数据时
      if(newValue==''){
      this.dataGet(1)
      }
    }
  },
  mounted() {
    this.dataGet()
    this.status()
  },
  methods: {
    dataGet: function(e) { // 用户列表请求
    if(e == 1){
      this.page = e
    }
      if (this.data.sex != '') {
        this.$ajax({
          url: $$(`/sys/user/page?keywords=${this.data.keywords}&sex=${parseInt(this.data.sex)}&roleId=${this.data.role}&page=${this.page}`),
          // url:(`http://192.168.30.8:8800/sys/user/page?keywords=${this.data.keywords}&role=${this.data.role}&sex=${parseInt(this.data.sex)}&page=${this.page}`),
          method: 'get'
        }).then(res => {
          this.tableData = res.data.data
          for (var i of this.tableData.list) {
            if (i.sex == 0) {
              i.sex = '女'
            } else {
              i.sex = '男'
            }
          }
        })
      } else {
        this.$ajax({
          url: $$(`/sys/user/page?keywords=${this.data.keywords}&roleId=${this.data.role}&page=${this.page}`),
          // url:(`http://192.168.30.8:8800/sys/user/page?keywords=${this.data.keywords}&role=${this.data.role}&page=${this.page}`),
          method: 'get'
        }).then(res => {
          this.tableData = res.data.data
          for (var i of this.tableData.list) {
           
            if (i.sex == 0) {
              i.sex = '女'
            } else {
              i.sex = '男'
            }
          }
        })
      }
    },
    handleNum(num) { // 翻页
      this.page = num
      this.dataGet()
    },
    handleSelectId(val) { // 多选删除
      console.log(val)
      this.checkBoxData = val
    },
    delUser() { // 多个删除
        this.common.delMore(this.checkBoxData, this, '/sys/user/', this.dataGet)
    },
    handleDelete(res) { // 删除单行用户
      this.checkBoxData = [res]
      this.common.delFun(this.checkBoxData, this, '/sys/user/', this.dataGet,"radio")
    },
    handleEdit(res) { // 编辑用户
    console.log(res.id)
      this.$router.push({
        path: 'editorPersonal',
        query: {
          id: res.id
        }
      })
    },
    status() {
      this.$ajax({
        url: $$('/role/list?rows=1000'),
        method: 'get'
      }).then(data => {
        this.identity = data.data.data.list
      })
    },
    reset(res) { // 重置密码
      const id = res.id
      this.$confirm('即将重置为初始密码, 是否确认重置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax({
             url:$$(`/sys/user/resetPassword?id=${id}`),
          method: 'post'
        }).then(data => {
          if (data.data.status == 200) {
            this.$message({
              type: 'success',
              message: '重置成功!'
            })
          } else {
            that.$message.error(data.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    },
    adduser() { // 新增
      this.$router.push({
        path: 'addPersonal'
      })
    }
  }
}
</script>

<style scoped >
.body{
    margin: 20px;

    background-color:rgb(27,35,51);
}
.management-top{
    padding: 2vh 0;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
}
.btn{
    margin-left: 20px;
    border-radius: 0;
}
.btnSearch{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.m-t-right{
    display: flex;
    padding-right: 17px;
}
.select{
    width: 100px;
    margin-right: 20px;
}
.el-select-dropdown__item{
    color: white;
}
.color-bule{
    color: rgb(25, 154, 245);
    text-decoration:underline;
    cursor: pointer;
    padding-right: 5px;
}
.personalButton{
  margin: 0!important;
}
</style>
