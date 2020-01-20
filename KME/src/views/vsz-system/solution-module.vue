<template>
  <div class="home-container">
    <div class="contain-content">
      <div class="left-add">
        <div class="add-header">
          <el-button
            v-if="modules.id"
            class="filter-item"
            type="primary"
            style="border-radius: 0;"
          >编辑解决方案</el-button>
          <el-button
            v-else
            class="filter-item"
            type="primary"
            style="border-radius: 10px 0 0 0;"
          >新增解决方案</el-button>
        </div>

        <div class="add-content">
          <el-form
            :model="modules"
            :rules="rules"
            ref="resForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="方案名称:" prop="solutionName">
              <el-input
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                v-model="modules.solutionName"
              ></el-input>
            </el-form-item>
            <el-form-item label="方案类型:" prop="alarmType">
              <el-select
                v-model="modules.alarmType"
                :disabled="modules.alarmType=='0'?true:false"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
              >
                <el-option
                  v-for="item in alarmType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="内容:" prop="content">
             
              <quill-editor
                class="ql-editor"
                v-model="modules.content"
                ref="myQuillEditor"
                :options="editorOption"
              ></quill-editor>
            </el-form-item>
          <my-upload
                class="ivu-upload"
                @click="toggleShow"
                field="file"
       
                @crop-upload-success="cropUploadSuccess"
             
                v-model="show"
                :width="150"
                :height="150"
                :url="uploadUrl()"
                :headers="headers"
                noCircle
                img-format="png"
              >
              </my-upload>
            <div style="text-align: center;padding: 15px 0;">
              <el-button class="filter-item" type="primary" @click="submitForm('resForm')">确认</el-button>
              <el-button class="filter-item" type="danger" @click="resetFilter">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="right-container">
        <vs-guide :explainList="explainList"></vs-guide>
      </div>
    </div>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import Cookies from "js-cookie";
var token = "VSZ " + Cookies(window.localStorage.getItem("userName"));
 const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
    
      [{'header': 1}, {'header': 2}],               // custom button values
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
      [{'direction': 'rtl'}],                         // text direction
    
      [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
    
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': []}],
      [{'align': []}],
      ['link', 'image', 'video'],
      ['clean']                                         // remove formatting button
    ]
export default {
  name: "App",
    components: {
    "my-upload": myUpload
  },
  data() {
    return {
      routes:0,
        headers: {
        Authorization: token
      },
      show: false,
      modules: {
        id: "",
        solutionName: "",
        content: ""
      },
      alarmType: [
        {
          id: 0,
          name: "网关离线",
          disabled: true
        },
        {
          id: 2,
          name: "设备离线"
        },
        {
          id: 1,
          name: "设备锁定"
        },
        {
          id: 3,
          name: "采集点告警"
        }
      ],
      editorOption: {
        theme: "snow",
          modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image' :(value)=>{
                                    if (value) {
                                       this.show=true
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
          }
      },
      explainList: [
        {
          title: "方案名称：",
          content: "填写解决方案名称，输入限定1-30位非下划线开头的字符，为必填写项。"
        },
        {
          title: "方案类型",
          content: "在已有方案类型网关离线、设备离线、设备锁定、采集点告警，选择对应的告警类型，为必选项。"
        },
        {
          title: "内容：",
          content: "填写解决方案内容，可以图文描述解决方案的内容，快速解决问题。"
        }
      ],
      rules: {
        solutionName: [
          {
            required: true,
            pattern: /^(?!_)[\w\W]{1,30}$/,
            max:30,
            message: "请输入1-30位非下划线开头的字符",
            trigger: "blur"
          }
        ],
        alarmType: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "change"
          }
        ],
        content:[
          {
            required: true,
            message: "内容不能为空",
            trigger: "change"}
        ]
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    cropUploadSuccess(jsonData, field) {
        let res = process.env.VUE_APP_BASE_API +  jsonData.data.path
         // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if (res) {
            // 获取光标所在位置
            let length = quill.getSelection().index;
            // 插入图片，res为服务器返回的图片链接地址
            quill.insertEmbed(length, 'image', res)
            // 调整光标到最后
            quill.setSelection(length + 1)
        } else {
            // 提示信息，需引入Message
            Message.error('图片插入失败')
        }
    },
    uploadUrl() {
      var url = process.env.VUE_APP_BASE_API + "/upload/single";
      return url;
    },
    //     handleSuccess (res) {
    //     // 获取富文本组件实例
    //     let quill = this.$refs.QuillEditor.quill
    //     // 如果上传成功
    //     if (res) {
    //         // 获取光标所在位置
    //         let length = quill.getSelection().index;
    //         // 插入图片，res为服务器返回的图片链接地址
    //         quill.insertEmbed(length, 'image', res)
    //         // 调整光标到最后
    //         quill.setSelection(length + 1)
    //     } else {
    //         // 提示信息，需引入Message
    //         Message.error('图片插入失败')
    //     }
    // },
     //获取一条数据
    getListData: function(cid) {
      let that = this;
      that.$ajax
        .get($$("/solution"), { params: { id: cid } })
        .then(function(data) {
          that.modules = data.data.data;
        });
    },
    //编辑
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (that.modules.id) {
            that.$ajax.put($$("/solution"), that.modules).then(function(data) {
              if (data.data.status == 200) {
                that.$message({
                  message: "修改成功！",
                  type: "success"
                });
                that.resetFilter();
              } else {
                that.$message.error(data.data.message);
              }
            });
          } else {
            that.$ajax.post($$("/solution"), that.modules).then(function(data) {
              if (data.data.status == 200) {
                that.$message({
                  message: "新增成功！",
                  type: "success"
                });
                that.resetFilter();
              } else {
                that.$message.error(data.data.message);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    //取消
    resetFilter: function() {
      this.routes++
      if(this.routes==1){
      window.history.go(-1);
      }
     
      // this.$router.push(`/system/system3`);
    }
  },
  mounted: function() {
    let cid = this.$route.query.id;
    if (cid) {
      this.getListData(cid);
    }
  },
 
  
};

</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.contain-content {
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin: 30px auto;
}
.home-container {
  width: 100%;
  overflow: hidden;
}
.left-add {
  width: 67%;
  height: auto;
  border-radius: 10px 0 0 0;
  background: #1b2333;
}
.add-header {
  height: 38px;
  width: 100%;
  background: #273753;
  border-radius: 10px 0 0 0;
  overflow: hidden;
}

.add-content {
  width: 80%;
  margin: 30px auto;
}

.right-container {
  width: 32%;
}
.ql-editor{
  margin-left: -10px;
  color: #ffffff;
  padding-top: 0;
}

.ql-toolbar{
  border: 0!important;
}

.ql-container{
  border: 0!important;
}
/* .ivu-upload {
    display: none;
} */
</style>