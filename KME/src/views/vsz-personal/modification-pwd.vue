<template>
    <div class="body">
      <div class="add-header">
          <el-button
            class="filter-item"
            type="primary"
            style="border-radius: 10px 0 0 0;"
          >修改密码</el-button>
        </div>
        <div class="form">
            <el-form :model="password" :rules="rules" ref="password" label-width="100px" size="medium">
                <el-form-item label="旧密码:" prop="oldPassword">
                    <el-input class="ipt"  type="password" v-model="password.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码:" prop="newpassword">
                    <el-input class="ipt" type="password" v-model="password.newpassword"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码:" prop="RepeatNewPassword">
                    <el-input class="ipt" type="password" v-model="password.RepeatNewPassword"></el-input>
                </el-form-item>
            </el-form>
            <div class="bottom"> 
                <el-button type="primary" class="filter-item" @click="affirmBtn('password')">确认</el-button>
                <el-button type="danger" class="filter-item" @click="cancel">取消</el-button>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
        data(){
            var validatePass = (rule, value, callback) => {
                console.log(value)
                console.log(this.password.newpassword)
                if (value !==this.password.newpassword) {
                callback(new Error('两次输入密码不一致'));
                }else{
                callback();
                }
            };
            return{
                id:"",
                oldpassword:"",         //旧密码
                password:{               //输入的文本
                    oldPassword:"",         
                    newpassword:"",
                    RepeatNewPassword:""
                },
                rules:{
                    oldPassword:[
                       {
                        required: true,
                        message: "请输入旧密码",
                        trigger: "blur"
                        }
                    ],
                     newpassword:[
                       {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur"
                        },{
                            min: 8,
                            max: 16,
                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
                            message: '不能全部是数字，不能全部是字母，必须是数字或字母的组合，长度在8到16之间'
                        },
                    ],
                    RepeatNewPassword:[
                       {    
                        required: true,
                        validator: validatePass,
                        message: "两次密码不一致",
                        trigger: "blur"
                        }
                    ],
                },
            }
        },
        methods:{
            affirmBtn(password){            //确认按钮
                this.$refs[password].validate((valid) =>{
                 const that = this;
                    if(valid){
                            this.$ajax({
                            url:$$(`/sys/user/changePassword?id=${this.Cookies(window.localStorage.getItem("userName")+"userId")}&oldPassword=${this.password.oldPassword}&newPassword=${this.password.newpassword}`),
                            method:"post"
                        }).then( data=>{
                            if(data.data.status == 200){
                                that.$message({
                                message: "修改成功！请重新登录",
                                type: "success"
                            });
                             this.$store.dispatch('user/logout').then(() => {
                                this.$router.push({ path: '/login' })
                                })
                            }else{
                               that.$message.error(data.data.message);
                            }
                        })
                    }
                })
            },
            cancel(){
                this.$router.push({
                    name:"personalInfo"
                })
            }
        },
        mounted(){
         
           
            this.$ajax({
                url:$$("/sys/user?id="+this.Cookies(window.localStorage.getItem("userName")+"userId")),
                method: 'get',
            }).then( res =>{
                this.id = res.data.data.id
                this.oldpassword = res.data.data.password
            })

            
           
          
        }
}

</script>

<style scoped>
  .body{
    margin: 20px;
    color: white;
    font-size: 13px;
    background-color: rgb(27,34,50);
}
.ipt{
     width: 300px;
}
.add-header {
    height: 38px;
    width: 100%;
    background: #273753;
    border-radius: 10px 0 0 0;
    overflow: hidden;
    margin-bottom: 50px;
}
.form{
    padding-left: 5%;
}
.bottom{
    width: 600px;
    display: flex;
    justify-content: center;
    padding: 90px;
}
</style>
