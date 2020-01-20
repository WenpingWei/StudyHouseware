<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="home-container">
    <div class="contain-content">
      <div class="left-add">
        <div class="add-header">
          <el-button
            v-if="modules.id"
            class="filter-item"
            type="primary"
            style="border-radius: 0;"
          >编辑数据模板</el-button>
          <template v-else>
            <template v-if="editorUpload">
              <el-button
                class="filter-item"
                type="primary"
                style="border-radius: 10px 0 0 0;"
              >新增数据模板</el-button>
              <span class="add-header-span" style="margin-left:10px" @click="putEditorUpload">上传数据模板</span>
            </template>
            <template v-else>
              <span
                class="add-header-span"
                style="border-radius: 10px 0 0 0;margin-left:20px;margin-right:20px"
                @click="putEditorUpload"
              >新增数据模板</span>
              <el-button class="filter-item" type="primary" style="border-radius:0;">上传数据模板</el-button>
            </template>
          </template>
        </div>
        <div class="add-content" :class="{'active': !editorUpload}">
          <el-form
            :model="modules"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="模板名称:" prop="tplName">
              <el-input
                v-model="modules.tplName"
                style="width: 60%;margin-left: 4px;"
                class="filter-item"
              ></el-input>
            </el-form-item>
            <el-form-item label="采集频率:" prop="collectRate">
              <el-select
                v-model="modules.collectRate"
                placeholder="请选择采集频率（单位s）"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
              >
                <el-option
                  v-for="(item,index) in collectRate"
                  :key="index"
                  :label="item+'S'"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input
                type="textarea"
                :rows="5"
                style="width: 66%;margin-left: 4px;"
                placeholder="请输入内容"
                maxlength="200"
                resize="none"
                show-word-limit
                v-model="modules.mark"
              ></el-input>
              <span style="color:#ffffff;position: relative;right: 50px;">{{modules.mark.length}}/200</span>
            </el-form-item>
            <div style="text-align: center;padding: 15px 0;margin-top:50%;">
              <el-button class="filter-item" type="primary" @click="submitForm('ruleForm')">确认</el-button>
              <el-button class="filter-item" type="danger" @click="resetFilter">取消</el-button>
            </div>
          </el-form>
        </div>
        <div class="upload-content" :class="{'active': editorUpload}">
          <el-form
            :model="modules"
            :rules="rules"
            ref="uploadForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="文件上传：">
              <span class="requiredCharacter">*</span>
              <el-upload
                    ref="upload"
                    class="upload"
                    :headers="myHeaders"
                    :action="uploadUrl()"
                    :on-success="handleSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="emptyData"
                    :limit=1
                    multiple
                  >
                    <div class="controlUpload">    
                      <div v-if="tableData==''" class="UploadFiles" style="margin-left: 4px;">未选择任何文件</div>
                      <div v-else class="UploadFiles" style="margin-left: 4px;">已读取文件</div>
                      <el-button size="small" type="primary" style="padding:0 30px;border-radius: 0;height:40px;" >选择文件</el-button>
                    </div>
                <div slot="tip" class="el-upload__tip">*只能上传xls/xlsx文件，且不超过2M</div>
              </el-upload>
              <a class="download" :href="downloadUrl()" download="template.xlsx" title="下载">模板文档下载</a>              
            </el-form-item>
            <el-form-item label="模板名称：" prop="tplName">
              <el-input
                class="filter-item addpoint"
                style="width: 500px;margin-left: 4px;"
                v-model="modules.tplName"
              ></el-input>
            </el-form-item>
            <el-form-item label="采集频率：" prop="collectRate">
              <el-select
                placeholder="请选择采集频率（单位s）"
                v-model="modules.collectRate"
                class="filter-item addpoint"
                style="width: 500px;margin-left: 4px;"
              >
                <el-option
                  v-for="(item,index) in collectRate"
                  :key="index"
                  :label="item+'S'"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="数据点：">
              <el-table
                :data="tableData"
                height="350" 
                style="width:98%;margin-left: 4px;"
                :row-class-name="tableRowClassName"
                :header-cell-style="{backgroundColor: '#273753',fontWeight:600,fontSize:'14px',color:'#199af5'}"
              >
                <el-table-column prop="collectName" align="center" label="数据点名称" width="150"></el-table-column>
                <el-table-column prop="collectId" align="center" label="ID" width="100"></el-table-column>
                <el-table-column prop="transmissionType" align="center" label="传输类型" :formatter="tableFormatter" width="80"></el-table-column>
                <el-table-column prop="address" align="center" label="寄存器地址" width="180"></el-table-column>
                <el-table-column prop="size" align="center" label="寄存器大小" width="100"></el-table-column>
                <el-table-column prop="upload" align="center" label="是否上传" width="100" :formatter="tableFormatter"></el-table-column>
                <el-table-column prop="unit" align="center" label="数据单位" width="100"></el-table-column>
                <el-table-column prop="functionCode" align="center" label="功能码" width="100"  :formatter="tableFormatter"></el-table-column>
                <el-table-column prop="collectType" align="center" label="存储方式" :formatter="tableFormatter" width="80"></el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="备注：">
              <div class="mark">
                <el-input
                    type="text"
                    :rows="5"
                    style="width: 98%;margin-left: 4px;height:80px;"
                    placeholder="请输入内容"
                    maxlength="500"
                    resize="none"
                    show-word-limit
                    v-model="modules.mark"
                  ></el-input>
                  
              </div>
            </el-form-item>
            <div style="text-align: center;padding: 15px 0;">
              <el-button class="filter-item" type="primary" @click="submitForm('uploadForm')">确认</el-button>
              <el-button class="filter-item" type="danger" @click="resetFilter">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="right-container">
        <vs-guide :explainList="Explain"></vs-guide>
      </div>
    </div>
  </div>
</template>

<script>
import { constants } from "crypto";
import Cookies from 'js-cookie'
var token = 'VSZ ' + Cookies(window.localStorage.getItem("userName"));
export default {
  data() {
    this.colConfigs = [
      { prop: "tplName", label: "数据点名称" },
      { prop: "pointCount", label: "参数类别" },
      { prop: "createTime", label: "缩略名" },
      { prop: "mark", label: "ID" },
      { prop: "mark", label: "类型" },
      { prop: "mark", label: "传输类型" },
      { prop: "mark", label: "传输频率" },
      { prop: "mark", label: "寄存器地址" },
      { prop: "mark", label: "寄存器大小" },
      { prop: "mark", label: "是否上传" },
      { prop: "mark", label: "数据单位" }
    ];
    return {
      myHeaders:{Authorization: token},
      editorUpload: true,
      modules: {
        id: "",
        collectRate: "",
        tplName: "",
        mark: "" //备注
      },
      Explain:[ //解释模板变量
        {
          title: "模板名称：",
          content: "数据模板名称，输入限定1-20位非下划线开头的字符，为必填项。"
        },
        {
          title: "采集频率：",
          content: "设置数据模板中各个数据点的采集频率，采集频率可以设置5秒、10秒、30秒、60秒；为必选项。"
        }
      ],
      page: 1,
      rows: 10,
      tableData: [],
      sortOptions: [],
      explainList: [
        {
          title: "模板名称：",
          content: "数据模板名称，输入限定1-20位非下划线开头的字符，为必填项。"
        },
        {
          title: "采集频率：",
          content: "设置数据模板中各个数据点的采集频率，采集频率可以设置5秒、10秒、30秒、60秒；为必选项。"
        }
      ],


      UPdataExplainList: [
        {
          title: "文件上传：",
          content: "用于批量添加数据点。操作步骤：第一步，先下载数据模板文档，编辑文档内容，可对数据点增删改；第二步，上传编辑后的数据模板，在下方列表中会显示该模板绑定的数据点；为必填项。"
        },
        {
          title: "模板名称：",
          content: "数据模板名称，输入限定1-20位非下划线开头的字符，为必填项。"
        },
        {
          title: "采集频率：",
          content: "设置数据模板中各个数据点的采集频率，采集频率可以设置5秒、10秒、30秒、60秒；为必选项。"
        }
      ],
      collectRate: [5, 10, 30, 60],
      rules: {
        tplName: [
          {
            required: true,
            pattern: /^(?!_)[\w\W]{1,20}$/,
            message: "请输入1-20位非下划线开头字符",
            trigger: "blur"
          }
        ],
        collectRate: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    emptyData(){
      this.tableData = []
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "single-row";
      } else {
        return "double-row";
      }
    },
    tableFormatter(row, column, cellValue) {
      if ( column.property === "collectType") {
        return cellValue === 0
          ? "不保存"
          : cellValue === 1
          ? "变化时保存"
          : "实时保存";
      } else if (column.property === "transmissionType") {
        return cellValue === 0 ? "R" : cellValue === 1 ? "T" : "Y";
      } else if (column.property === "upload") {
        return cellValue === 0 ? "N" : cellValue === 1 ? "Y" : "Y";
      }else  if(column.property === "functionCode"){
          return  cellValue === 1 ? "01读线圈" : cellValue === 2 ? "02读离散输入状态"  
          : cellValue === 3 ? "03读保持寄存器" : cellValue === 4 ? "04读输入寄存器" 
          : cellValue === 5 ? "05写单个线圈" : cellValue === 6 ? "06写单个保持寄存器" : cellValue === 7 ? "15写单个线圈" : "16写单个保持寄存器";
      }else{
        return cellValue;
      }
    },
    uploadUrl() {
      var url =process.env.VUE_APP_BASE_API+ "/upload/excel";
      return url;
    },
    downloadUrl() {
      var url = process.env.VUE_APP_BASE_API+"/uploadFolder/template.xlsx";
      return url;
    },
    //上传成功要处理的事
    handleSuccess(res) {
      this.tableData = res.data;
      console.table(res.data)

    },
    //上传前要处理的事
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "xls";
      const extension2 = testmsg === "xlsx";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!extension && !extension2) {
        this.$message.error("上传文件只能是 xls、xlsx格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
      }
      return extension || extension2;
    },
    //获取一条数据
    getListData: function(cid) {
      let that = this;
      that
        .$ajax({
          method: "get",
          url: $$("/data/template?id=" + cid)
        })
        .then(function(data) {
          that.modules.id = cid;
          that.modules.tplName = data.data.data.tplName;
          that.modules.collectRate = data.data.data.collectRate;
          that.modules.mark = data.data.data.mark;
        });
    },
    resetFilter: function() {
      this.$router.push(`/dataManage/dataNum1`);
    },
    //编辑数据模板
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (that.modules.id) {
            that.$ajax
              .put($$("/data/template"), that.modules)
              .then(function(data) {
                if (data.status == 200) {
                  that.$message({
                    message: "修改成功！",
                    type: "success"
                  });
                  that.$router.push(`/dataManage/dataNum1`);
                } else {
                  that.$message.error(data.message);
                }
              });
          } else {
            if (that.tableData) {
              that.$ajax
                .post($$("/data/template"), that.modules)
                .then(function(data) {
                  if (data.data.status == 200) {
                    let id = data.data.data;
                    that.$ajax
                      .post($$("/collect/point/list"), that.tableData)
                      .then(function(data) {
                        if (data.data.status == 200) {
                          let obj = {
                            bindIds: data.data.data,
                            targetId: id
                          };
                          that.$ajax
                            .post($$("/data/template/bindPoint"), obj)
                            .then(function(data) {
                              if (data.data.status == 200) {
                                that.$message({
                                  message: "新增成功！",
                                  type: "success"
                                });
                                that.$router.push(`/dataManage/dataNum1`);
                              } else {
                                that.$message.error(data.data.message);
                              }
                            });
                        } else {
                          that.$message.error(data.data.message);
                        }
                      });
                  } else {
                    that.$message.error(data.message);
                  }
                });
            } else {
              that.$ajax
                .post($$("/data/template"), that.modules)
                .then(function(data) {
                  if (data.status == 200) {
                    that.$message({
                      message: "新增成功！",
                      type: "success"
                    });
                    that.$router.push(`/dataManage/dataNum1`);
                  } else {
                    that.$message.error(data.message);
                  }
                });
            }
          }
        } else {
          return false;
        }
      });
    },
    handleCurrentChange(num) {
      this.getListPro(num);
    },
    putEditorUpload() {
      this.editorUpload = !this.editorUpload;
      if(this.Explain == this.UPdataExplainList){
        this.Explain = this.explainList
      }else{
      this.Explain = this.UPdataExplainList
      }
    }
  },
  mounted: function() {
    let that = this;
    var cid = that.$route.query.dataProId;
    if (cid) {
      that.getListData(cid);
    }
  }
};
</script>

<style scoped>
.active {
  display: none;
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
  border-radius: 10px;
  background: #1b2333;
}
.add-header {
  height: 38px;
  width: 100%;
  background: #273753;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}
.add-header-span {
  color: #fff;
  font-size: 14px;
  cursor: pointer;

}
.add-content {
  width: 80%;
  margin: 30px auto;
}
.upload-content {
  width: 90%;
  margin: 30px auto;
}
.download {
  width: 90px;
  position: absolute;
  left: 500px;
  top: 0;
  font-size: 14px;
  color: #009dd9;
  text-decoration: underline;
  margin-left: 20px;
}
.right-container {
  width: 32%;
}
.UploadFiles{
  width: 393px;
  background-color: #233149;
  height: 40PX;
  color:#fff;
}
.controlUpload{
  display: flex;
}
.requiredCharacter{
  color: red;
  position: absolute;
  left:-90px;
}

</style>
