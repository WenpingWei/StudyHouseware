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
          >编辑设备类型</el-button>
          <el-button
            v-else
            class="filter-item"
            type="primary"
            style="border-radius: 10px 0 0 0;"
          >新增设备类型</el-button>
        </div>
        <div class="add-content">
          <el-form
            :model="modules"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="类型名称：" prop="typeName">
              <el-input
                v-model="modules.typeName"
                style="width: 60%;margin-left: 4px;"
                class="filter-item"
              ></el-input>
            </el-form-item>

            <el-form-item label="备注：">
              <el-input
                type="textarea"
                :rows="5"
                style="width: 60.5%;margin-left: 4px;"
                placeholder="请输入内容"
                maxlength="200"
                resize="none"
                show-word-limit
                v-model="modules.mark"
              ></el-input>
              <span style="color:#ffffff;position: relative;right: 50px;">{{modules.mark.length}}/200</span>
            </el-form-item>
            <div style="text-align: center;padding: 15px 0;">
              <el-button class="filter-item" type="primary" @click="submitForm('ruleForm')">确认</el-button>
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
import { constants } from "crypto";
// options components

export default {
  data() {
    return {
      modules: {
        id: "",
        extra: "",
        typeName: "",
        mark: "" //备注
      },
      page: 1,
      rows: 10,
      explainList: [
        {
          title: "类型名称：",
          content: "设备类型名称，输入限定1-20位非下划线开头的字符，为必填写项。"
        },
        {
          title: "备注：",
          content: "可对设备类型的特性进行描述，输入限定不超过200个字符。"
        }
      ],
      rules: {
        typeName: [
          {
            required: true,
            pattern: /^(?!_)[\w\W]{1,20}$/,
            message: "请输入1到20位非下划线开头的字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    // this.fetchData()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "single-row";
      } else {
        return "double-row";
      }
    },
    //获取一条数据
    getListData: function(cid) {
      let that = this;
      that.$ajax.get($$('/deviceType'), { params: { id: cid } }).then(function(res){
          that.modules = res.data.data
      })
    },
    resetFilter: function() {
      this.$router.push(`/equipmentManage/menu4`);
    },
    //编辑数据模板
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (that.modules.id) {
            that.$ajax
              .put($$("/deviceType"), that.modules)
              .then(function(data) {
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
            that.$ajax
              .post($$("/deviceType"), that.modules)
              .then(function(data) {
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
    }
  },
  mounted: function() {
    let that = this;
    var cid = that.$route.query.id;
    if (cid) {
      that.getListData(cid);
    }
  }
};
</script>

<style scoped>

.contain-content {
  display: flex;
  justify-content: space-between;
  width: 98%;
  height: 88vh;
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
</style>
