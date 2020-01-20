<template>
  <div id="mapShow"></div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "App",
  data: function() {
    return {};
  },
  props: ["longitude", "latitude"],
  methods: {
    mapInit() {
      // 百度地图API功能
      let map = new BMap.Map("mapShow",{enableMapClick:false}); // 创建Map实例
      map.centerAndZoom(new BMap.Point(this.longitude || 104.079853, this.latitude || 30.703259), 11); // 初始化地图,设置中心点坐标和地图级别
      //自定义地图样式
      // map.setMapStyleV2({
      //   styleId: 'b6b7251e5a82776f28cad5c468bcb5e4'
      // });
      //添加地图类型控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      const p1 = new BMap.Point(this.longitude || 104.079853, this.latitude || 30.703259);
      const marker = new BMap.Marker(p1); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      map.enableScrollWheelZoom(true); //添加滚轮缩放
    }
  },
  components: {},
  watch: {
    longitude() {
      this.mapInit();
    }
  },
  mounted: function() {
    this.mapInit();
  }
};
</script>
<style lang="scss" scoped>
div {
  width: 97%;
  height: 97%;
  margin: 10px auto;
}
</style>
