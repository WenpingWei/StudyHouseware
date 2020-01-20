<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <!--地图展示-->
  <div class="home-container">
    <div class="left">
      <div class="left-content">
        <div class="left-search">     
          <span class="search" v-if="dispaly1" ><img src="../../assets/images/search.png" alt=""></span>
          <el-input placeholder="  请输入设备名称"  @focus="dispalyFalse()" @blur="dispalyTrue()" v-model="input" @change="empty">
            <el-button slot="append" type="primary"   @click="dataGet">搜索</el-button>
          </el-input>
          <p @click="putListDevSta">
            <img src="../../assets/images/drop-down.png" />
          </p>
        </div>
        <div v-if="leftList" class="left-list">
          <vs-custom-list
            @changeCustom="changeCustom"
            class="filter-item"
            :customId="company"
            title="所有客户"
          ></vs-custom-list>
          <el-select class="filter-item" placeholder="请选择状态" v-model="filename" @change="dataGet()">
            <el-option label="所有设备" value />
            <el-option
              v-for="(item,index) in model.status"
              :label="item"
              :value="index"
              v-bind:key="item"
            ></el-option>
          </el-select>
          <div class="table-left">
            <ul>
              <li
                class="li-border"
                v-for="item in tableData"
                :key="item.id"
                @click="redirectMapDetail(item)"
              >
                <p>
                  <span class="number-dev">{{item.deviceName}}</span>
                  <span class="device-icon" :class="deviceIcon[item.status]">
                    <img
                      :src="item.status==2?require('../../assets/images/warn.png'):require('../../assets/images/device.png')"
                    />
                  </span>
                </p>
                <div class="normal-font mg-t-10">设备编号：{{item.serialNumber}}</div>
                <div class="normal-font mg-t-10">所属公司：{{item.customerName}}</div>
                <img src="../../assets/images/right_arrow.png" class="right-arrow" />
              </li>
            </ul>
            <div class="block">
              <el-pagination
                background
                :current-page.sync="page"
                @current-change="handleCurrentChange"
                layout="prev, pager, next,total"
                :total="listTotal"
                :page-size.sync="rows"
                :pager-count="3"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div id="rightMap" style="width: 100%;height: 950px;z-index: 1000;"></div>
    </div>
    <div class="pop-content" ref="popContent" v-show="popContentFlag">
      <div>
        <span class="device-icon" :class="deviceIcon[deviceData.status]">
          <img
                :src="deviceData.status==2?require('../../assets/images/warn.png'):require('../../assets/images/device.png')"
          />
        </span>
      </div>

      <div class="device-detail-wrapper mg-t-10">
        <div class="img-wrapper">
          <img :src="path" />
        </div>
        <div class="device-detail">
          <section>
            <span class="name" style="
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 90%;
          display: inline-block;"
          :title="deviceData.deviceName" >{{deviceData.deviceName}}</span>
          </section>
          <section>
            <span class="device-num mg-t-10">{{deviceData.serialNumber}}</span>
          </section>
          <section>
            <span class="font-weight">设备类型:</span>
            <span>{{deviceData.typeName}}</span>
          </section>
          <section>
            <span class="font-weight">所属客户:</span>
            <span>{{deviceData.customerName}}</span>
          </section>
          <section>
            <span class="font-weight">状态更新时间:</span>
            <span>{{this.common.datetimeFormat(deviceData.createTime)}}</span>
          </section>
          <el-button
            class="detailBut"
            type="primary"
            v-btn="{text: '设备详情'}"
            @click="handleDetail(deviceData)"
          >设备详情</el-button>
          <el-button class="detailBut" type="danger" @click="closeInfoBox()">关闭</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import icon1 from "../../assets/images/onLine.png";
import icon2 from "../../assets/images/offLine.png";
import icon3 from "../../assets/images/problem.png";
import icon4 from "../../assets/images/loginBj.png";
import defaultModule from "../../assets/images/common/default.png";
export default {
  data() {
    return {
      listDevSta: "",
      leftList: false,
      pointInfo: [],
      dispaly1:true,
      company: "",
      filename: "",
      model: {
        companies: [
          "平台方自己公司",
          "浙江吉利控股集团",
          "重庆长安汽车股份有限公司",
          "广州汽车集团乘用车有限公司",
          "中国第一汽车集团有限公司",
          "上海汽车集团股份有限公司",
          "长城汽车股份有限公司"
        ],
        status: ["在线","离线",  "故障"]
      },
      listTotal: 1,
      page: 1,
      rows: 7,
      tableData: [],
      deviceData: {}, //地图弹窗中的数据
      input: "",
      map: "",
      popContentFlag: false,
      deviceIcon: [ "on-line", "off-line","default"],
      lastInfoBox: null
    };
  },
  computed: {
    path() {
      const imgUrl = this.deviceData.attachPath;
      if (imgUrl) {
        return process.env.VUE_APP_BASE_API + imgUrl;
      } else {
        return defaultModule;
      }
    }
  },
  methods: {
    //列表显示或隐藏
    putListDevSta: function() {
      this.leftList = !this.leftList;
    },
    dispalyTrue(){
      this.dispaly1 = true
    },
    dispalyFalse(){
      this.dispaly1 = false
    },
  //清空时调用的方法
    empty(){  
      if(this.input==""){
        this.dataGet()
      }
    },
    //左侧表格
    dataGet: function() {
      //      let that = this;
      let page = this.page;
      let rows = this.rows;
      let needPoints = 0;
      let type = 1;
      let customerId = this.company;
      let status = this.filename;
      let keywords = this.input;
      let data = {
        page,
        rows,
        type,
        customerId,
        status,
        keywords,
        needPoints,
        excludedLocation: 1
      };
      this.common.getTableList(this, "/dev/deploy/list", data, res => {
        this.tableData = res.list;
        this.listTotal = res.total;
        this.rigMap();
      });
    },

    //    筛选公司
    changeCustom(id) {
      this.company = id;
      this.dataGet();
    },

    //    点击设备右边地图显示详情
    redirectMapDetail(row) {
      const p1 = new BMap.Point(row.longitude, row.latitude);
      this.map.centerAndZoom(p1, 12);
      this.map.panTo(p1);
      this.popContentFun(row);
    },

    handleDetail(row) {
      // this.common.linkDeviceDetail(row);
      this.$router.push({
        path: "/equipmentManage/menu19",
        query: {
          deviceId: row.id
        }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.dataGet();
    },

    addMarker(point, row) {
      //在地图上添加点
      const iconGreen = icon1;
      const iconGary = icon2;
      const iconRed = icon3;
      const iconOline = new BMap.Icon(iconGreen, new BMap.Size(56, 32)); //显示图标大小 在线
      const iconAline = new BMap.Icon(iconGary, new BMap.Size(56, 32)); //显示图标大小 //离线
      const iconWarn = new BMap.Icon(iconRed, new BMap.Size(100, 90)); //显示图标大小 //警告
      //地图添加点
      let marker = new BMap.Marker(point);

      //定义当前点的标签
      let label = new BMap.Label(`${row.deviceName}/${row.serialNumber}`, {
        offset: new BMap.Size(-10, -25)
      });
      label.setStyle({
        color: "#525552", //字体颜色
        fontSize: "10px", //字体大小
        backgroundColor: "#fff", //文本标注背景颜色
        border: "2px solid #737573",
        borderRadius: "5px",
        borderColor:
          row.status === 0
            ? "#66f06f"
            : row.status === 1
            ? "#d8e1f0"
            : "#f06666"
      });
      //添加标签
      marker.setLabel(label);
      this.map.addOverlay(marker);
      if (row.status === 0) {
        marker.setIcon(iconOline); //在线
      } else if (row.status === 1) {
        marker.setIcon(iconAline); //离线
      } else if (row.status === 2) {
        marker.setIcon(iconWarn); //警告
      }
      marker.addEventListener("click", res => {
        console.log(res)
        this.popContentFun(row);
      });
    },
    //右侧地图
    rigMap: function() {
      // 百度地图API功能
      // 创建Map实例
      this.map = new BMap.Map("rightMap",{enableMapClick:false});
      // 初始化地图,设置中心点坐标和地图级别
      if (this.tableData[0]) {
        this.map.centerAndZoom(
          new BMap.Point(
            this.tableData[0].longitude,
            this.tableData[0].latitude
          ),
          10
        );
      } else {
        this.map.centerAndZoom(
          new BMap.Point(103.95818933678277, 30.565774101394314),
          10
        );
      }
      //自定义地图样式
      // this.map.setMapStyleV2({
      //   styleId: "b6b7251e5a82776f28cad5c468bcb5e4"
      // });
      //添加滚轮缩放
      this.map.enableScrollWheelZoom(true);
      const size = new BMap.Size(10, 20);
      this.tableData.map(v => {
        let point = new BMap.Point(v.longitude, v.latitude);
        this.addMarker(point, v);
      });
    },
    //    点击地图覆盖物出现弹窗
    popContentFun(row) {
      console.log(row)
      this.deviceData = row;
      this.popContentFlag = true;
      let content = this.$refs.popContent;
      let point = new BMap.Point(row.longitude, row.latitude);
      var infoBox = new BMapLib.InfoBox(this.map, content, {
        boxStyle: {
          //设置样式
          background: "#d8e1f0",
          width: "570px",
          height: "200px",
          borderRadius: "7px"
        },
        closeIconDisplay: "none", //控制关闭按钮显示隐藏，默认显示
        // align: INFOBOX_AT_TOP, //infobox显示位置，目前只有上和下
        offset: new BMap.Size(10, 40) //infobox偏移量
      });
      infoBox.enableAutoPan(); //自动偏移
      if (this.lastInfoBox) {
        console.log("弹窗")
        //判断上一个窗体是否存在，若存在则执行close
        this.lastInfoBox.close();
      }
      this.lastInfoBox = infoBox;
      infoBox.open(point);
      $(".BMap_pop>img").hide();
    },
    //关闭弹窗
    closeInfoBox() {
      if (this.lastInfoBox) {
        //判断上一个窗体是否存在，若存在则执行close
        this.lastInfoBox.close();
      }
    }
  },
  mounted: function() {
    let that = this;
    that.dataGet();
  }
};
</script>

<style lang="scss"  scoped="">
.home-container {
  min-width: 1225px;
  position: relative;
}

.custom-class {
  font-size: 20px;
}

.left {
  width: 25%;
  min-height: 60px;
  min-width: 267px;
  height: auto;
  position: absolute;
  top: 0;
  z-index: 99;
  overflow: hidden;
  border-radius: 10px;
  .left-content {
    width: 94%;
    margin: 10px auto;
    padding: 10px 0;
    background-color: #1a2331;
    border-radius: 10px;
    .left-search {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      p {
        text-align: center;
        height: 40px;
        width: 40px;
        line-height: 50px;
        margin-left: 20px;
        i {
          color: #199af5;
        }
      }
    }
    .left-list {
      margin-top: 5px;
    }
    .el-input-group {
      outline: none;
    }

    .filter-item {
      width: 90%;
      display: block;
      margin: 0 auto;
      margin-top: 14px;
    }

    .table-left {
      width: 90%;
      margin: 0 auto;
      ul > li {
        border-radius: 5px;
      }
      /* margin-top 14px */
      .li-border {
        cursor: pointer;
        position: relative;
        padding: 6px;
        background-color: #263853;
        color: #b1bdca;
        box-sizing: border-box;
        line-height: 18px;
        margin-top: 12px;
        padding-left: 15px;
        .device-icon {
          position: absolute;
          right: 0;
          width: 25px;
          height: 24px;
          line-height: 30px;
          text-align: center;
          border-radius: 5px 0 0 5px;
          &.on-line {
            background: #66f06f;
          }
          &.default {
            background: #f06666;
          }
          &.off-line {
            background: #a3a9c1;
          }
        }

        .number-dev {
          display: inline-block;
          width: 184px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: bold;
          font-size: 16px;
          vertical-align: text-top;
          letter-spacing: 2px;
          color: #b2bdcd;
        }

        .normal-font {
          font-size: 14px;
          letter-spacing: 1px;
          color: #b2bdcd;
        }

        .right-arrow {
          position: absolute;
          right: 8px;
          bottom: 10px;
          color: #85cafa;
          font-size: 27px;
        }
      }
      .block {
        margin-top: 16px;
      }
    }
  }
}

.right {
  width: 100%;
  height: auto;
  /* margin-left: 20px; */
  position: relative;
}

.bm-view {
  width: 100%;
  height: 800px;
}

.list p {
  line-height: 30px;
}

.pop-content {
  margin-left: 10px;
  margin-top: 10px;

  .device-icon {
    position: absolute;
    width: 25px;
    height: 24px;
    line-height: 30px;
    text-align: center;
    border-radius: 0 5px 5px 0;
    &.on-line {
      background: #66f06f;
    }
    &.default {
      background: #f06666;
    }
    &.off-line {
      background: #a3a9c1;
    }
  }

  .device-detail-wrapper {
    display: flex;

    .img-wrapper {
      height: 179px;
      width: 261px;
      border: 1px solid #d2d2d2;
      box-sizing: border-box;
      line-height: 162px;
      overflow: hidden;
      margin-right: 10px;
      img {
        height: 179px;
        width: 261px;
      }
    }
    .device-detail {
      line-height: 26px;
      padding: 0 10px;
      .name {
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0px;
        color: #232323;
      }
      .device-num {
        font-size: 16px;
        letter-spacing: 0px;
        color: #232323;
      }
      span {
        font-size: 14px;
      }
      .font-weight {
        font-weight: bold;
      }

      .detailBut {
        font-size: 14px;
        width: 80px;
        margin-top: 10px;
        height: 30px;
        padding: 0;
      }
    }
  }
}
.search{
  position: absolute;
  left: 28px;
  top: 30px;
  z-index: 100;
}
.none1{
  display: noen;
}
.block{

}
 .el-input {
  width: 90%!important;
  margin-right: 10px;
}
@media screen and(-ms-high-contrast:active),(-ms-high-contrast:none){
 
}
</style>
