<template>
  <div class="device-detail-contain">
    <div class="device-msg">
      <deviceDetail v-if="alarmDetailObj" :detail-obj="alarmDetailObj" />
    </div>
    <!--    <div class="control">
      <div class="control-one">
        <h1>远程控制</h1>
        <div>设备到期时间: <span class="color-blue">{{common.dateFormat(alarmDetailObj.expire)}}</span></div>
        <div>当前剩余天数: <span class="color-blue">{{alarmDetailObj.dayNum}}天</span>(已经自动提示)</div>
      </div>
      <div class="line" />
      <div class="control-two">
        <button @click="dialogVisible = true" v-btn="{text: '设备解锁'}">预约远程解锁</button>
        <div>正在下发</div>
        <div>锁定时间：{{common.dateFormat(alarmDetailObj.expire)}}</div>
      </div>
      <div class="control-icon-common">
        <div class="img-wrapper">1</div>
        <div>设置锁定时间</div>
        <div>{{common.dateFormat(alarmDetailObj.expire)}}</div>
      </div>
      <div class="line-ver" />
      <div class="control-icon-common">
        <div class="img-wrapper">2</div>
        <div>预约解锁</div>
      </div>
      <div class="line-ver" />
      <div class="control-icon-common">
        <div class="img-wrapper">3</div>
        <div>等待下发</div>
      </div>
      <div class="line-ver" />
      <div class="control-icon-common">
        <div class="img-wrapper">4</div>
        <div>完成解锁</div>
        <div>{{unLock.finishTime}}</div>
      </div>
    </div> -->
    <div class="table-wrapper">
      <h1><span>数据点</span>
        <el-button type="primary" size="mini" @click="saveDown(multipleSelection)">下发</el-button>
      </h1>
      <vs-table v-if="tableData" :table-data="tableData" :col-configs="colConfigs" @changeNum="handleNum" @changeTable="getSelect">
        <el-table-column slot="checkbox" align="center" type="selection" width="55" />
        <el-table-column slot="bindNum" align="center" label="当前数值">
          <template slot-scope="scope">
            <el-select v-model="scope.row.value.pvalue" placeholder="请选择" :disabled="!scope.row.upload"  v-if="scope.row.dataType == 3">
              <el-option label="true" value="1"></el-option>
              <el-option label="false" value="0"></el-option>
             </el-select>
            <el-input v-model="scope.row.value.pvalue" :disabled="!scope.row.upload"  @focus="openDialog(scope.row)" v-else/>
            </template>
        </el-table-column>
        <el-table-column slot="description" align="center" label="历史数据">
          <template slot-scope="scope">
            <span v-if="scope.row.collectType !== 0" v-btn="{text: '历史数据'}" class="color-blue cursor" @click="historyDetail(scope.row)">历史数据</span>
          </template>
        </el-table-column>
<!--        <el-table-column slot="operation" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="saveDown(scope.row)">下发</el-button>
          </template>
        </el-table-column> -->
      </vs-table>
    </div>
<!--       <el-dialog width="439px" class="dialog-device" title="预约远程解锁" :visible.sync="dialogVisible" :before-close="handleClose">
      <div class="mg-b-20">请设定解锁后的到期时间</div>
      <el-date-picker
        v-model="timeValue"
        style="width: 50%;color:#000000"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        @change="dateChangebirthday"
      />
      <div class="div-msg">由于设备受用户使用影响,下发可能会有延迟。
        预约远程解锁后将无法取消,是否确定预约解锁</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureLock">确 定</el-button>
        <el-button type="danger" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog> -->
<el-dialog
  title="当前数值修改"
  :visible.sync="dialogVisible"
  width="25%">
 <el-input v-model="downData.value.pvalue" class="dialog_input"></el-input>
  <span slot="footer" class="dialog-footer" style="display: flex;justify-content: flex-end;">
    <el-button @click="dialogVisible = false">确 定</el-button>
    <el-button type="primary" @click="saveDown(downData)">下 发</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
  import deviceDetail from '@/views/vue-common/deviceDetail'
  export default {
    name: 'AlarmDetail',
    components: {
      deviceDetail
    },
    data() {
      this.colConfigs = [{
          prop: 'collectName',
          label: '数据点名称'
        },
        {
          prop: 'collectType',
          label: '存储方式'
        },
        {
          prop: 'dataTemplateName',
          label: '数据模板'
        },
        // { prop: 'value.pvalue', label: '当前数值' },
        {
          prop: 'unit',
          label: '数据单位'
        },
        {
          prop: 'updateTime',
          label: '刷新时间'
        }
        // { prop: "updateTime", label: "结束时间" }
        // { prop: "updateTime", label: "时间" },
        // { prop: "mark", label: "告警详情" }
      ]
      return {
        alarmDetailObj: {},
        tableData: [],
        page: 1,
        rows: 10,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        },
        timeValue: '',
        dialogVisible: false,
        unLock: {
          lockTime: '',
          finishTime: ''
        },
          'host': '192.168.30.250', // modbusAddress
          'port': '503',
          'device_type': 1,
          'expire': 'Dec 20, 2019 12:00:00 AM',
          'deviceId': '8218D7091FF34A5F7924B454BFEC0B2C', // id
          'point': [{
            'readAddr': 80.0, // adress
            'readAddrType': 'bool', // 写入数据的类型 dataType
            'funCode': 3, // functionCode
            'value': true // 如果是 bool值 就是true，如果是数字类型就是具体的值value.pvalue
          }],
        multipleSelection: [], //下发多选
        downData:{
          address:'',
          dataType:'',
          functionCode:'',
          value:{
            pvalue:''
          },
        },
        timer:''
      }
    },

    computed: {},
    mounted() {
      this.alarmDetail()
      this.RunInterval();
    },
    beforeDestroy() {
     this.StopInterval();
    },
    methods: {
      RunInterval(){
       this.timer = setInterval(() => {
         this.alarmDetail();
       },3000)
      },
      StopInterval(){
       clearInterval(this.timer);

       this.timer = null;
       console.log(this.timer);
      },
      dateChangebirthday(val) {
        this.timeValue = val
      },
      alarmDetail() {
        this.$ajax({
          url: $$('/dev/deploy/detail'),
          method: 'get',
          params: {
            deviceId: this.$router.history.current.query.deviceId
          }
        }).then(res => {
          if (res.data.status === 200) {
            console.log(res.data);
            this.alarmDetailObj = res.data.data;
            // plc下发内容
            this.host = res.data.data.plcInfoEntity.ipAddress;
            this.port = res.data.data.plcInfoEntity.port;
            this.device_type = res.data.data.plcInfoEntity.deviceType;
            this.expire = res.data.data.plcInfoEntity.expire;
            this.deviceId = res.data.data.id;
            if (res.data.data.dayNum != 0) {
              this.unLock.lockTime = this.common.datetimeFormat(res.data.data.expire)
            }
            // this.unLock = res.data.data.plcInfoEntity
            if (this.alarmDetailObj.id) {
              this.dataGet()
            }
          }
        })
      },
      dataGet: function() {
        const data = {
          page: this.page,
          rows: this.rows,
          getPage: 1,
          alarmType: this.select,
          keywords: this.keywords,
          id: this.alarmDetailObj.id,
          type: 0
          // name: this.listQuery.title
        }
        this.common.getTableList(this, '/monitor/data', data, res => {
          this.tableData = res
          // this.checkBoxData.length = 0;
        })
      },
      handleNum(val) {
        this.page = val
        this.dataGet()
      },
      historyDetail(row) {
        this.$router.push({
          path: '/equipmentManage/menu9',
          query: {
            deviceId: this.$router.history.current.query.deviceId,
            pointId: row.id
          }
        })
      },
      handleClose() {
        this.dialogVisible = false
      },
     openDialog(item) {
     this.dialogVisible = true;
     this.downData = JSON.parse(JSON.stringify(item));
     clearInterval(this.timer);

     this.timer = null;
     },
      saveDown(row) { //下发
        if (this.alarmDetailObj.status !== 0) {
          this.$message({
            message: '当前设备不在线,无法下发',
            type: 'warning'
          });
          return false
        }
        if(Array.isArray(row) && this.multipleSelection.length == 0){
         this.$message({
           message: '请选择',
           type: 'warning'
         });
         return false
        }
        let arr = Array.isArray(row) ? row : new Array(row);
        const points = arr.map(el => {
          return {
            readAddr: el.address,
            readAddrType: el.dataType,
            funCode: el.functionCode,
            value: el.value.pvalue,
          }
        })
        this.point = points;
        this.$ajax({
          url:$$('/gateway/update/point/mqtt1'),
          method:'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          data:{
            "host" : this.host,
            "port" : this.port,
            "device_type": this.device_type,
            "expire" : this.expire,
            "deviceId" : this.deviceId,
            "point":this.point
          },
          }).then(res => {
            this.RunInterval();
          this.$message({
            message: res.data.message,
            type: 'info'
          });
          })
      },
      getSelect(arr) {
        this.multipleSelection = arr;
      },
      sureLock() { // 预约解锁
        if (this.timeValue == '') {
          this.$message({
            showClose: true,
            message: '请选择时间'
          })
        } else {
          this.$ajax({
            url: $$('/gateway/unlock/mqtt'),
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              deviceId: this.$router.history.current.query.deviceId,
              date: this.timeValue,
              createorId: '111'
            },
            transformRequest: [res => {
              res = this.qs.stringify(res)
              return res
            }]
          }).then(res => {
            if (res.data.status === 200) {
              this.$message({
                showClose: true,
                message: '预约解锁成功',
                type: 'success'
              })
              this.unLock.lockTime = this.timeValue
              this.dialogVisible = false
              this.alarmDetail()
            } else {
              if (res.data.message == '') {

              } else {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'error'
                })
              }
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .device-detail-contain {
    .dialog-device {
      .el-dialog {
        background: #d8e1f0;
      }

      .el-date-editor.el-input {
        width: 341px;
        font-size: 16px;

        .el-input__inner {
          background: #c3ccd9 !important;
          color: #10141b !important;
        }

        ::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #10141b;
          font-size: 16px;
        }

      }

      .el-input__prefix,
      .el-input__suffix {
        color: #10141b
      }
    }
  }
</style>
<style lang="scss" scoped>
  /deep/ .dialog_input {
    .el-input__inner {
      border: 1px solid #dcdfe6 !important;
      background:white !important;
      color: #10141b !important;
    }
    .el-input__inner:focus {
        outline: none;
        border-color: #409eff !important;
    }
  }
  .device-detail-contain {
    // width: 97%;
    /*background: #1b2333;*/
    // border-radius: 10px;
    /*height: 300px;*/
    // margin: 20px 1.5% 20px 1.2%;
    padding-bottom: 20px;

    .dialog-device {
      text-align: center;
      color: #10141b;
      font-size: 14px;

      /*>>>.el-dialog {*/
      /*background: #d8e1f0;*/
      /*}*/
      /*>>>.el-date-editor.el-input {*/
      /*width: 341px;*/
      /*.el-input__inner {*/
      /*background: #c3ccd9;*/
      /*}*/
      /*}*/
      .div-msg {
        width: 338px;
        line-height: 30px;
        color: #10141b;
        font-size: 14px;
        margin: 20px auto;
      }

      .mg-b-20 {
        margin-bottom: 20px;
      }
    }

    >>>.el-dialog__body {
      text-align: center;
    }

    .device-msg {
      width: 100%;
      background: #1b2333;
      border-radius: 0 0 10px 10px;
      margin-top: -10px;
    }

    .control {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 10px;
      font-size: 14px;
      color: white;
      line-height: 40px;
      letter-spacing: 2px;
      background: #1b2333;
      border-radius: 10px;
      padding: 10px 20px 20px 20px;

      .control-one {
        .title {}
      }

      .line {
        height: 109px;
        width: 2px;
        border-left: 1px dashed #199af5;
      }

      .control-two {
        text-align: center;

        button {
          width: 127px;
          height: 27px;
          background: #b2bdcd;
          border-radius: 5px;
          font-size: 14px;
          color: #121926;
          line-height: 25px;
          border: none;
          outline: none;
          cursor: pointer;

          &:hover {
            background: #199af5;
            color: #fff;
          }
        }

        div {
          &:nth-of-type(1) {
            transform: translate(0, 12px);
          }
        }
      }

      .control-icon-common {
        text-align: center;

        .img-wrapper {
          width: 28px;
          height: 31px;
          line-height: 31px;
          text-align: center;
          color: #fff;
          margin: 0 auto;
          background: url('../../assets/images/common/ty.png');
        }

        div {
          &:nth-of-type(3) {
            width: 99px;
            line-height: 20px;
          }
        }
      }

      .line-ver {
        width: 110px;
        height: 2px;
        border-bottom: 1px dashed #199af5;
      }

      .trs-y-19 {
        transform: translate(0, -19px);
      }
    }

    .table-wrapper {
      background: #1b2333;
      border-radius: 10px;
      padding: 10px 20px 20px 20px;
      margin-top: 10px;

      h1 {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
      }

      .table-content {
        width: 100%;
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
  }

  input:-moz-placeholder,
  input::-moz-placeholder {
    opacity: 1 !important;
  }
</style>
