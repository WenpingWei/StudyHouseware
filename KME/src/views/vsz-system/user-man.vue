<template>
    <div class="body">
        <div class="management-top ">
             <el-row>   
                <el-button type='primary' class="custom-top-add btn" @click="adduser">新增客户</el-button>
                <el-button type="danger" class="custom-top-del btn" @click="delUser(checkBoxData)">删除客户</el-button>
            </el-row>
            <el-row class="m-t-right"> 
                <el-select  placeholder="性别" class="select" size="medium" v-model="data.sex" @change="dataGet" >
                    <el-option label="默认" value=""></el-option>
                    <el-option label="男" value=1></el-option>
                    <el-option label="女" value=0></el-option>
                </el-select>
                <el-select  placeholder="角色" class="select" size="medium" v-model="data.role" @change="dataGet">
                    <el-option label="管理员" value="管理员"></el-option>
                    <el-option label="员工" value="普通员工"></el-option>
                </el-select>
                <el-input   v-model="data.keywords" placeholder="请输入客户名称" class="iptSearch" autofocus="ture" size="medium" ></el-input>
                <el-button type='primary' class="btnSearch"  size="small" @click="dataGet()" >搜索</el-button>
            </el-row>
        </div>
        <vs-table
        @changeTable="handleSelectId"
        v-if="tableData"
        :tableData="tableData"
        :colConfigs="colConfigs"
        @changeNum="handleNum"
      >
        <el-table-column slot="checkbox" type="selection" width="55"></el-table-column>
        <el-table-column slot="operation" align="center" label="功能操作">
          <template slot-scope="scope" >
            <span class="password color-bule" @click="reset(scope.row)">重置密码</span>
            <span class="compile color-bule" @click="handleEdit(scope.row)">编辑</span>
            <span class="a-delete color-bule" @click="handleDelete(scope.row)">删除</span>
          </template>
        </el-table-column>
      </vs-table>
    </div>   
</template>
<script>
export default {
        data(){
            return{
                colConfigs:[
                     { prop: "username",     label: "姓名" },
                     { prop: "sex",  label: "性别" },
                     { prop: "age", label: "年龄" },
                     { prop: "createTime",  label: "职务" },
                     { prop: "realname",        label: "角色" },
                     { prop: "phone",        label: "联系电话" },
                     { prop: "email",        label: "电子邮箱" },
                     { prop: "enabled",        label: "激活状态" },
                     { prop: "token",        label: "备注" },
                ],
                tableData:{
                    
                },
                page:1,             //页码
                data:{
                    keywords:"",    //名称
                    role:"",        //角色
                    sex:"",             //性别
                },
                checkBoxData:[],        //删除的用户id
            }
        },
        mounted(){
            this.dataGet()
        },
        methods:{   
            dataGet: function(){   //用户列表请求
            if(this.data.sex!=""){
                this.$ajax({
                    url:(`http://192.168.30.8:8800/sys/user/page?keywords=${this.data.keywords}&role=${this.data.role}&sex=${parseInt(this.data.sex)}`),
                    methods:"get",
                    
                }).then(res=>{
                    this.tableData = res.data.data
                    for(var i of this.tableData.list){
                        if(i.enabled==true){
                            i.enabled = "已激活"
                        }else{
                            i.enabled = "未激活"
                        }
                        if(i.sex==0){
                            i.sex = "女"
                        }else{
                            i.sex = "男"
                        }
                    }
                })
            }else{
                 this.$ajax({
                    url:(`http://192.168.30.8:8800/sys/user/page?keywords=${this.data.keywords}&role=${this.data.role}`),
                    methods:"get",
                    
                }).then(res=>{
                    this.tableData = res.data.data
                    for(var i of this.tableData.list){
                        if(i.enabled==true){
                            i.enabled = "已激活"
                        }else{
                            i.enabled = "未激活"
                        }
                        if(i.sex==0){
                            i.sex = "女"
                        }else{
                            i.sex = "男"
                        }
                    }
                })
            }
        },
         handleNum(num) {
            this.page = num;
            this.dataGet();
            },
        handleSelectId(val) {
                console.log(val)
                this.checkBoxData = val;
            },
        delUser(){  //删除用户按钮事件
          this.$confirm('选择的用户删除后将无法恢复, 是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.common.delMore(this.checkBoxData,this,"/sys/user/",this.dataGet)
                    this.$message({
                            type: 'success',
                            message: '删除成功!'
                            });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                         message: '已取消删除'
                    });          
             });
           
        },
          handleDelete(){  //删除单行用户
          this.$confirm('选择的用户删除后将无法恢复, 是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.common.delMore(this.checkBoxData,this,"/sys/user/",this.dataGet)
                    this.$message({
                            type: 'success',
                            message: '删除成功!'
                            });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                         message: '已取消删除'
                    });          
             });
           
        },
        handleEdit(res){       //编辑用户
            this.$router.push({
                name:"addPersonal",
                params:{
                    personalInfo:res
                }
            })
        },
        adduser(){
           this.$router.push({
                name:"addPersonal"
            })
        }
    }
}
</script>
   
<style scoped >
.body{
    padding: 10px;
    height:93vh;
    background-color:rgb(27,35,51); 
}
.management-top{
    padding: 2vh 0;
    display: flex;
    justify-content: space-between;
}
.btn{
    margin-left: 20px;
    border-radius: 0;
}
.iptSearch{
    width: 250px;
    height: 40px;
    border-radius: 0;
    border: 1px solid wheat;
}
.btnSearch{
    height: 40px;
    border-radius: 0;
}
.m-t-right{
    display: flex;
    padding-right: 20px;
}
.select{
    font-size: 14px;
    height: 40px;
    color:white;
    border: 1px solid white;
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

</style>
