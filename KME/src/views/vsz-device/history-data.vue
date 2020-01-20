<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="home-container">
    <!--<h1>历史数据</h1>-->
    <div class="home-content">
      <div class="page-top-contain height-400">
        <div class="page-left-content">
          <h2 class="title">历史数据</h2>
          <div class="dis-flex mg-t-10">
            <section class="device-name">
              <div style="margin:0;" class="mg-l-20">设备名称：{{ devList.deviceName }}</div>
              <div   class="mg-l-15">设备编号：{{ devList.serialNumber }}</div>
            </section>
            <section class="mg-l-5 device-time">
              <el-select
                slot="prepend"
                v-model="timeSelect"
                placeholder="时间范围选择"
                @change="setValue(dataCon)"
              >
                <el-option label="当天" value="0" />
                <el-option label="近三天" value="1" />
                <el-option label="近五天" value="2" />
                <el-option label="近一周" value="3" />
              </el-select>
              <el-select
                v-model="dataCon"
                placeholder="请选择数据点"
                multiple
                collapse-tags
                :multiple-limit="5"
                class="filter-item mg-l-10"
                @change="setValue"
              >
                <el-option
                  v-for="item in pointLabel"
                  :key="item.id"
                  :label="item.collectName"
                  :value="item.id"
                />
              </el-select>
            </section>
          </div>
          <div id="lineChart" style="height: 322px;width: 98%;margin-top: 20px;" />
        </div>
        <div class="page-right-content">
          <h2 class="title">选择设备</h2>
          <div class="search-contain mg-t-10">
            <el-input v-model="input" placeholder="请输入设备名称">
              <template slot="append">
                <el-button type="primary" class="search" @click="deviceTableInt()">搜索</el-button>
              </template>
            </el-input>
          </div>
          <ul v-if="this.tableData.length!=0" class="device-menu">
            <li class="header">
              <div>设备名称</div>
              <div style="width:80px;text-align: center;">历史数据</div>
            </li>
            <li v-for="item in tableData" :key="item.id" class="dis-flex">
              <div>{{ item.deviceName }}</div>
              <div>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleDetail(item.id,)"
                >历史数据</el-button>
              </div>
            </li>
          </ul>
          <ul v-else class="device-menu1">
            <li>暂无数据</li>
          </ul>
          <div class="pa-b-30">
            <el-pagination
              background
              :page-size="4"
              :current-page.sync="page"
              layout="prev, pager, next, jumper"
              :total="listTotal"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
      <div class="page-bottom-contain">
        <div class="page-left-content default-height"  >
          <template v-if="tableTabChange.length !== 0">
            <el-tabs type="border-card">
              <el-tab-pane v-for="item in tableTabChange" :key="item.id" :label="item.name">
                <ul>
                  <li class="title-head">
                    <span class="span-width">{{item.name}}</span>
                    <span class="span-width">更新时间</span>
                  </li>
                  <li v-for="(its, index) in pageWeb(item.list)" :key="index">
                    <span class="span-width">{{ its.value }}</span>
                    <span class="span-width">{{ its.createTime }}</span>
                  </li>
                </ul>
                <el-pagination
                  background
                  :page-size="6"
                  layout="prev, pager, next"
                  :total="item.list.length"
                  @current-change="handlePage($event, item.list)"
                />
              </el-tab-pane>
            </el-tabs>
          </template>
          <template v-if="tableTabChange.length === 0">
            <p class="default-font">请选择数据点哦！</p>
          </template>
        </div>
        <div class="page-right-content">
          <h2 class="title">设备地址</h2>
          <div id="mapShow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { constants } from 'crypto'
// options components
export default {
  data() {
    return {
      timer:'',
      listTotal: 1,
      tableData: [],
      devList: '',
      dataOpionCon: '',
      dataCon: [],
      timeSelect: '0',
      tableTabChange: [],
      tabSeres: {},
      dataTemplate: [],
      dataMoudle: [],
      pointLabel: [],
      xDate: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      input: '',
      page: 1,
      pageStatus: 1,
      rows: "",
      getPage:0,
      line: '',
      serialNumber: '',
      nameLegend: [],
      series: {},
      seriesArr: [],
      tablePageWeb: [],
      currentPage: 1,
      startEndTime: ['2019-05-01', '2019-05-31']
      //      pointId: ''
    }
  },
  computed: {},
  created() {
    // this.fetchData()
  },
  mounted: function() {
    const that = this

    const templateId = that.$route.query.templateId
    const dataTemplateId = that.$route.query.dataTemplateId
    that.selectInit(templateId)
    if (dataTemplateId) {
      that.dataOpionCon = dataTemplateId
    }
    // that.selectPoint(dataTemplateId);

    that.devNow()
    this.line = this.$echarts.init(document.getElementById('lineChart'))
    that.lineShow(this.line)
    that.deviceTableInt()
    window.onresize = res => {
      this.line.resize()
    }
    this.timer = setInterval(() => {
      this.setValue(this.dataCon)
    },3000)
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    // 历史数据
    handleDetail(id) {
      this.$router.push(
        `/equipmentManage/menu19?deviceId=${id}`
      )
    },
    //    选择设备 设备列表
    deviceTableInt() {
      const data = {
        page: this.page,
        rows: 4,
        type: 1,
        keywords: this.input,
        excludedLocation:1,
      }
      this.common.getTableList(this, '/dev/deploy/list', data, res => {
        this.tableData = res.list
        this.listTotal = res.total
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.deviceTableInt()
    },
    // 设备位置地图
    mapShow: function() {
      const that = this
      // 百度地图API功能
      var map = new BMap.Map('mapShow',{enableMapClick:false}) // 创建Map实例
      map.centerAndZoom(
        new BMap.Point(that.devList.longitude, that.devList.latitude),
        12
      ) // 初始化地图,设置中心点坐标和地图级别
      // map.setMapStyleV2({
      //   styleId: 'b6b7251e5a82776f28cad5c468bcb5e4'
      // })
      // 添加地图类型控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      )
      var p1 = new BMap.Point(that.devList.longitude, that.devList.latitude)
      var marker = new BMap.Marker(p1) // 创建标注
      map.addOverlay(marker) // 将标注添加到地图中
      map.enableScrollWheelZoom(true) // 添加滚轮缩放
    },
    // 当前设备数据
    // devNow: function() {
    //   let that = this;
    //   var devDti = that.common.urlGet().id;
    //   $.ajax({
    //     url: $$("/dev/deploy/detail"),
    //     type: "get",
    //     data: {
    //       deviceId: devDti
    //     },
    //     dataType: "json",
    //     contentType: "application/json;charset-UTF-8",
    //     success: function(data) {
    //       that.devList = data.data;
    //       that.mapShow();
    //       that.serialNumber = that.devList.serialNumber;
    //       // that.selectInit(that.serialNumber);
    //     },
    //     error: function(err) {}
    //   });
    // },

    devNow() {
      this.$ajax({
        url: $$('/dev/deploy/detail'),
        method: 'get',
        params: {
          deviceId: this.$router.history.current.query.deviceId
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.devList = res.data.data
          this.mapShow()
          this.serialNumber = this.devList.serialNumber
          this.pointData()
        }
      })
    },
    // 当前数据点数据
    pointData: function() {
      const data = {
        page: this.page,
        rows: this.rows,
        getPage:this.getPage,
        id: this.$router.history.current.query.deviceId
        // getPage: 1,
        // alarmType: this.select,
        // keywords: this.keywords,
        // id: this.alarmDetailObj.id,
        // type: 0
        // name: this.listQuery.title
      }
      this.common.getTableList(this, '/monitor/data', data, res => {
        this.pointLabel = res
        this.dataCon = [this.$router.history.current.query.pointId]
        this.setValue(this.dataCon)
        // this.checkBoxData.length = 0;
      })
    },
    changeLabel(name) {
      // console.log(name)
      // console.log(this.pointLabel)
      const a = this.pointLabel.filter(v => {
        // console.log(v);
        return v.id === name
      })

      // console.log(a);
      return a[0].collectName
    },
    // 数据模板下拉框改变事件
    setTemplateValue: function(val) {
      this.selectPoint(val)
    },
    // 数据点下拉框改变事件
    setValue: function(val) {
      console.log(val);
      if (val.length > 5) {
        this.$message({
          message: '最多选择5条哦',
          showClose: true,
          type: 'error'
        })
        return false
      }
      this.nameLegend = val

      this.$ajax
        .post($$('/monitor/history'), {
          points: val,
          dateRange: this.timeSelect,
          serialNumber: this.serialNumber
        })
        .then(res => {
          if (res.data.status === 200) {
            this.series = {}
            this.seriesArr.length = 0
            this.tableTabChange.length = 0
            this.tabSeres = {}
            this.xDate.length = []

            if (this.nameLegend.length !== 0) {
              this.nameLegend.map(v => {
                this.series[v] = {
                  name: this.changeLabel(v),
                  type: 'line',
                  // symbolSize: 8,
                  hoverAnimation: false,
                  data: []
                }
                this.tabSeres[v] = {
                  name: this.changeLabel(v),
                  list: []
                }
                res.data.data[v].map(s => {
                  this.series[v].data.push(s.value)
                  this.tabSeres[v].list.push(s)
                  s.createTime = this.common.datetimeFormat(s.createTime)
                  this.xDate.push(s.createTime)
                })
                if (Object.keys(this.series[v]).length !== 0) {
                  this.seriesArr.push(this.series[v])
                  this.tableTabChange.push(this.tabSeres[v])
                }
              })
            } else {
              this.seriesArr = []
              this.tableTabChange = []
            }
            this.lineShow(this.line)
          }
        })
    },
    // 折线图
    lineShow: function(id) {
      const that = this
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#199af5', '#ffff00', '#00ffff', '#f06666', '#ed8153'],
        legend: {
          itemWidth: 10,
          itemHeight: 2,
          // icon: 'circle',
          right: 10,
          top: -3,
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        grid: [
          {
            top: 30,
            left: 50,
            right: 30,
            bottom: 80,
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#25334d'
              }
            },
            data: that.xDate,
            axisLabel: {
              color: '#b1bdcd',
              fontSize: 14
            }
          }
        ],
        yAxis: [
          {
            name: '',
            type: 'value',
            axisLabel: {
              color: '#b1bdcd',
              fontSize: 14
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#283143'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#25334d'
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 0,
            end: 40,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#d3dee5',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: {
              color: '#000'
            },
            borderColor: '#90979c'
          }
        ],
        series: that.seriesArr
      }
      id.setOption(option, true)
    },
    // 数据模板下拉框
    selectInit(id) {
      const data = {
        id
      }
      this.common.getList(this, '/dev/template', data, res => {
        // this.dataTemplate = res.dataTemplateEntities;
      })
    },
    // 数据点下拉框
    async selectPoint(id) {
      const pid = this.$route.query.collectName
      const data = {
        id
      }
      try {
        const res = await this.$ajax.get($$('/data/template/pointList'), {
          params: data
        })
        this.dataMoudle = ''
        this.dataMoudle = res.data.data
        if (pid) {
          this.dataCon.push(pid)
          this.setValue(this.dataCon)
        }
      } catch (err) {
        console.log(err)
      }
    },
    //    前端分页
    pageWeb(arr) {
      return arr.slice((this.currentPage - 1) * 6, this.currentPage * 6)
    },
    handlePage(num, list) {
      this.currentPage = num
      this.pageWeb(list)
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-container {
    width: 97%;
    /*background: #1b2333;*/
    border-radius: 10px;
    /*height: 300px;*/
    margin: 20px 1.5% 20px 1.2%;
    padding-bottom: 20px;
  }
  .home-content {
    background: none;
    .filter-item {
      width: 300px;
    }
    .title {
      display: inline-block;
      padding: 10px 32px;
      letter-spacing: 1px;
      background: #199af5;
      color: #fff;
      font-size: 14px;
      border-radius: 10px 0 0 0;
    }
    .dis-flex {
      display: flex;
      justify-content: space-between;
    }
    .page-top-contain, .page-bottom-contain {
      display: flex;
      justify-content: space-between;
      >>>.el-tabs--border-card>.el-tabs__header {
        background: #273753;
      }
      .page-left-content {
        width: 69%;
        height: 100%;
        background: #1b2333;
        border-radius: 10px;
        .device-name {
          font-size: 14px;
          color: #b1bdcd;
        }
        .el-pagination {
          margin-top: 20px;
        }
        .title-head {
          background: rgb(27, 47, 71) !important;
          font-weight: 600;
          font-size: 14px;
          color: rgb(25, 154, 245);
          /*color: #b1bdcd;*/
        }
        li {
          color: #b1bdcd;
        }
        li:nth-of-type(even) {
          background: #161e2c;
        }

        li:nth-of-type(odd) {
          background: #1b2333;
        }

        .span-width {
          display: inline-block;
          width: 49%;
          text-align: center;
          height: 44px;
          line-height: 44px;
          font-size: 14px;
        }

        .dis-flex {
          width: 98%;
          margin: 13px auto;
        }

        >>>.table-content {
          margin-top: 10px;
          padding-bottom: 15px;
        }
      }

      .page-right-content {
        width: 30%;
        height: 100%;
        background: #1b2333;
        min-height: 428px;
        border-radius: 10px;
        .search-contain {
          /*float: right;*/
          float: right;
          height: 45px;
          overflow: hidden;
          width: 96%;
          margin: 15px auto;
          .el-input {
            width: 95%;
          }
          .search {
            background: #1890ff;
            color: white;
            border-radius: 0 5px 5px 0;
          }
        }
        .device-menu {
          overflow: hidden;
          width: 92%;
          margin: 20px auto;
          .header {
            display: flex;
            justify-content: space-between;
            color: #199af5;
            font-size: 14px;
          }
          li {
            height: 45px;
            border: 1px solid #293244;
            border-top: none;
            box-sizing: border-box;
            line-height: 32px;
            font-size: 14px;
            color: #b1bdcd;

            div:nth-of-type(1) {
              margin-left: 10px;
            }

            div:nth-of-type(2) {
              margin-right: 10px;
            }
          }

          li:nth-of-type(1) {
            border-top: 1px solid #293244;
          }
        }

        .device-menu1 {
          overflow: hidden;
          width: 92%;
          margin: 20px auto;

          li {
            height: 45px;
            line-height: 32px;
            font-size: 14px;
            text-align: center;
          }
        }

        #mapShow {
          height: 460px;
          width: 98%;
          margin: 5px auto;
        }
      }

      .default-height {
        height: 510px;
        background: #1b2333;
      }
    }

    .page-bottom-contain {
      margin-top: 30px;
    }

    .height-400 {
      /* height: 435px; */
    }

    .default-font {
      margin: 10px;
      font-size: 14px;
    }

    section {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      font-size: 14px;

      > div {
        vertical-align: middle;
        line-height: 34px;
      }

      /* margin-left: 20px; */
    }

    .device-name {
      width: 51%;
    }

    .device-time {
      /*width: 60%;*/

      .el-input {
        width: 188px;
      }

      >>>.el-range-input {
        margin-left: 5px;
      }
    }
  }
  .pa-b-30{
    width: 92% ;
    word-wrap:break-word ;
    white-space:normal
  }
</style>
