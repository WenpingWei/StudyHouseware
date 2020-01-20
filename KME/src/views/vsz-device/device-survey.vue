<template>
  <div class="tabContent">
    <el-tabs style="background:black;" type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        label="设备详情"
        v-if="this.common.tabRender(this,'设备详情')"
        name="first"
        :key="'first'"
      >
        <tab1 v-if="isChildUpdate1"></tab1>
      </el-tab-pane>

      <el-tab-pane
        label="告警记录"
        v-if="this.common.tabRender(this,'告警记录')"
        name="second"
        :key="'second'"
      >
        <tab2 v-if="isChildUpdate2"></tab2>
      </el-tab-pane>

      <el-tab-pane
        label="历史轨迹"
        v-if="this.common.tabRender(this,'历史轨迹')"
        name="third"
        :key="'third'"
      >
        <tab3 v-if="isChildUpdate3"></tab3>
      </el-tab-pane>

      <el-tab-pane
        label="文件管理"
        v-if="this.common.tabRender(this,'文件管理')"
        name="fourth"
        :key="'fourth'"
      >
        <tab4 v-if="isChildUpdate4"></tab4>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import deviceDetail from "@/views/vsz-device/device-detail";
import alarmRecords from "@/views/vsz-device/alarm-records";
import historyLocus from "@/views/vsz-device/history-locus";
import fileManagement from "@/views/vsz-device/file-management";

export default {
  components: {
    tab1: deviceDetail,
    tab2: alarmRecords,
    tab3: historyLocus,
    tab4: fileManagement
  },
  data() {
    return {
      //默认第一个选项卡
      activeName: "first",
      isChildUpdate1: true,
      isChildUpdate2: false,
      isChildUpdate3: false,
      isChildUpdate4: false
    };
  },
  mounted() {
    let tab;
    if (this.Cookies.get("tabPage")) {
      tab = parseInt(this.Cookies.get("tabPage"));
    } else {
      tab = this.$route.query.tab;
    }

    if (tab === 1) {
      this.activeName = "first";
      this.isChildUpdate1 = true;
      this.isChildUpdate2 = false;
      this.isChildUpdate3 = false;
      this.isChildUpdate4 = false;
    } else if (tab === 2) {
      this.activeName = "second";
      this.isChildUpdate1 = false;
      this.isChildUpdate2 = true;
      this.isChildUpdate3 = false;
      this.isChildUpdate4 = false;
    } else if (tab === 3) {
      this.activeName = "third";
      this.isChildUpdate1 = false;
      this.isChildUpdate2 = false;
      this.isChildUpdate3 = true;
      this.isChildUpdate4 = false;
    } else if (tab === 4) {
      this.activeName = "fourth";
      this.isChildUpdate1 = false;
      this.isChildUpdate2 = false;
      this.isChildUpdate3 = false;
      this.isChildUpdate4 = true;
    }
  },
  methods: {
    handleClick(tab) {
      if (tab.name == "first") {
        this.isChildUpdate1 = true;
        this.isChildUpdate2 = false;
        this.isChildUpdate3 = false;
        this.isChildUpdate4 = false;
        this.Cookies.set("tabPage", 1);
      } else if (tab.name == "second") {
        this.isChildUpdate1 = false;
        this.isChildUpdate2 = true;
        this.isChildUpdate3 = false;
        this.isChildUpdate4 = false;
        this.Cookies.set("tabPage", 2);
      } else if (tab.name == "third") {
        this.isChildUpdate1 = false;
        this.isChildUpdate2 = false;
        this.isChildUpdate3 = true;
        this.isChildUpdate4 = false;
        this.Cookies.set("tabPage", 3);
      } else if (tab.name == "fourth") {
        this.isChildUpdate1 = false;
        this.isChildUpdate2 = false;
        this.isChildUpdate3 = false;
        this.isChildUpdate4 = true;
        this.Cookies.set("tabPage", 4);
      }
    }
  },
  destroyed() {
    this.Cookies.set("tabPage", "");
  }
};
</script>

<style scoped>
.tabContent {
  width: 98%;
  border-radius: 7px;
  overflow: hidden;
  margin-left: 10px;
}
</style>
