<template>
  <div class="tabContent">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="绑定详情" name="first" :key="'first'">
        <tab1 v-if="isChildUpdate1"></tab1>
      </el-tab-pane>

      <el-tab-pane label="告警设置" name="second" :key="'second'">
        <tab2 v-if="isChildUpdate2"></tab2>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import bindDetails from "@/views/vsz-gateway/device-bindDetails";
import alarmSetting from "@/views/vsz-gateway/device-alarmSetting";
export default {
  components: {
    tab1: bindDetails,
    tab2: alarmSetting
  },
  data() {
    return {
      //默认第一个选项卡
      activeName: "first",
      isChildUpdate1: true,
      isChildUpdate2: false
    };
  },
  mounted() {
    let tab = this.$route.query.tab;
    if (this.Cookies.get("tabPage")) {
      tab = parseInt(this.Cookies.get("tabPage"));
    } else {
      tab = this.$route.query.tab;
    }
    if (tab === 1) {
      this.activeName = "second";
      this.isChildUpdate1 = false;
      this.isChildUpdate2 = true;
    }else{
      this.activeName = "first";
      this.isChildUpdate1 = true;
      this.isChildUpdate2 = false;
    }2
  },
  methods: {
    handleClick(tab) {
      if (tab.name == "first") {
        this.isChildUpdate1 = true;
        this.isChildUpdate2 = false;
        this.Cookies.set("tabPage", 2);
      } else if (tab.name == "second") {
        this.isChildUpdate1 = false;
        this.isChildUpdate2 = true;
        this.Cookies.set("tabPage", 1);
      }
    },
    destroyed() {
    this.Cookies.set("tabPage", "");
  }
  }
};
</script>

<style scoped>
.tabContent {
  width: 98%;
  margin: 0 auto;
  border-radius: 7px;
  overflow: hidden;
}
.el-tabs--border-card > .el-tabs__header {
  color: #fff;
  background-color: black;
}
.el-tabs__item {
  background-color: black;
}
.is-active {
  background-color: black;
}

</style>
