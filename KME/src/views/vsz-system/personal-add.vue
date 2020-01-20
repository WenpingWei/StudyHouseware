<template>
  <div class="addPersonal">
    <div class="addPersonal-top">
      <el-button  style="border-radius: 10px 0 0 0;" type="primary compile">新增用户</el-button>
    </div>
    <el-form ref="addInfo" :model="addInfo" :rules="rules" label-width="100px"  class="form" >
      <el-form-item label="姓名:" prop="username">
        <el-input v-model="addInfo.username" class="ipt" />
      </el-form-item>
      <el-form-item label="性别:">
        <el-select v-model="addInfo.sex" placeholder="选择性别" class="ipt">
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
        <el-select v-model="addInfo.role.id" placeholder="选择角色"  class="ipt">
          <el-option label="选择角色" value=""></el-option>
          <el-option
            v-for="(item,index) in identity"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="mark" >
        <el-input v-model="addInfo.mark"  maxlength="200"  show-word-limit type="textarea" class="text  ipt" style=" width: 600px;"  />
        <span style="color:#ffffff;position: relative;right: 50px;">{{addInfo.mark.length}}/200</span>
      </el-form-item>
      <el-form-item>
        <div style="margin-top: 30px;">
        <el-button type="primary" class="filter-item " @click="submitForm('addInfo')">确定</el-button>
        <el-button type="danger" class="filter-item " @click="cancel">取消</el-button>
        </div>
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
      id: '',
      rules: {
        username: [
          {
            required: true,
            pattern: /^\w+$/,
            message: '用户名称为2-20位由数字、26个英文字母或者下划线组成的字符串',
            trigger: 'blur'
          }, {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符'
          }
        ], 
        mark:[
          {
            max:200,
            message: '最多两百个字符',
            trigger: 'blur'
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
      addInfo: { // 新增用户信息
        age:"25",
        email: '',
        phone: '',
        realname: '',
        role: {
          id: ""
        },
        password: '123456789qwe',
        sex: '1',
        username: '',
        mark: ''
      }
    }
  },
  mounted() {
    this.status()
  },
  methods: {
    submitForm(formName) { // 提交按钮\
      var that = this
      var info = this.addInfo
      var userInfo =  {
            age:     parseInt(info.age) ,
            email:    info.email,
            phone:    info.phone,
            realname: info.realname,
            role: {
              id:     info.role.id
            },
            password: info.password,
            sex:     parseInt(info.sex),
            username: info.username,
            mark:     info.mark
        
      }
      // if(userInfo.sex=="男"){
      //    
      // }else{
      //     
      // }
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.$ajax({
              url: $$('/sys/user'),
              // url:(`http://192.168.30.8:8800/sys/user`),
              method: 'post',
              data: userInfo
            }).then(data => {
              if (data.data.status == 200) {
                that.$message({
                  message: '添加成功！',
                  type: 'success'
                })
                this.$router.push({
                  name: 'system1'
                })
              } else {
                if(data.data.message == "该用户已存在，请在想一个呗！"){
                 that.$message.error("该用户已存在")
                }else{
                that.$message.error(data.data.message)
                }
              }
            })

        }
      })
    },
    cancel() { // 取消按钮
      this.$router.push({
        path: 'system1'
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
