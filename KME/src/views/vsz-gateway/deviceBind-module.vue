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
          >编辑绑定设备</el-button>
          <el-button
            v-else
            class="filter-item"
            type="primary"
            style="border-radius: 10px 0 0 0;"
          >新增绑定设备</el-button>
        </div>

        <div class="add-content">
          <el-form
            :model="modules"
            :rules="rules"
            ref="resForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="设备名称:" prop="name">
              <el-input
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                v-model="modules.name"
                placeholder="请输入绑定设备名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="关联设备:" prop="deviceId">
              <el-select
                v-model="modules.deviceId"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                placeholder="请选择关联设备"
              >
                <el-option
                  v-for="item in deviceList"
                  :key="item.id"
                  :label="item.deviceName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="数据模板:" prop="tplId">
              <el-select
                v-model="modules.tplId"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                placeholder="请选择数据模板"
              >
                <el-option
                  v-for="item in templateList"
                  :key="item.id"
                  :label="item.tplName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="通信协议:" prop="agreement">
              <el-select
                v-model="modules.agreement"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                placeholder="请选择通信协议"
              >
                <el-option
                  v-for="(item,index) in agreementList"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="设备类型:" prop="deviceType">
              <el-select
                v-model="modules.deviceType"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                placeholder="请选择设备类型"
              >
              <el-option label="西门子" value="1" />
              <el-option label="施耐德" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="IP地址:" prop="ipAddress">
              <el-input style="display:none" v-model="modules.ipAddress"></el-input>
              <div class="ipAddressBox" style="margin-left: 4px;">
                <el-input class="ipAddressInput" v-model="ip1"  ref="ip1" ></el-input>.
                <el-input class="ipAddressInput" v-model="ip2" ref="ip2" ></el-input>.
                <el-input class="ipAddressInput" v-model="ip3" ref="ip3" ></el-input>.
                <el-input class="ipAddressInput" v-model="ip4" ref="ip4" ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="端口:" prop="port">
              <el-input
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
                v-model="modules.port"
              ></el-input>
            </el-form-item>
            <el-form-item label="到期时间:" required>
              <el-col :span="6">
                <el-form-item prop="date1" style="margin-left: 4px;">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="modules.expire"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <div style="text-align: center;padding: 15px 0;margin-top:200px;margin-bottom:150px;">
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
      election: false,
      ip1: "",
      ip2: "",
      ip3: "",
      ip4: "",
      gatewayId: "",
      modules: {
        date1: "",
        id: "",
        name: "",
        customerId: "",
        comPort: "1",
        deviceId: "",
        tplId: "",
        agreement: "",
        ipAddress: "",
        port: "",
        expire: "",
        modbusAddress: "192.168.1.1",
        deviceType:""
      },
      deviceList: [],
      templateList: [],
      agreementList: ["Modbus-TCP"],
      explainList: [
        {
          title: "设备名称：",
          content: "输入绑定设备名称，输入限定1-20位非下划线开头的字符，为必填写项。"
        },
        {
          title: "关联设备：",
          content: "关联该客户未绑定网关的设备；为必选项。"
        },
        {
          title: "数据模板：",
          content: "在下拉选项中，选择设备需绑定的数据模板；为必选项。"
        },
        {
          title: "通信协议：",
          content: "在通讯协议列表中选择对应的通讯协议，可通过通信信道和设备互连起来的多个不同地理位置的数据通信系统。"
        },
        {
          title: "IP地址：",
          content: "填写设备IP地址进行绑定，输入限定0-255，为必填项。"
        },
        {
          title: "端口:",
          content: "填写设备端口号；为必填项。"
        }
      ],
      rules: {
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur"
          }
        ],
        customerId: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "change"
          }
        ],
        deviceId: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "change"
          }
        ],
        tplId: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "change"
          }
        ],
        agreement: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "change"
          }
        ],
        ipAddress: [
          {
            required: true,
            pattern: /^((\d)|([1-9]\d)|(1\d{2})|((2[0-4]\d)|(25[0-5])))(\.((\d)|([1-9]\d)|(1\d{2})|((2[0-4]\d)|(25[0-5])))){3}$/,
            message: "ip地址取值为0-255",
            trigger: "change"
          }
        ],
        port: [
          {
            required: true,
            message: "端口号不能为空",
            trigger: "blur"
          }
        ],
        deviceType: [
          {
            required: true,
            message: "选择不能为空",
            trigger: "blur"
          }
        ],
        expire: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        expire: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  watch: {
    ip1: function(val) {
     if(val.length==3){
       this.$refs.ip2.focus()
     }
      this.modules.ipAddress =
        this.ip1 + "." + this.ip2 + "." + this.ip3 + "." + this.ip4;
    },
    ip2: function(val) {
       if(val.length==3){
       this.$refs.ip3.focus()
     }
      this.modules.ipAddress =
        this.ip1 + "." + this.ip2 + "." + this.ip3 + "." + this.ip4;
    },
    ip3: function(val) {
       if(val.length==3){
       this.$refs.ip4.focus()
     }
      this.modules.ipAddress =
        this.ip1 + "." + this.ip2 + "." + this.ip3 + "." + this.ip4;
    },
    ip4: function(val) {
      if(val.length==3){
       this.$refs.ip4.blur()
     }
      this.modules.ipAddress =
        this.ip1 + "." + this.ip2 + "." + this.ip3 + "." + this.ip4;
    }
  },
  methods: {
    //获取一条数据
    inputChange(e){
      console.log(e)
    },
    getListData: function(cid) {
      let that = this;
      that.$ajax.get($$("/plc"), { params: { id: cid } }).then(function(data) {
        that.modules.name = data.data.data.name;
        that.modules.id = data.data.data.id;
        that.modules.agreement = data.data.data.agreement;
        that.modules.comPort = data.data.data.comPort;
        that.modules.ipAddress = data.data.data.ipAddress;
        that.modules.port = data.data.data.port;
        that.modules.modbusAddress = data.data.data.modbusAddress;
        that.modules.customerId = data.data.data.customerId;
        that.ip1 = data.data.data.ipAddress.split(".")[0];
        that.ip2 = data.data.data.ipAddress.split(".")[1];
        that.ip3 = data.data.data.ipAddress.split(".")[2];
        that.ip4 = data.data.data.ipAddress.split(".")[3];
        that.modules.deviceId = data.data.data.deviceId;
        that.modules.tplId = data.data.data.dataTemplateId;
        let time = that.common.datetimeFormat(data.data.data.expire);
        that.modules.date1 = new Date(time.split(" ")[0]).toISOString();
        that.modules.expire = new Date(data).toISOString();
      });
    },
    //获取设备列表
    getdeviceList(plcId) {
      let that = this;
      that.$ajax
        .get($$("/gateway"), { params: { id: this.gatewayId } })
        .then(function(data) {
          that.modules.customerId = data.data.data.customerId;
          if (plcId) {
            that.common.getList(
              that,
              "/dev/deploy/list/notPage",
              { customerId: data.data.data.customerId, excluded: 1, plcId },
              res => {
                that.deviceList = res;
              }
            );
          } else {
            that.common.getList(
              that,
              "/dev/deploy/list/notPage",
              { customerId: data.data.data.customerId, excluded: 1 },
              res => {
                that.deviceList = res;
              }
            );
          }
        });
    },
    //编辑
    submitForm(formName) {
      console.log(this.modules.expire)
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (that.modules.id) {
             console.log(that.modules)
            that.$ajax.put($$("/plc"), that.modules).then(function(data) {
              if (data.data.status == 200) {

                let entity = {
                  dataTemplateId: that.modules.tplId,
                  deviceId: that.modules.deviceId,
                  gatewayId: that.gatewayId,
                  plcId: that.modules.id
                };
                that.$ajax
                  .post($$("/gateway/bind"), entity)
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
                that.$message.error(data.data.message);
              }
            });
          } else {

            that.$ajax.post($$("/plc"), that.modules).then(function(data) {
              if (data.data.status == 200) {
                let entity = {
                  dataTemplateId: that.modules.tplId,
                  deviceId: that.modules.deviceId,
                  gatewayId: that.gatewayId,
                  plcId: data.data.data
                };
                that.$ajax
                  .post($$("/gateway/bind"), entity)
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
        path: "/gateway/deviceBind",
        query: {
          id: this.gatewayId
        }
      });
    }
  },
  mounted: function() {
    var that = this
    var data = {
        getPage:1
    }
    that.$ajax.get($$("/data/template/list?getPage=0")).then((res)=>{
       this.templateList = res.data.data;
    })
    //获取模板列表
    // this.common.getList(this, "/data/template/list", "", res => {
    //   this.templateList = res.list;
    // });
    let cid = this.$route.query.id;
    this.gatewayId = this.$route.query.gatewayId;
    if (cid) {
      this.getListData(cid);
      this.getdeviceList(cid);
      this.election = true;
    }else{
      this.getdeviceList();
    }
  }
};
</script>

<style scoped>
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
.ipAddressBox {
  display: flex;
  color: #fff;
}
.ipAddressInput {
  width: 60px;
}
.right-container {
  width: 32%;
}
</style>
