<!--数据点列表-->
<template>
  <div class="detail-bot data-dot">
    <h3 class="title">数据点</h3>
    <div class="table-contain-dot">
      <div class="detail-bar">
        <el-button type="primary" @click="dataGet()">数据刷新</el-button>
        <div>
          <el-input
            v-model="input"
            placeholder="请输入数据点名"
            clearable
            style="width: 350px;margin-left: 200px;"
          ></el-input>
          <el-button @click="dataGet()" type="primary">搜索</el-button>
        </div>
      </div>
      <vs-table @changeTable="handleSelectId"
                :tableData="tableData"
                v-if="tableData.list"
                :colConfigs="colConfigs"
                @changeNum="handleNum">
        <el-table-column slot="operation" label="操作">
          <template slot-scope="scope">
            <el-button  v-if="scope.row.dataType === 1"
              size="mini"
              type="primary" @click="handleDelete(scope.row.collectName,scope.row.dataTemplateId)">历史数据</el-button>
          </template>
        </el-table-column>
      </vs-table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'App',
  data: function () {
    this.colConfigs = [
      { prop: 'pointName', label: '数据点名'},
      { prop: 'tplName', label: '数据模板'},
      { prop: 'value.updateTime', label: '刷新时间'},
      { prop: 'value.pvalue', label: '当前数值'}
    ];
    return {
      checkBoxData: [],
      timer: "",
      page: 1,
      tableData: [],
      input: "",
    }
  },
  methods: {
    //
    handleSelectId (val) {
      this.checkBoxData = val
    },
    //    分页
    handleNum (num) {
      this.page = num;
      this.dataGet();
    },
    //设备的数据点表格 搜索、分页共用
    dataGet: function(pages) {
      let that = this;
      let keywords = that.input;
      let id = this.common.urlGet().detailID;
      let page = this.page || 1;
      let keyPoint = 1;
      let data = {
        id,
        page,
        keywords,
        keyPoint
      };
      this.common.getTableList(this, '/monitor/data', data, res => {
        this.tableData = res
         this.timer = setTimeout(() => {
          this.dataGet();
        }, 15000);
      });
    },
    //历史数据 
    handleDelete(collectName,dataTemplateId) {
      let devid = this.common.urlGet(["id"]).detailID;
      let deviceTemplateId = this.common.urlGet(["id"]).deviceTemplateId;
      this.$router.push(
        `/system/history?id=${devid}&collectName=${collectName}&templateId=${deviceTemplateId}&dataTemplateId=${dataTemplateId}` 
      );
    },
  },
  components: {},
  mounted: function () {
    this.dataGet();
  },
  created() {
    //定时器：定时刷新
    this.timer = setTimeout(() => {
      this.dataGet();
    }, 15000);
  },
  beforeDestroy() {
    //在vue实例销毁前，清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .detail-bot {
    margin-top 25px;
    background: white;
    padding-bottom: 20px;
    .table-contain-dot {
      width 98%
      margin 5px auto
      .detail-bar {
        display flex
        justify-content space-between
      }
      .table-content {
        width 100%
        margin-top 10px
      }
    }

  }
</style>
