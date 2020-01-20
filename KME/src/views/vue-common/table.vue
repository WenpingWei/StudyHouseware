<template>
  <div class="table-content">
    <el-table
      :data="tableList"
      ref="multipleTable"
      @selection-change="changeFun"
      :header-cell-style="tableHeaderColor"
      style="font-size: 14px;background-color:#273753 ;"
      :row-class-name="tableRowClassName"
    >
      <slot name="checkbox"></slot>
      <slot name="detail"></slot>
      <el-table-column
        align="center"
        v-for="{ prop, label } in colConfigs"
        :key="prop"
        :prop="prop"
        :label="label"
        :formatter="tableFormatter"
      ></el-table-column>
      <slot name="alarmType"></slot>
      <slot name="lockstate"></slot>
      <slot name="deviceStatus"></slot>
      <slot name="mark"></slot>
      <slot name="bindNum"></slot>
      <slot name="createTime"></slot>
      <slot name="description"></slot>
      <slot name="operation"></slot>
    </el-table>
    <div class="block" style="margin-top: 10px;margin-left: -5px;">
      <!--<el-button type="primary" plain size="mini">首页</el-button>-->
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        layout="prev, pager, next,jumper,->"
        :total="listTotal"
      ></el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "App",
  data: function() {
    return {
      pageNum: this.currentPage,
      listTotal: this.tableData.total,
      currentPage: this.tableData.pageNum,
      tableList: this.tableData.list
    };
  },
  computed: {},
  props: ["tableData", "colConfigs", "ids"],
  methods: {
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #273753!important;font-weight:600;font-size:14px;color:#199af5;";
      } else if (rowIndex === 1) {
        return "background-color: #273753!important;;font-size:14px;text-align:center";
      } else if (rowIndex === 2) {
        return "background-color: #273753!important;;font-size:14px;text-align:center";
      }
    },
    //表格头部和隔行换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "single-row";
      } else {
        return "double-row";
      }
    },
    handleCurrentChange(num) {
      this.$emit("changeNum", num);
    },
    tableFormatter(row, column, cellValue) {
      if (column.property === "deviceStatus") {
        return cellValue === 0 ? "在线" : cellValue === 1 ? "离线" : "故障";
      } else if (column.property === "status") {
        return cellValue === 0 ? "未激活"  : "已激活";
      }else if (column.property === "pointCount") {
        return cellValue = cellValue+"个";
      } else if (column.property === "transmissionType") {
        return cellValue === 0 ? "R" : cellValue === 1 ? "T" : "Y";
      } else if (column.property === "upload") {
        return cellValue === 0 ? "N" : "Y";
      } else if (column.property === "dayNum") {
        return cellValue === '' ? "---" : cellValue;
      } else if (column.property === "functionCode") {
        return cellValue === 1
          ? "01读线圈状态"
          : cellValue === 2
          ? "02读离散输入状态"
          : cellValue === 3
          ? "03读保持寄存器"
          : cellValue === 4
          ? "04读输入寄存器"
          : cellValue === 5
          ? "05写单个线圈"
          : cellValue === 6
          ? "06写单个保持寄存器"
          : cellValue === 7
          ? "15写单个线圈"
          : "16写单个保持寄存器";
      } else if (column.property === "collectRate") {
        return cellValue === 5
          ? "5S"
          : cellValue === 10
          ? "10S"
          : cellValue == 30
          ? "30S"
          : "60S";
      } else if (column.property === "state") {
        return cellValue === 0 ? "离线" : cellValue === 1 ? "在线" : "告警";
      } else if (column.property === "triggerSwitch") {
        return cellValue === 0 ? "否" : "是";
      } else if (column.property === "dataType") {
        return cellValue === 1 ? "Number" : cellValue === 2 ? "String" : cellValue === 3?"Bool":"Float";
      } else if (column.property === "writePermission") {
        return cellValue === 1 ? "只读" : cellValue === 2 ? "只写" : "读写";
      } else if (column.property === "statusReport") {
        return cellValue === 0 ? "激活" : cellValue === 1 ? "重复告警" : "已结束";
      } else if (column.property === "alarmType") {
        return cellValue === 0
          ? "设备告警 "
          : cellValue === 1
          ? "设备离线"
          : cellValue === 2
          ? "设备锁定"
          : "采集点告警";
      } else if (
        column.property === "storageMode" ||
        column.property === "collectType"
      ) {
        return cellValue === 0
          ? "不保存"
          : cellValue === 1
          ? "变化时保存"
          : "实时保存";
      } else if (column.property === "dataTemplateEntities") {
        let name = [];
        if (cellValue) {
          cellValue.map(v => {
            name.push(v.tplName);
          });
        }
        return name.join(",");
      } else if (
        column.property === "createTime" ||
        column.property === "finishTime" ||
        column.property === "updateTime" ||
        column.property === "value.updateTime"
      ) {
        return this.common.datetimeFormat(cellValue);
      } else if(column.property === "expire") {
         return this.common.dateFormat(cellValue);
      }else{
        return cellValue;

      }
    },
    changeFun(val, event) {
      this.$emit("changeTable", val);
    }
  },
  watch: {
    tableData(val) {
      this.tableList = this.tableData.list;
      this.listTotal = this.tableData.total;
      this.pageSize = this.tableData.size;
      this.pageNum = this.tableData.pageNum;
      this.currentPage = this.tableData.pageNum;
    },
    ids() {
      this.$refs.multipleTable.clearSelection();
    }
  },
  components: {},
  mounted: function() {
    if (this.tableList) {
      this.tableList.map(v => {
        if (this.ids) {
          this.ids.map(s => {
            if (s === v.id) {
              this.$refs.multipleTable.toggleRowSelection(v, true);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss"  scoped>
.table-content {
  width: 98%;
  margin: 0 auto;
  .cell {
    color: #199af5;
    font-weight: bold;
    font-size: 14px;
  }
  .el-pagination {
    text-align: center;
  }
}
</style>
