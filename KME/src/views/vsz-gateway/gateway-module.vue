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
          >编辑网关</el-button>
          <el-button
            v-else
            class="filter-item"
            type="primary"
            style="border-radius: 10px 0 0 0;"
          >新增网关</el-button>
        </div>

        <div class="add-content">
          <el-form
            :model="modules"
            :rules="rules"
            ref="resForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="网关名称：" prop="name">
              <el-input
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                v-model="modules.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="网关SN：" prop="snNumber">
              <el-input
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                v-model="modules.snNumber"
              ></el-input>
            </el-form-item>
            <el-form-item label="固件版本：" prop="version">
              <el-input
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                v-model="modules.version"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属客户：" prop="customerId">
              <el-select
                v-model="modules.customerId"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                placeholder="请选择客户"
              >
                <el-option
                  v-for="item in customList"
                  :key="item.id"
                  :label="item.customerName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <div style="text-align: center;padding: 15px 0;margin-top:50%">
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
export default {
  name: "App",
  data() {
    return {
      customList: [],
      explainList: [
        {
          title: "网关名称：",
          content: "网关名称，输入限定1-20位非下划线开头的字符，为必填写项。"
        },
        {
          title: "网关SN：",
          content: "设置网关序列号，输入限定输入限定1-20位非下划线开头的字符，为必填写项。"
        },
        {
          title: "固件版本：",
          content: "设置网关固件的版本号，通常以数字和字母组合形式表示出来，也可根据版本创建时间来命名，输入限定输入限定1-20位非下划线开头的字符，为必填写项。"
        },
        {
          title: "所属客户：",
          content: "在下拉筛选项中选择网关的所属客户，为必选项。"
        }
      ],
      rules: {
        name: [
          {
            required: true,
            pattern: /^[^_]/,
            message:
              "请输入1-20位非下划线开头的字符",
            trigger: "blur"
          },{
            min:1,
            max:20,
            message:"请输入1-20位非下划线开头的字符",
            trigger: "blur"
          }
        ],
        snNumber: [
         {
            required: true,
            pattern: /^[^_]/,
            message:
              "请输入1-20位非下划线开头的字符",
            trigger: "blur"
          },{
            min:1,
            max:20,
            message:"请输入1-20位非下划线开头的字符",
            trigger: "blur"
          }
        ],
        version: [
           {
            required: true,
            pattern: /^[^_]/,
            message:
              "请输入1-20位非下划线开头的字符",
            trigger: "blur"
          },{
            min:1,
            max:20,
            message:"请输入1-20位非下划线开头的字符",
            trigger: "blur"
          }
        ],
        customerId: [
           {
            required: true,
            pattern: /^[^_]/,
            message:"请选择所属客户",            
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["modules"],
  methods: {
    //编辑
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (that.modules.id) {
            that.$ajax.put($$("/gateway"), that.modules).then(function(data) {
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
            that.$ajax.post($$("/gateway"), that.modules).then(function(data) {
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
      this.$router.push(`/gateway/gatewayList`);
    }
  },
  mounted: function() {
    this.common.getList(this, "/custom/customer/page", { getPage: 0 }, res => {
      this.customList = res.list;
    });
  }
};
</script>

<style scoped>
.contain-content {
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin: 30px auto;
  height: 89vh;
 
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
