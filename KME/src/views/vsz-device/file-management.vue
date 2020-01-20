<template>
  <div>
    <div class="device-contain">
      <div v-if="picturesBox" class="picturesBox">
        <p class="close" @click="close">X</p>
        <div class="imgBox">
          <img :src="imgUrl" />
        </div>
      </div>
      <div class="device-select">
        <div class="mg-l-15 btnList">
          <el-upload
            ref="upload"
            class="upload"
            :action="uploadUrl()"
            :on-success="handleSuccess"
            :headers="myHeaders"
            :before-upload="beforeAvatarUpload"
            multiple
            :show-file-list=false
            :data=data
         >
            <el-button type="primary">上传文件</el-button>
          </el-upload>
          <el-button type="primary" @click="downloadFiles">下载文件</el-button>
          <el-button type="danger" @click="delMore">删除文件</el-button>
        </div>
        <div class="search">
          <el-input v-model="keywords" class="mg-l-10" placeholder="请输入文件名称">
            <template slot="append">
              <el-button class="filter-item" type="primary" @click="dataGet">搜索</el-button>
            </template>
          </el-input>
        </div>
      </div>
      <div slot="tip" class="el-upload__tip mg-l-15">*仅支持上传2M以内的文件</div>
      <vs-table
        @changeTable="handleSelectId"
        :table-data="tableData"
        :col-configs="colConfigs"
        @changeNum="handleNum"
      >
        <el-table-column slot="checkbox" type="selection" width="55"></el-table-column>
        <el-table-column slot="detail" label="名称">
          <template slot-scope="scope">
            <span
              v-if="scope.row.suffix == 'jpg' || scope.row.suffix == 'png'"
              class="color-blue cursor"
              @click="preview(scope.row)"
            >{{scope.row.fileName}}</span>
            <span v-else>{{scope.row.fileName}}</span>
          </template>
        </el-table-column>
        <el-table-column slot="operation" align="center" label="功能操作">
          <template slot-scope="scope">
            <span class="color-blue cursor" @click="handleDelete(scope.row)">删除</span>
          </template>
        </el-table-column>
      </vs-table>
    </div>
  </div>
</template>
<script>
import { downloadFile } from '@/api/download'
import Cookies from 'js-cookie'
var token = 'VSZ ' + Cookies(window.localStorage.getItem("userName"));
export default {
  data() {
    this.colConfigs = [
      { prop: "suffix", label: "类型" },
      { prop: "userName", label: "上传用户" },
      { prop: "createTime", label: "上传时间" }
    ];
    return {
      myHeaders:{Authorization: token},
      keywords: "",
      page: 1,
      rows: 10,
      tableData: [],
      checkBoxData: [],
      data: {
        userId: "",
        deviceId: ""
      },
      imgUrl: "",
      picturesBox: false
    };
  },
      computed:{
        isCollapse(){
            return this.keywords;
        }
    },
  watch:{
    isCollapse(newValue,oldValue){  //监听用户输入框无数据时
      if(newValue==''){
      this.reach()
      }
    }
  },
  mounted() {
    this.data.userId = this.Cookies(window.localStorage.getItem("userName")+"userId");
    this.data.deviceId = this.$route.query.deviceId;
    this.dataGet();
  },
  methods: {
    //获取文件列表
    reach(){
      this.page = 1
      this.dataGet()
    },
    dataGet: function() {
      const data = {
        page: this.page,
        rows: this.rows,
        deviceId: this.data.deviceId,
        fileName: this.keywords
      };
      this.common.getTableList(this, "/deviceFileupload/list", data, res => {
        this.tableData = res;
      });
    },
    //下载文件
    downloadFiles() {
      for(let i = 0;i<this.checkBoxData.length;i++){
        let ids = [];
        ids.push(this.checkBoxData[i].id)
        downloadFile(ids).then(res => {
         this.allDownload(res.data,this.checkBoxData[i].fileName)
      })
      }
    },
    allDownload(data,name){
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download',name)
      document.body.appendChild(link)
      link.click()
    },
    //上传前要处理的事
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
      }
      
      return isLt2M;
    },
    //上传成功
    handleSuccess(res) {
      if (res.status == 200) {
        this.$message({
          message: "上传成功！",
          type: "success"
        });
        this.dataGet();
      } else {
        this.$message.error(res.message);
      }
    },
    //上传路径
    uploadUrl() {
      var url =  process.env.VUE_APP_BASE_API + "/deviceFileupload";
      return url;
    },
    //预览图片
    preview(row) {
      //打开弹出层
      this.picturesBox = !this.picturesBox;
      this.imgUrl = $$$(row.path);
    },
    //关闭弹出层
    close() {
      this.picturesBox = !this.picturesBox;
    },
    //批量删除
    delMore() {
      this.common.delMore(
        this.checkBoxData,
        this,
        "/deviceFileupload",
        this.dataGet
      );
    },
    //删除
    handleDelete(row) {
      this.checkBoxData = [row];
      this.common.delFun(
        this.checkBoxData,
        this,
        "/deviceFileupload",
        this.dataGet,
        "radio"
      );
    },
    handleNum(num) {
      this.page = num;
      this.dataGet();
    },
    handleSelectId(val) {
      this.checkBoxData = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.device-contain {
  width: 97%;
  background: #1b2333;
  border-radius: 10px;
  .picturesBox {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 98;
    background-color: rgba(0, 0, 0, 0.7);
    .close {
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 30px;
      background-color: #fff;
      text-align: center;
      line-height: 30px;
      position: absolute;
      top: 5px;
      right: 40px;
      cursor: pointer;
    }
    .imgBox {
      width: 30%;
      height: 50%;
      margin: 0 auto;
      position: relative;
      top: 25%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  /*height: 300px;*/
  margin: 20px 1.5% 20px 1.2%;
  padding-bottom: 20px;

  .el-upload__tip {
    margin-top: 0;
    margin-bottom: 10px;
  }
  .device-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    margin: 15px 15px 0px auto;

    .btnList {
      display: flex;
      .upload {
        margin-right: 12px;
      }
    }
    .search {
      display: flex;
    }
    >>> .el-input-group__prepend {
      border: none;
    }
    .el-input__inner {
      background: #233149 !important;
      border: none;
      color: #b2bdcd;
    }
  }
}
</style>
