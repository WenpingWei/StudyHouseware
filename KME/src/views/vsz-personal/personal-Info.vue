<template>
    <div class="body">
            <div class="add-header">
            <el-button
                class="filter-item"
                type="primary"
                style="border-radius: 10px 0 0 0;"
            >个人信息</el-button>
            </div>
            <div class="entirety">
            <div>
                <div class="userinfo"><div class="user-head">姓名：</div><div class="user-Info"><p class="Info">{{user.username}}</p> </div></div>
                <div class="userinfo"><div class="user-head">性别：</div><div class="user-Info"><p class="Info">{{user.sex}}     </p> </div></div>
                <div class="userinfo"><div class="user-head">年龄：</div><div class="user-Info"><p class="Info">{{user.age}}     </p> </div></div>
                <div class="userinfo"><div class="user-head">电话：</div><div class="user-Info"><p class="Info">{{user.phone}}   </p> </div></div>
                <div class="userinfo"><div class="user-head">邮箱：</div><div class="user-Info"><p class="Info">{{user.email}}   </p> </div></div>
            </div>
            <div class="btn-click" style="text-align: center;padding: 15px 0;">
                    <el-button class="filter-item" type="primary"  @click="changePwd">密码修改</el-button>
                    <el-button class="filter-item" type="primary"  @click="changInfo">资料修改</el-button>
                    <el-button class="filter-item" type="danger"  @click="logout">退出登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data(){
      return{
        user:{},

        }
      },
      methods:{
          changePwd(){              //修改密码
                this.$router.push({
                    path:"modificationPwd"
                })
          },
          changInfo(){          //修改资料
            this.$router.push({
                path:"personalEidt",
                query:{
                        id:this.user.id
                    }
            })
          },
          logout(){             //退出登录
            this.$store.dispatch('user/logout').then(() => {
            this.$router.push({ path: '/login' })
            })
          },
      },
      mounted(){
          this.$ajax({
              url:$$("/sys/user?id="+this.Cookies(window.localStorage.getItem("userName")+"userId")),
              method: 'get',
          }).then( res =>{
              this.user = res.data.data
              this.$store.state.roleId =  res.data.data.role.id
              console.log(this.$store.state.roleId)
              console.log(this.user)
                 if( this.user.sex == 0){
                     this.user.sex = "女"
                 }else{
                     this.user.sex = "男"
              }
          })
      }
  }
</script>

<style  scoped >
.body{
    margin: 20px;
    color: white;
    background-color: rgb(27,34,50);
}
.userinfo{
    display: flex;
    margin-bottom: 30px;
}
.user-Info{
    width: 467px;
    padding-left:10px;
    background-color: rgb(27,47,71);
    border-radius: 10px;
}
.Info{
    font-size: 16px;
    padding: 10px;
}
.user-head{
    padding: 10px;
    font-size: 16px;
    font-weight: 700;
    }
.btn-click{
    margin: 200px;
    display: flex;
    padding-right: 100px;
}
.add-header {
    height: 38px;
    width: 100%;
    background: #273753;
    border-radius: 10px 0 0 0;
    overflow: hidden;
    margin-bottom: 30px;
}
.entirety{
    width: 60%;
    padding-left: 30px;
    padding-bottom: 30px;
}
</style>
