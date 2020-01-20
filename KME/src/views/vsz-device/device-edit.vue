<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="home-container">
    <div class="contain-content">
      <div class="left-add">
        <div class="add-header">
          <el-button
            class="filter-item"
            type="primary"
            style="border-radius: 0;"
          >编辑设备</el-button>
        </div>
        <div class="add-content" :class="{'active': !editorUpload}">
          <el-form
            ref="ruleForm"
            :model="modules"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="设备名称:" prop="deviceName">
              <el-input
                v-model="modules.deviceName"
                style="width: 60%;margin-left: 4px;"
                class="filter-item"
              />
            </el-form-item>
            <el-form-item label="设备类型:" prop="typeID">
              <el-select
                v-model="modules.typeID"
                placeholder="请选择设备类型"
                class="filter-item addpoint"
                style="width: 60%;margin-left: 4px;"
              >
                <el-option
                  v-for="(item,index) in deviceTypeListArr"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="所属客户:" prop="customerId">
              <!--<vs-custom-list @changeCustom="changeCustom"-->
              <!--:customId="modules.customerId"></vs-custom-list>-->
              <el-select v-model="modules.customerId" style="width: 60%;margin-left: 4px;" >
                <el-option
                  v-for="item in customList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.customerName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="设备图片:">
              <span class="img-wrapper" style="margin-left: 4px;" >
                <img :src="imageUrl" alt="">
              </span>
              <span class="mg-l-10" >
                <my-upload
                  v-model="show"
                  field="file"
                  :width="150"
                  :height="150"
                  :url="uploadUrl()"
                  :headers="myHeaders"
                  no-circle
                  img-format="png"
                  @crop-success="cropSuccess"
                  @crop-upload-success="cropUploadSuccess"
                  @crop-upload-fail="cropUploadFail"
                />
                <!--<el-upload-->
                <!--class="upload-device"-->
                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--list-type="picture-card"-->
                <!--:on-preview="handlePictureCardPreview"-->
                <!--&gt;-->

                <!--</el-upload>-->
                 <el-button class="btn" @click="toggleShow" >选择文件</el-button>
                <span class="font-color">仅支持jpg、gif、png格式；大小为1M以内</span>
              </span>
            </el-form-item>
            <el-form-item label="备注：" prop="mark">
              <el-input
                v-model="modules.mark"
                type="textarea"
                :rows="5"
                style="width: 66%;margin-left: 4px;"
                placeholder="请输入内容"
                maxlength="200"
                resize="none"
                show-word-limit
              />
            </el-form-item>
            <div style="text-align: center;padding: 15px 0;">
              <el-button class="filter-item" type="primary" @click="submitForm('ruleForm')">确认</el-button>
              <el-button class="filter-item" type="danger" @click="resetFilter">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="right-container">
        <vs-guide :explain-list="explainList" />
      </div>
    </div>
  </div>
</template>

<script>
import { constants } from 'crypto'
// options components
import myUpload from 'vue-image-crop-upload'
import Cookies from 'js-cookie'
var token = 'VSZ ' + Cookies(window.localStorage.getItem("userName"));
import carIcos from '../../assets/images/common/default.png'
export default {
  components: {
    'my-upload': myUpload
  },
  data() {
    this.colConfigs = [
      { prop: 'tplName', label: '数据点名称' },
      { prop: 'pointCount', label: '参数类别' },
      { prop: 'createTime', label: '缩略名' },
      { prop: 'mark', label: 'ID' },
      { prop: 'mark', label: '类型' },
      { prop: 'mark', label: '传输类型' },
      { prop: 'mark', label: '传输频率' },
      { prop: 'mark', label: '寄存器地址' },
      { prop: 'mark', label: '寄存器大小' },
      { prop: 'mark', label: '是否上传' },
      { prop: 'mark', label: '数据单位' }
    ]
    const length = (rule, value, callback) => {
      if (value.length > 500) {
        callback(new Error('请输入500个文字以内的字符'))
      }
    }
    return {
       routes:0,
      myHeaders: { Authorization: token },
      editorUpload: true,
      modules: {
        id: '',
        deviceName: '',
        typeID: '',
        customerId: '',
        attachID: '',
        mark: '' // 备注
      },
      customList: '',
      page: 1,
      show: false,
      rows: 10,
      explainList: [
        {
          title: '设备模板：',
          content: '设备名称，输入限定1-30位非下划线开头的字符；为必填写项'
        },
        
        {
          title: '设备类型：',
          content: '用于选择设备的类型，为必选项。'
        },
        {
          title: '所属客户：',
          content: '用于绑定设备和对应购买客户的关系，对设备进行客户类型分组，为必选项。'
        },
        {
          title:"设备图片：",
          content:"上传设备图片，仅支持jpg、gif、png格式；大小为1M以内。"
        }
      ],
      deviceTypeListArr: [],
      rules: {
        deviceName: [
          {
            required: true,
            pattern: /^(?!_)[\w\W]{1,30}$/,
            message: '输入限定为1-30位非下划线开头的字符',
            trigger: 'blur'
          }
        ],
        typeID: [
          {
            required: true,
            message: '选择不能为空',
            trigger: 'change'
          }
        ],
        customerId: [
          {
            required: true,
            message: '选择不能为空',
            trigger: 'change'
          }
        ]
      },
      imageUrl: carIcos,
      devDetailObj: {}
    }
  },
  created() {
    // this.fetchData()
  },
  mounted: function() {
    this.deviceTypeList()
    this.customeFun() // 客户详情
    this.devDetail() // 设备详情
    this.modules.id = this.$router.history.current.query.deviceId
  },
  methods: {
    resetFilter: function() {
        this.routes++
      if(this.routes==1){
      window.history.go(-1);
      }
    },
    // 设备详情
    devDetail() {
      this.$ajax({
        url: $$('/dev/deploy/detail'),
        method: 'get',
        params: {
          deviceId: this.$router.history.current.query.deviceId
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.modules = res.data.data
          this.$set(this.modules, 'customerId', res.data.data.customerId)
          this.imageUrl = process.env.VUE_APP_BASE_API + res.data.data.attachPath
        }
      })
    },
    deviceTypeList() { // 查询设备类型列表
      this.$ajax({
        url: $$('/deviceType/list'),
        method: 'get',
        params: {
           getPage: 0
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.deviceTypeListArr = res.data.data
        }
      })
    },
    customeFun() {
      this.common.getList(this, '/custom/customer/page?getPage=0', '', res => {
        this.customList = res.list
      })
    },
    changeCustom(id) {
      this.modules.customerId = id
    },
    // 编辑数据模板
    submitForm(formName) {
      const that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (that.modules.id) {
            const data = {
              address: that.modules.address,
              attachID: that.modules.attachID,
              customerId: that.modules.customerId,
              deviceName: that.modules.deviceName,
              deviceTemplateId: that.modules.deviceTemplateId,
              id: that.modules.id,
              latitude: that.modules.latitude,
              longitude: that.modules.longitude,
              mark: that.modules.mark,
              serialNumber: that.modules.serialNumber,
              typeID: that.modules.typeID
            }
            that.$ajax
              .put($$('/dev/deploy'), data)
              .then(function(data) {
                if (data.status === 200) {
                  that.$message({
                    message: '修改成功！',
                    type: 'success'
                  })
                  that.$router.push(`/equipmentManage/menu1`)
                } else {
                  that.$message.error(data.message)
                }
              })
          } else { // 新增
            that.$ajax
              .post($$('/dev/deploy'), that.modules)
              .then(function(data) {
                if (data.data.status === 200) {

                }
              })
          }
        } else {
          return false
        }
      })
    },
    putEditorUpload() {
      this.editorUpload = !this.editorUpload
    },
    cropSuccess(imgDataUrl) {
      this.imageUrl = imgDataUrl
      // this.modules.attachID = file.data.id
    },
    toggleShow() {
      this.show = !this.show
    },
    cropUploadSuccess(file) {
      this.modules.attachID = file.data.id
    },
    cropUploadFail(status, field) {
      this.imageUrl = ''
    },
    beforeAvatarUpload(file) {
      const type = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!type.includes(file.type)) {
        this.$message.error('上传头像图片只能是 jpg、gif、png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return type.includes(file.type) && isLt2M
    },
    // 上传路径
    uploadUrl() {
      var url = process.env.VUE_APP_BASE_API + '/upload/single'
      return url
    }
  }
}
</script>

<style lang="scss" scoped>
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
    font-size: 14px;
    color: #009dd9;
    text-decoration: underline;
    position: absolute;
    top: 0;
    left: 70px;
  }
  .right-container {
    width: 32%;
  }
  .img-wrapper {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    width: 300px;
    height: 200px;
    background: #233149;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .font-color {
    color: #a7b3c5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    line-height: 16px;
  }
  .upload-device {
    display: inline-block;
    >>>.el-upload {
      width: 82px;
      height: 29px;
      line-height: 29px;
      background: none;
      border: none;
    }
  }
  .btn{
  background-color :#1A94E6!important;
  border:0;
  color: #ffffff;
}
</style>
