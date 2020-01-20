<template>
  <div class="addPersonal">
    <div class="addPersonal-top">
      <el-button  style="border-radius: 10px 0 0 0;" type="primary compile">编辑用户</el-button>
    </div>
    <el-form ref="addInfo" :model="addInfo" :rules="rules" label-width="100px" size="medium" class="form">
      <el-form-item label="姓名:" prop="username">
        <el-input v-model="addInfo.username" class="ipt" />
      </el-form-item>
      <el-form-item label="性别:">
        <el-select v-model="addInfo.sex" placeholder="选择性别" class="ipt" >
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄:" prop="age">
        <el-input v-model="addInfo.age" class="ipt" type="number" />
      </el-form-item>
      <el-form-item label="联系电话:" prop="phone">
        <el-input v-model="addInfo.phone" class="ipt" />
      </el-form-item>
      <el-form-item label="电子邮箱:" prop="email">
        <el-input v-model="addInfo.email" class="ipt" />
      </el-form-item>
      <el-form-item label="角色:" prop="role.id">
        <el-select v-model="addInfo.role.id" placeholder="选择角色" class="ipt">
          <el-option
            v-for="(item,index) in identity"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="威视真工业云" value="421CE242C6C82807D9AF1221249C18E9" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="mark">
        <el-input v-model="addInfo.mark" type="textarea"  maxlength="200"
  show-word-limit class="ipt"  style=" width: 600px;"/>
  <span style="color:#ffffff;position: relative;right: 50px;">{{addInfo.mark.length}}/200</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="filter-item " @click="submitForm('addInfo')">确定</el-button>
        <el-button type="danger" class="filter-item " @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
        if(value>150){
           return callback(new Error('年龄不能小于1，不能大于150'));
        }else if(value<1){
           return callback(new Error('年龄不能小于1，不能大于150'));
        }else{
           callback();
        }
      };
    return {
      
      id:"",
      rules: {
        username: [
          {
            required: true,
            pattern: /^\w+$/,
            message: '用户名称为2-20位非下划线开头的字符',
            trigger: 'blur'
          }, {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符'
          }
        ],
        phone: [
          {
            required: true,
            pattern: /^1[23456789]\d{9}$/,
            message: '请输入正确的电话号码',
            trigger: 'blur'
          }
        ],
        mark:[
          {
            max:200,
            message: '最多两百个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入联系邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        age: [
          {
            validator:checkAge,
            trigger: 'blur'
          }
        ],
       'role.id': [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      },
      identity: [], // 身份列表
      addInfo: { // 用户信息
        age: "25",
        email: '',
        phone: '',
        realname: '',
        id:"",
        role: {
          id: ''
        },
        password: '123456789qwe',
        sex: '1',
        username: '',
        mark: ''
      },
      name:""
    }
  },
  props: ['cancelPath'],
  mounted() {
    this.id = this.$route.query.id
   this.$ajax({
          url:$$(`/sys/user?id=${this.id}`),
          data:{
            id:this.id
          },
          method:"get"
        }).then( res =>{
          this.addInfo = res.data.data
          this.name = res.data.data.username
          this.addInfo.age = this.addInfo.age+""
          this.addInfo.sex = this.addInfo.sex+""
          this.addInfo.password = "123456789qwe"
          if(this.addInfo.role == ""){
          this.addInfo.role = {
            id:""
          }
          }
          
        })
    this.status()
  },
  methods: {
    submitForm(formName) { // 提交按钮\
      var that = this
      var userInfo = {
            age    : parseInt(this.addInfo.age),
            email  : this.addInfo.email,
            id     : this.addInfo.id,
            isCustomServer: this.addInfo.isCustomServer,
            mark     : this.addInfo.mark,
            password : this.addInfo.password,
            phone    : this.addInfo.phone,
            realname : this.addInfo.realname,
            role     : {
              description: this.addInfo.role.description,
              id         : this.addInfo.role.id,
              name       : this.addInfo.role.name
                     },
            sex: parseInt(this.addInfo.sex),
            status: this.addInfo.status,
            username: this.addInfo.username
          }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            this.$ajax({
              url: $$('/sys/user'),
              // url:(`http://192.168.30.8:8800/sys/user`),
              method: 'put',
              data: userInfo
            }).then(data => {
              if (data.data.status == 200) {
                that.$message({
                  message: '修改成功！',
                  type: 'success'
                })
                
                if(userInfo.id == this.Cookies(window.localStorage.getItem("userName")+"userId")){
                    if(this.name!==userInfo.username || userInfo.role.id == this.$store.state.roleId){
                         that.$message({
                          message: '修改成功，修改包含用户名或者绑定角色，请重新登录！',
                          type: 'success'
                        })
                        setTimeout(()=>{
                        this.$store.dispatch('user/logout').then(() => {
                           this.$router.push({ path: '/login' })
                        })
                        },2000)
                   
                    }else{
                            this.$router.push({
                                name: 'system1'
                              })
                    }
                     
                }else{
                  this.$router.push({
                      name: 'system1'
                    })
                }
               
              } else {
               that.$message({
                  message: data.data.message,
                  type: 'info'
                })
              }
            })
          }
        }
      })
    },
    cancel() { // 取消按钮
      console.log(this.cancelPath)
      this.$router.push({
        path: this.cancelPath || 'system1'
      })
    },
    status() {          //角色列表
      this.$ajax({
        url: $$('/role/list?rows=1000'),
        method: 'get'
      }).then(data => {
        this.identity = data.data.data.list
      })
    }
  }
}
</script>

<style scoped>
    .addPersonal{
        margin: 20px;
        height:93vh;
        background-color:rgb(27,35,51);
    }
    .addPersonal-top{
        height: 38px;
        width: 100%;
        background: #273753;
        border-radius: 10px 0 0 0;
        overflow: hidden;
        background-color: rgb(27,47,71);
        }
    .compile{
        border-radius: 0;
    }
    .ipt{
        width: 300px;
    }
    .text{
         width: 500px;
         color: white;
    }
    .el-select-dropdown__item{
        color: white;
    }
    .form{
        margin: 30px;
        margin-left: 7%;
        margin-top: 50px;
    }
</style>
