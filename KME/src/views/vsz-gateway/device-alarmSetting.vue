<template>
  <div>
    <div class="alarmSetting fristBox">
      <div class="alarmSetting-heade">
        <p>网关告警</p>
      </div>
      <div class="alarmSetting-content">
        <p>{{ gatewayDetails.name }}</p>
        <p>{{ gatewayDetails.state }}</p>
        <p>已启用</p>
        <p>{{ gatewayDetails.solutionEntity.solutionName }}</p>
        <a v-btn="{text: '编辑方案'}" style="width:8vh" @click="toSolution(gatewayDetails.solutionEntity.id)">编辑方案</a>
      </div>
    </div>
    <div class="alarmSetting secondBox">
      <div class="alarmSetting-heade">
        <p>设备告警</p>
        <p>
          <el-button v-btn="{text: '新增方案'}" type="primary" size="small" @click="addScheme">新增方案</el-button>
        </p>
      </div>
      <div>
        <table border="1px" width="100%">
          <tr
            style="backgroundColor: #273753;fontWeight:600;fontSize:14px;color:#199af5;height:47px;line-height:47px"
          >
            <td>设备名称</td>
            <td>类型</td>
            <td>告警设置</td>
            <td>解决方案名称</td>
            <td>功能操作</td>
          </tr>
          <tbody>
            <tr
              style="backgroundColor: #161e2c;fontSize:14px;color:#b1bdcd;height:65px;line-height:65px;border-bottom: 1px solid #353f53;"
            >
              <td style="width:250px;">{{ deviceName }}</td>
              <td style="width:250px;">设备锁定</td>
              <td style="width:250px;">已启用</td>
              <td style="width:689px;">
                <el-select v-model="lockId">
                  <el-option
                    v-for="item in lockList"
                    :key="item.id"
                    :label="item.solutionName"
                    :value="item.id"
                  />
                </el-select>
              </td>
              <td style="width:200px">
                <a v-btn="{text: '编辑方案'}" class="btn" @click="toSolution(lockId)">编辑方案</a>
              </td>
            </tr>
            <tr
              style="backgroundColor: #1b2333;fontSize:14px;color:#b1bdcd;height:65px;line-height:65px;border-bottom: 1px solid #353f53;"
            >
              <td>{{ deviceName }}</td>
              <td>设备离线</td>
              <td>已启用</td>
              <td>
                <el-select v-model="offLineId">
                  <el-option
                    v-for="item in offLineList"
                    :key="item.id"
                    :label="item.solutionName"
                    :value="item.id"
                  />
                </el-select>

              </td>
              <td>
                <a v-btn="{text: '编辑方案'}" class="btn" @click="toSolution(offLineId)">编辑方案</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="alarmSetting lastBox">
      <div class="alarmSetting-heade">
        <p>数据点告警</p>
        <p>
          <el-button v-btn="{text: '新增方案'}" type="primary" size="small" @click="addScheme">新增方案</el-button>
        </p>
      </div>
      <div>
        <el-table
          :data="devicePointList"
          :header-cell-style="{backgroundColor: '#273753',fontWeight:600,fontSize:'14px',color:'#199af5'}"
          :row-class-name="tableRowClassName"
          style="width: 100%"
        >
          <el-table-column prop="collectName" align="center" min-width="15%" label="数据点名称" />
          <el-table-column prop="unit" align="center" min-width="5%" label="数据单位" />
          <el-table-column prop="transmissionType" align="center" min-width="5%" label="传输类型" />
          <el-table-column prop="collectType" align="center" min-width="10%" label="存储方式" />
          <el-table-column prop="collectRate" align="center" min-width="5%" label="传输频率" />
          <el-table-column prop="rule" align="center" min-width="10%" label="启用条件">
            <template slot-scope="scope">
              <el-select v-model="scope.row.rule" placeholder="不启用" @change="enableArr($event,scope.row)">
                <el-option
                  v-for="(item,index) in condition"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="10%" label="报警阀值">
            <template slot-scope="scope">
              <div v-if="(scope.row.rule && scope.row.rule !='不启用') ? true : false" style="display:flex">
                <el-input v-model="scope.row.num" style="weight:5%" />
                <template v-if="scope.row.rule=='允许区间'||scope.row.rule=='禁用区间'">
                  <p style="line-height:40px">-</p>
                  <el-input v-model="scope.row.num1" />
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="solutionId" align="center" min-width="30%" label="解决方案名称">
            <template slot-scope="scope">
              <el-select v-model="scope.row.solutionId" style="width: 60%;margin-left: 4px;">
                <el-option
                  v-for="(item,index) in dataAlarmList"
                  :key="index"
                  :label="item.solutionName"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="solutionId" align="center" min-width="10%" label="功能操作">
            <template slot-scope="scope">
              <a v-btn="{text: '编辑方案'}" class="btn" @click="toSolution(scope.row.solutionId)">编辑方案</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom-btn">
      <el-button class="filter-item" type="primary" @click="collection">采集</el-button>
      <el-button class="filter-item" type="danger" @click="resetFilter">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '1',
          type: '设备锁定'
        },
        {
          name: '2',
          type: '设备离线'
        }
      ],
      condition: ['不启用', '大于', '小于', '等于', '允许区间', '禁用区间'],
      page: 1,
      rows: 10,
      gatewayId: '',
      plcId: '',
      plcDetails: {},
      gatewayDetails: {
        name: '',
        state: '',
        solutionEntity: {
          id: '',
          solutionName: ''
        }
      },
      state: '',
      collectRate: '',
      offLineList: [],
      lockList: [],
      dataAlarmList: [],
      devicePointList: [],
      deviceName: '',
      lockId: '',
      offLineId: '',
      enableArrData: [],
      opintArr:[]
    }
  },
  mounted() {
    this.gatewayId = this.$route.query.gatewayId
    this.plcId = this.$route.query.id
    this.getListData()
    this.getPlcDevice()
    this.getSolutionList()
  },
  methods: {
    // 表格头部和隔行换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'single-row'
      } else {
        return 'double-row'
      }
    },
    tableFormatter(row, column, cellValue) {
      if (column.property === 'deviceStatus') {
        return cellValue === 0 ? '在线' : cellValue === 1 ? '离线' : '故障'
      } else if (
        column.property === 'storageMode' ||
        column.property === 'collectType'
      ) {
        return cellValue === 0
          ? '不保存'
          : cellValue === 1
            ? '变化时保存'
            : '实时保存'
      }
    },
    // 获取网关详情
    getListData: function() {
      const that = this
      that.$ajax
        .get($$('/gateway'), { params: { id: that.gatewayId }})
        .then(function(data) {
          that.gatewayDetails = data.data.data
          that.gatewayDetails.state =
            that.gatewayDetails.state == 0
              ? '离线'
              : that.gatewayDetails.state == 1
                ? '在线'
                : '故障'
        })
    },
    // 获取解决方案列表
    getSolutionList() {
      const that = this
      // 设备离线解决方案列表
      that.$ajax
        .get($$('/solution/list'), { params: { alarmType: '2', getPage: 0 }})
        .then(function(data) {
          that.offLineList = data.data.data.list
        })
      // 设备锁定解决方案列表
      that.$ajax
        .get($$('/solution/list'), { params: { alarmType: '1', getPage: 0 }})
        .then(function(data) {
          that.lockList = data.data.data.list
        })
      // 数据点解决方案列表
      that.$ajax
        .get($$('/solution/list'), { params: { alarmType: '3', getPage: 0 }})
        .then(function(data) {
          that.dataAlarmList = data.data.data.list
        })
    },
    // 获取plc详情
    getPlcDevice() {
      const that = this
      that.$ajax
        .get($$('/plc'), { params: { id: that.plcId }})
        .then(function(data) {
          that.plcDetails = data.data.data
          that.getDevice()
          that.getDevicePointList()
        })
    },
    // 获取设备详情
    getDevice: function() {
      const that = this
      that.$ajax
        .get($$('/dev/deploy/detail'), {
          params: { deviceId: that.plcDetails.deviceId }
        })
        .then(function(data) {
          that.deviceName = data.data.data.deviceName
          // 当前设备解决方案
          that.$ajax
            .get($$('/solution/device'), {
              params: { deviceId: that.plcDetails.deviceId }
            })
            .then(function(data) {
              for (let i = 0; i < data.data.data.length; i++) {
                if (data.data.data[i].alarmType == 2) {
                  that.lockId = data.data.data[i].id
                }
                if (data.data.data[i].alarmType == 1) {
                  that.offLineId = data.data.data[i].id
                }
              }
            })
        })
    },
    // 获取设备下的点
    getDevicePointList() {
      const that = this
      that.$ajax
        .get($$('/gateway/points'), {
          params: { deviceId: that.plcDetails.deviceId }
        })
        .then(function(data) {
          const arr = data.data.data
          for (let i = 0; i < arr.length; i++) {
            arr[i] = {
              ...arr[i],
              ...that.common.expressionConversion(arr[i].conditionStatement)
            }
          }
          that.devicePointList = arr
        })
    },
    // 编辑解决方案
    toSolution(id) {
      if (id) {
        this.$router.push({
          path: '/system/system7',
          query: {
            id
          }
        })
      } else {
        this.$message.error('请先选择解决方案')
      }
    },
    // 新增方案
    addScheme() {
      this.$router.push({
        path: '/system/system4'
      })
    },
    // 采集
    collection() {
      const that = this
      const obj = {
        entity: ''
      }
      // const opintArr = []
      const solutionArr = [
        {
          collectPointId: '',
          deviceId: that.plcDetails.deviceId,
          solutionId: that.lockId
        },
        {
          collectPointId: '',
          deviceId: that.plcDetails.deviceId,
          solutionId: that.offLineId
        }
      ]
      for (let i = 0; i < that.devicePointList.length; i++) {
        if (that.devicePointList[i].solutionId) {
          solutionArr.push({
            collectPointId: that.devicePointList[i].id,
            deviceId: that.plcDetails.deviceId,
            solutionId: that.devicePointList[i].solutionId
          })
        }
        if (that.devicePointList[i].rule == '大于') {
          const conditionStatement = 'word > ' + that.devicePointList[i].num
          that.opintArr.push({
            collectPointId: that.devicePointList[i].id,
            conditionStatement,
            dataTemplateId: that.plcDetails.dataTemplateId,
            deviceSerial: that.plcDetails.deviceSerial
          })
        }
        if (that.devicePointList[i].rule == '小于') {
          const conditionStatement = 'word < ' + that.devicePointList[i].num
          that.opintArr.push({
            collectPointId: that.devicePointList[i].id,
            conditionStatement,
            dataTemplateId: that.plcDetails.dataTemplateId,
            deviceSerial: that.plcDetails.deviceSerial
          })
        }
        if (that.devicePointList[i].rule == '等于') {
          const conditionStatement = 'word == ' + that.devicePointList[i].num
          that.opintArr.push({
            collectPointId: that.devicePointList[i].id,
            conditionStatement,
            dataTemplateId: that.plcDetails.dataTemplateId,
            deviceSerial: that.plcDetails.deviceSerial
          })
        }
        if (that.devicePointList[i].rule == '允许区间') {
          const conditionStatement =
            'word > ' +
            that.devicePointList[i].num +
            ' and word < ' +
            that.devicePointList[i].num1
          that.opintArr.push({
            collectPointId: that.devicePointList[i].id,
            conditionStatement,
            dataTemplateId: that.plcDetails.dataTemplateId,
            deviceSerial: that.plcDetails.deviceSerial
          })
        }
        if (that.devicePointList[i].rule == '禁用区间') {
          const conditionStatement =
            'word < ' +
            that.devicePointList[i].num +
            ' and word > ' +
            that.devicePointList[i].num1
          that.opintArr.push({
            collectPointId: that.devicePointList[i].id,
            conditionStatement,
            dataTemplateId: that.plcDetails.dataTemplateId,
            deviceSerial: that.plcDetails.deviceSerial
          })
        }
      }
      const data = new FormData()
      const data1 = new FormData()
      data.append('entity', JSON.stringify(solutionArr))
      data1.append('entity', JSON.stringify(that.opintArr))
      that.$ajax
        .post($$('/solution/bind'), data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(function(data) {
          if (data.status == 200) {
            that.$ajax
              .post($$('/collect/point/trigger/batch'), data1, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
              .then(function(data) {
                if (data.status == 200) {
                  that.$message({
                    message: '保存成功！',
                    type: 'success'
                  })
                  that.resetFilter()
                } else {
                  that.$message.error(data.message)
                }
              })
          }
        })
    },
    // 取消
    resetFilter() {
      this.$router.go(-1)
    },
    enableArr(e, row) {
      if (e == '不启用') {
        const conditionStatement = '""'
        this.opintArr.push({
          collectPointId: row.id,
          conditionStatement,
          dataTemplateId: this.plcDetails.dataTemplateId,
          deviceSerial: this.plcDetails.deviceSerial
        })
      }
      else{
        this.opintArr = this.opintArr.filter(v => {
          return v.collectPointId != row.id;
        })
      }
      console.log(e)
      console.log(this.opintArr)
    }
  }
}
</script>

<style lang="scss" scoped>
.alarmSetting {
  background-color: #1a2331;
  margin-bottom: 10px;
  height: 100px;
  border-radius: 7px;
  padding: 10px 25px;
  font-size: 16px;
  color: #b2becd;
  .alarmSetting-heade {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    p {
      height: 32px;
      line-height: 32px;
    }
    .device-icon {
      display: inline-block;
      width: 25px;
      height: 25px;
      line-height: 30px;
      text-align: center;
      border-radius: 25px;
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
  }
  .alarmSetting-content {
    margin-left: 7%;
    margin-right: 3%;
    display: flex;
    justify-content: space-between;
    a {
      margin-left: 30px;
      color: #199bf4;
      font-size: 14px;
    }
  }
}
.fristBox {
  height: 100px;
  border-radius: 0 0 7px 7px;
}
.secondBox {
  height: 250px;
  .alarmSetting-heade {
    margin-bottom: 10px;
  }
}
.lastBox {
  height: auto;
  .alarmSetting-heade {
    margin-bottom: 10px;
  }
}
.btn {
  color: #199bf4;
  font-size: 14px;
}
table {
  tbody {
    tr:hover {
      background-color: #212e3e !important;
    }
  }

  td {
    text-align: center;
  }
}
.bottom-btn {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
</style>
