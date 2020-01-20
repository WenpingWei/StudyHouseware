<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="home-container">
    <div class="contain-content">
      <div class="left-add">
        <div class="add-header">
          <el-button class="filter-item" type="primary" style="border-radius: 0;">新增客户</el-button>
        </div>
        <div class="add-content">
          <el-form
            :model="listQuery"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm">
            <el-form-item label="客户名称:" prop="customerName">
              <el-input type="text" v-model="listQuery.customerName" maxlength='64'  show-word-limit ></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="telephone">
              <el-input
              type="text"
              maxlength='11'  
              show-word-limit
              v-model="listQuery.telephone"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱:" prop="email">
              <el-input v-model="listQuery.email"></el-input>
            </el-form-item>
            <el-form-item label="公司LOGO:" prop="imgDataUrl">
              <div class="upload">
                <div class="img-wrapper">
                  <img v-if="listQuery.imgDataUrl" :src="listQuery.imgDataUrl" />
                  <div v-else class="logotext"><div class="logoText">LOGO</div></div>
                </div>
                <div class="mg-l-20">
                  <el-button class="btn" @click="toggleShow">选择文件</el-button>
                  <span style="font-size:14px;color: #EEEEEE;" v-if="!this.listQuery.imgDataUrl">未选择任何文件</span>
                  <div style="font-size:14px;color: #EEEEEE;">*仅支持jpg\gif\png格式，大小为1M以内</div>
                </div>
              </div>
              <my-upload
                field="file"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                v-model="show"
                :width="150"
                :height="150"
                :url="uploadUrl()"
                :headers="headers"
                noCircle
                img-format="png"
              ></my-upload>
            </el-form-item>
            <el-form-item label="系统名称:" prop="sysName">
              <el-input v-model="listQuery.sysName"></el-input>
            </el-form-item>
            <el-form-item label="客户地址:" prop="address">
              <div>
                <div>
                  <el-input
                    v-model="listQuery.address"
                    placeholder=""
                    style="width: 500px;position: absolute;z-index:2"
                    class="filter-item"
                    id="suggestId"
                    maxlength="50"
                    @blur="inquireAddress(listQuery.address)"
                  ></el-input>
                </div>
              </div>
            </el-form-item>
            <div id="allmap"></div>
            <el-form-item label="备注:">
              <el-input
                type="textarea"
                :rows="5"
                style="width: 66%;"
                placeholder="请输入内容"
                maxlength="500"
                resize="none"
                show-word-limit
                v-model="listQuery.mark"
              ></el-input>
              <span style="color:#ffffff;position: relative;right: 50px;">{{listQuery.mark.length}}/500</span>
            </el-form-item>
            <div style="margin-left: 40%;">
              <el-button class="filter-item" type="primary" @click="editSure">确定</el-button>
              <el-button class="filter-item" type="danger" @click="resetPro">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import Cookies from "js-cookie";
var token = "VSZ " + Cookies(window.localStorage.getItem("userName"));
export default {
  data() {
    return {
      listQuery: {
        id: "",
        customerName: "",
        telephone: "",
        email: "",
        address: "",
        mark: "",
        longitude: "106.558437", //经度
        latitude: "29.568996", //纬度
        attachId: "",
        imgDataUrl: "",
        sysName: ""
      },
      show: false,
      headers: {
        Authorization: token
      },
      rules: {
        customerName: [
          {
            required: true,
            pattern: /^(?!_)[\w\W]{1,20}$/,
            message:
              "请输入人1-20个非下划线开头的字符",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符"
          }
        ],
        telephone: [
          {
            required: true,
            pattern: /^1[23456789]\d{9}$/,
            message: "请输入正确的电话号码",
            trigger: "blur"
          }
        ],
        sysName: [
          { required: true, message: "系统名称", trigger: "blur" },
          {
            max: 20,
            message: "最长为20个字符"
          }
        ],
        email: [
          { required: true, message: "请输入联系邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        imgDataUrl: [
          { required: true, message: "请选择图片", trigger: "blur" }
        ],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    //地图
    mapShow: function() {
      var th = this;
      // 创建Map实例
      var map = new BMap.Map("allmap",{enableMapClick:false});
      // 初始化地图,设置中心点坐标，
      //自定义地图样式

      var point = new BMap.Point(th.listQuery.longitude, th.listQuery.latitude);
      // 创建点坐标，获得公司的经纬度坐标
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom();
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      // map.setMapStyleV2({
      //   styleId: "b6b7251e5a82776f28cad5c468bcb5e4"
      // });
      //建立一个自动完成的对象
      var ac = new BMap.Autocomplete({
        input: "suggestId",
        location: map
      });

      var myValue;
      //鼠标点击下拉列表后的事件
      ac.addEventListener("onconfirm", function(e) {
        var _value = e.item.value;
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        th.listQuery.address = myValue;
        setPlace();
      });

      function setPlace() {
        //清除地图上所有覆盖物
        map.clearOverlays();
        function myFun() {
          //获取第一个智能搜索的结果
          let userlocation = local.getResults().getPoi(0).point;
          th.listQuery.latitude = userlocation.lat;
          th.listQuery.longitude = userlocation.lng;
          map.centerAndZoom(userlocation, 18);
          // //添加标注
          var marker = new BMap.Marker(userlocation);
          map.addOverlay(marker);
          marker.enableDragging(); //启用标注拖动
          marker.addEventListener("dragend", function(e) {
            //拖动标注结束
            let pointNew = e.point;
            th.listQuery.latitude = pointNew.lat;
            th.listQuery.longitude = pointNew.lng;
            var geoc = new BMap.Geocoder();
            let point = new BMap.Point(pointNew.lng, pointNew.lat);
            geoc.getLocation(point, function(rs) {
              th.listQuery.address = rs.address;
            });
          });
        }

        //智能搜索
        var local = new BMap.LocalSearch(map, {
          onSearchComplete: myFun
        });
        local.search(myValue);
      }
    },
    //如果客户没有选择智能提示地址，判断客户输入位置的经纬度
    inquireAddress: function(val) {
      let th = this;
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(
        val,
        function(point) {
          if (point) {
            th.listQuery.latitude = point.lat;
            th.listQuery.longitude = point.lng;
          } else {
            if (th.listQuery.address == val) {
              th.$alert("未找到输入位置，请重新输入！", "提示", {
                confirmButtonText: "确定",
                type: "warning",
                callback: () => {
                  th.listQuery.address = "";
                }
              });
            }
          }
        },
        "中国"
      );
    },
    //编辑
    editSure: function() {
      let that = this;
      var cid = this.$route.params.id;
      let data = {
        address: that.listQuery.address,
        attachId: that.listQuery.attachId,
        customerName: that.listQuery.customerName,
        email: that.listQuery.email,
        id: that.listQuery.id,
        latitude: that.listQuery.latitude,
        longitude: that.listQuery.longitude,
        mark: that.listQuery.mark,
        sysName: that.listQuery.sysName,
        telephone: that.listQuery.telephone
      };
      that.$refs.ruleForm.validate(valid => {
        if (valid) {
          //增加客户
          this.$ajax({
            url: $$(`/custom/customer`),
            method: "post",
            data
          }).then(data => {
            if (data.data.status == 200) {
              that.$message({
                message: "添加成功！",
                type: "success"
              });
              that.resetPro();
            } else {
              that.$message.error(data.data.message);
            }
          });
        }
      });
    },
    //
    resetPro: function() {
      this.$router.push({
        path: "custom1"
      });
    },
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      this.listQuery.imgDataUrl = imgDataUrl;
      this.$refs.ruleForm.validate(validate=>{
      
      })
    },
    cropUploadSuccess(jsonData, field) {
      this.listQuery.attachId = jsonData.data.id;
    },
    cropUploadFail(status, field) {
      this.listQuery.imgDataUrl = "";
    },
    //上传路径
    uploadUrl() {
      var url = process.env.VUE_APP_BASE_API + "/upload/single";
      return url;
    }
  },
  mounted: function() {
    this.mapShow();
  },
  components: {
    "my-upload": myUpload
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped >
.home-container {
  width: 100%;
  overflow: hidden;
  margin: 20px;
  background-color: rgb(27, 35, 51);
}

.contain-content {
  width: 98%;
}

.left-add {
  width: 100%;
  height: auto;
  min-height: 765px;
  float: left;
}

.add-header {
  height: 38px;
  width: 100%;
  background: #273753;
  border-radius: 10px 0 0 0;
  overflow: hidden;
  height: 40px;
  width: 100%;
}

.add-content {
  width: 80%;
  margin: 30px auto;
}

.add-content > div {
  padding: 15px 0;
}

.right-include {
  width: 475px;
  float: left;
  height: auto;
  min-height: 765px;
  margin-left: 20px;
}

.demo-ruleForm {
  .el-input {
    width: 500px;
  }

  .el-textarea {
    width: 500px;
  }

 #allmap {
    margin-top:10px;
    margin-bottom:20px;
    margin-left 100px;
    width: 803px;
    height: 280px;
  }


  .upload {
    display: flex;

    .img-wrapper {
      width: 20%;
      height: 200px;
      text-align: center;
      background: rgb(36,44,63);
      overflow: hidden;
      box-sizing: border-box;
      margin-left: 5px;

      img {
        height: 200px;
      }
    }

    .el-button {
      vertical-align: top;
      margin-left: 2%;
      width: 80px;
      height: 31px;
      background: #ced3dc;
      font-size: 14px;
      color: #000;
      line-height: 10px;
      text-align: center;
      padding: 0;
    }
  }
}
.logotext{
      font-size:24px;
      height: 200px;
      text-align: center;
      background: rgb(36,44,63);
      overflow: hidden;
      border: 1px solid #5E5E5E;
      box-sizing: border-box;
      padding-top 30%;
      color:#3d4959;
}
.btn{
  background-color :#1A94E6!important;
  border:0;
}
</style>
