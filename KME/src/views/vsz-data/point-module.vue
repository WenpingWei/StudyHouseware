<template>
  <div class="home-container">
    <div class="contain-content">
      <div class="left-add">
        <div class="add-header">
          <el-button
            v-if="point.id"
            class="filter-item"
            type="primary"
            style="border-radius: 0;"
          >编辑数据点</el-button>
          <el-button v-else class="filter-item" type="primary" style="border-radius: 0;">新增数据点</el-button>
        </div>
        <div class="add-content">
          <el-form
            :model="point"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="数据点名称:" prop="collectName">
              <el-input
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                v-model="point.collectName"
              ></el-input>
            </el-form-item>
            <el-form-item label="缩略名:" prop="shortName">
              <el-input
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                v-model="point.shortName"
              ></el-input>
            </el-form-item>
            <el-form-item label="ID:" prop="collectId">
              <el-input
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                v-model="point.collectId"
              ></el-input>
            </el-form-item>
            <el-form-item label="数据类型:" prop="dataType">
              <el-select
                v-model="point.dataType"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
              >
                <el-option
                  v-for="item in dataType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="传输类型:" prop="transmissionType">
              <el-select
                v-model="point.transmissionType"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
              >
                <el-option
                  v-for="item in transmissionType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="传输频率:" prop="collectRate">
              <el-select
                v-model="point.collectRate"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
              >
                <el-option
                  v-for="item in collectRate"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="寄存器地址:" prop="address">
              <el-input
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                v-model="point.address"
              ></el-input>
            </el-form-item>
            <el-form-item label="寄存器大小:" prop="size">
              <el-input
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                maxlength="20"
                v-model.number="point.size"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否上传:" prop="upload">
              <el-select
                v-model="point.upload"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
              >
                <el-option
                  v-for="item in upload"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="数据单位:" prop="unit">
              <el-input
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                v-model="point.unit"
              ></el-input>
            </el-form-item>
            <el-form-item label="存储方式:" prop="collectType">
              <el-select
                v-model="point.collectType"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
              >
                <el-option
                  v-for="item in collectType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="功能码:" prop="functionCode">
              <el-select
                v-model="point.functionCode"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
              >
                <el-option
                  v-for="item in functionCode"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="高级选项:">
              <p>运行公式</p>
              <el-input
                type="textarea"
                :rows="3"
                resize="none"
                placeholder="请输入内容"
                v-model="point.formulaExecute"
                style="width: 60%;margin-left: 4px;border-radius: 1px;text-indent: 1em;color: #4b4b4b"
              ></el-input>
              <p>反向运行公式</p>
              <el-input
                type="textarea"
                :rows="3"
                resize="none"
                placeholder="请输入内容"
                v-model="point.formulaAnti"
                style="width: 60%;margin-left: 4px;border-radius: 1px;text-indent: 1em;color: #4b4b4b"
              ></el-input>
            </el-form-item>
            <el-form-item label="告警描述:">
              <el-input
                type="textarea"
                :rows="3"
                maxlength="200"
                resize="none"
                show-word-limit
                placeholder="请输入内容"
                v-model="point.mark"
                style="width: 60%;margin-left: 4px;border-radius: 1px;text-indent: 1em;color: #4b4b4b"
              ></el-input>
            </el-form-item>
            <div class="btns">
              <el-button
                v-if="!this.point.id"
                class="filter-item"
                type="primary"
                @click="submitForm('ruleForm','proceed')"
              >继续新增</el-button>
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
export default {
  data() {
    return {
      pointName: null,
      listQuery: null,
      toJump: 0,
      dataType: [
        {
          id: 1,
          name: "Number"
        },
        {
          id: 2,
          name: "String"
        },
        {
          id: 3,
          name: "Bool"
        },
        {
          id: 4,
          name: "Float"
        }
      ],
      transmissionType: [
        {
          id: 0,
          name: "R"
        },
        {
          id: 1,
          name: "T"
        },
        {
          id: 2,
          name: "Y"
        }
      ],
      collectRate: [
        {
          id: 5,
          name: "5秒"
        },
        {
          id: 10,
          name: "10秒"
        },
        {
          id: 30,
          name: "30秒"
        },
        {
          id: 60,
          name: "1分钟"
        }
      ],
      collectType: [
        {
          id: 0,
          name: "不保存"
        },
        {
          id: 1,
          name: "变化时保存"
        },
        {
          id: 2,
          name: "实时保存"
        }
      ],
      upload: [
        {
          id: 1,
          name: "Y"
        },
        {
          id: 0,
          name: "N"
        }
      ],
      functionCode: [
        {
          id: 1,
          name: "01读线圈状态"
        },
        {
          id: 2,
          name: "02读离散输入状态"
        },
        {
          id: 3,
          name: "03读保持寄存器"
        },
        {
          id: 4,
          name: "04读输入寄存器"
        },
        {
          id: 5,
          name: "05写单个线圈"
        },
        {
          id: 6,
          name: "06写单个保持寄存器"
        },
        {
          id: 7,
          name: "15写单个线圈"
        },
        {
          id: 8,
          name: "16写单个保持寄存器"
        }
      ],
      point: {
        id: "",
        collectName: "",
        shortName: "",
        collectId: "",
        transmissionType: "",
        collectRate: "",
        address: "",
        size: "",
        upload: "",
        functionCode: "",
        collectType: "",
        unit: "",
        dataType: "",
        formulaExecute: "",
        formulaAnti: "",
        mark: ""
      },
      rules: {
        collectName: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur"
          },{
            pattern: /^(?!_)[\w\-\u4e00-\u9fa5]{1,20}$/,
            message: "请输入1到20位非下划线开头的字符",
            trigger: "blur"
          }
        ],
        shortName: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur"
          }
        ],
        collectId: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur"
          }
        ],
        dataType: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "change"
          }
        ],
        transmissionType: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "change"
          }
        ],
        collectRate: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "change"
          }
        ],
        collectType: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "change"
          }
        ],
        upload: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "change"
          }
        ],
        functionCode: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur"
          },{
            // pattern: /^\d{1,20}$/,
            pattern:/^\d{1,20}$|^\d+\.\d{1,20}$/g,
            message: "寄存器地址只能输入数字，长度1到20",
            trigger: "blur"
          }
        ],
        size: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur"
          },
          { type: "number",

          message: "必须为数字值", trigger: "blur" },
          {
            max:20,
            min:1,
           pattern: /^\d{1,20}$/,
           message: "寄存器大小只能输入数字，长度1到20",
            trigger: "blur"
          }
        ],
        unit:[
          {
          min:1,
          max:16,
          message: "计量单位长度在1到16之间",
          trigger: "blur"
          }
        ]
      },
      explainList: [
        {
          title: "数据类型:",
          content:
            "设置采集数据的类型，有String字符类型、Number数字类型、Bool布尔类型、Float浮点类型；通过设置数据类型，可以获得对应类型的数据；为必选项。"
        },
         {
          title: "数据单位:",
          content: "摄氏度单位为℃，压力单位为kPa，速度单位为mm/s、cm/s、m/s等；为填选项。"
        },
        {
          title: "存储方式:",
          content:
            "分为实时保存，即按照该设备点的采集频率，将读取的数据进行存储；变化时保存，即对读取的数据与原有存储的数据进行对比，如果数据不同则进行存储；不保存，即只是读取数据进行查看，不进行保存；为必选项。"
        },

        {
          title: "运行公式:",
          content:
            "按照需求，将采集的数据进行预处理，根据一定规则的表达式进行运算获取预处理数据。"
        }
      ],
      templateId: ""
    };
  },
  created() {},

  methods: {
    //获取一条数据
    getListData: function(cid) {
      let that = this;
      that.$ajax
        .get($$("/data/point"), { params: { id: cid } })
        .then(function(data) {
          that.point.id = data.data.data.id;
          that.point.collectName = data.data.data.collectName;
          that.point.dataType =
            data.data.data.dataType == 1
              ? "Number"
              : data.data.data.dataType == 2
              ? "String"
              : data.data.data.dataType == 3
              ? "Bool"
              : data.data.data.dataType == 4
              ? "Float"
              : data.data.data.dataType;
          that.point.shortName = data.data.data.shortName;
          that.point.collectId = data.data.data.collectId;
          that.point.mark = data.data.data.mark;
          that.point.transmissionType =
            data.data.data.transmissionType == 0
              ? "R"
              : data.data.data.transmissionType == 1
              ? "T"
              : "Y";
          that.point.collectRate =
            data.data.data.collectRate == 5
              ? "5秒"
              : data.data.data.collectRate == 10
              ? "10秒"
              : data.data.data.collectRate == 30
              ? "30秒"
              : "1分钟";
          that.point.address = data.data.data.address;
          that.point.size = data.data.data.size;
          that.point.functionCode =
            data.data.data.functionCode == 1
              ? "01读线圈状态"
              : data.data.data.functionCode == 2
              ? "02读离散输入状态"
              : data.data.data.functionCode == 3
              ? "03读保持寄存器"
              : data.data.data.functionCode == 4
              ? "04读输入寄存器"
              : data.data.data.functionCode == 5
              ? "05写单个线圈"
              : data.data.data.functionCode == 6
              ? "06写单个保持寄存器"
              : data.data.data.functionCode == 7
              ? "15写单个线圈"
              : "16写单个保持寄存器";
          that.point.collectType =
            data.data.data.collectType == 0
              ? "不保存"
              : data.data.data.collectType == 1
              ? "变化时保存"
              : "实时保存";
          that.point.unit = data.data.data.unit;
          that.point.formulaExecute = data.data.data.formulaExecute;
          that.point.formulaAnti = data.data.data.formulaAnti;
          that.point.upload = data.data.data.upload == 1 ? "Y" : "N";
        });
    },
    //编辑
    submitForm(formName, proceed) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let that = this;
          that.point.dataType =
            that.point.dataType == "Number"
              ? 1
              : that.point.dataType == "String"
              ? 2
              : that.point.dataType == "Bool"
              ? 3
              : that.point.dataType == "Float"
              ? 4
              : that.point.dataType;
          that.point.transmissionType =
            that.point.transmissionType == "R"
              ? 0
              : that.point.transmissionType == "T"
              ? 1
              : that.point.transmissionType == "Y"
              ? 2
              : that.point.transmissionType;
          that.point.collectRate =
            that.point.collectRate == "5秒"
              ? 5
              : that.point.collectRate == "10秒"
              ? 10
              : that.point.collectRate == "30秒"
              ? 30
              : that.point.collectRate == "1分钟"
              ? 60
              : that.point.collectRate;
          that.point.collectType =
            that.point.collectType == "不保存"
              ? 0
              : that.point.collectType == "变化时保存"
              ? 1
              : that.point.collectType == "实时保存"
              ? 2
              : that.point.collectType;
          that.point.upload =
            that.point.upload == "Y"
              ? 1
              : that.point.upload == "N"
              ? 0
              : that.point.upload;
          that.point.functionCode =
            that.point.functionCode == "01读线圈状态"
              ? 1
              : that.point.functionCode == "02读离散输入状态"
              ? 2
              : that.point.functionCode == "03读保持寄存器"
              ? 3
              : that.point.functionCode == "04读输入寄存器"
              ? 4
              : that.point.functionCode == "05写单个线圈"
              ? 5
              : that.point.functionCode == "06写单个保持寄存器"
              ? 6
              : that.point.functionCode == "15写单个线圈"
              ? 7
              : that.point.functionCode == "16写单个保持寄存器"
              ? 8
              : that.point.functionCode;
          if (this.point.id) {
            that.$ajax.put($$("/data/point"), that.point).then(function(data) {
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
            let that = this;
            that.$ajax.post($$("/data/point"), that.point).then(function(data) {
              if (data.data.status == 200) {
                let obj = {
                  bindIds: [data.data.data],
                  targetId: that.templateId
                };
                that.$ajax
                  .post($$("/data/template/bindPoint"), obj)
                  .then(function(data) {
                    if (data.data.status == 200) {
                      if (proceed) {
                        that.$message({
                          message: "新增成功！",
                          type: "success"
                        });
                        that.$refs[formName].resetFields();
                        that.point.formulaExecute = "";
                        that.point.unit = "";
                        that.point.formulaAnti = "";
                        that.point.mark = "";
                      } else {
                        that.$message({
                          message: "新增成功！",
                          type: "success"
                        });
                        that.resetFilter();
                      }
                    } else {
                      that.$message.error(data.data.message);
                    }
                  });
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
      this.$router.push({
        path: "/dataManage/dataNum3",
        query: {
          templateId: this.templateId
        }
      });
    }
  },
  mounted: function() {
    let cid = this.$route.query.id;
    this.templateId = this.$route.query.templateId;
    if (cid) {
      this.getListData(cid);
    }
  }
};
</script>

<style scoped>
.home-container {
  width: 100%;
  overflow: hidden;
}
.left-add {
  width: 67%;
  height: 100%;
  border-radius: 10px 10px 0 0;
  background: #1b2333;
}
.add-header {
  height: 38px;
  width: 100%;
  background: #273753;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}
.add-content {
  width: 80%;
  margin: 30px auto;
}
.add-content > div {
  padding: 15px 0;
}
.contain-content {
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin: 30px auto;

}
.right-container {
  width: 32%;
  border-radius: 10px 10px 0 0;
  height: 131.2ch;
}
p {
  color: #fff;
}
.btns {
 width: 100%;
 display: flex;
 justify-content: center;
}
</style>
