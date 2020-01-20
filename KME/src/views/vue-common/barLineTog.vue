<template>
  <div class="echart-box" ref="_chart"></div>
</template>
//折线柱图混合图
<script>
let defaults = {
  arr1: [], //数据1
  arr2: [], //数据2
  arr3: [], //折线数据
  xDate: [],
  colors: [],
  len: [],
  yUnit: "",
  barWidth: ""
};
export default {
  props: [
    "vw",
    "vh",
    "arr1",
    "arr2",
    "arr3",
    "xDate",
    "colors",
    "len",
    "yUnit",
    "barWidth"
  ],
  data: function() {
    return {};
  },
  methods: {
    updateChart: function() {
      let data = {
        val1: this.arr1 || [55, 66, 77, 99, 125, 158],
        val2: this.arr2,
        val3: this.arr3 || [33, 56, 69, 88, 79, 52],
        xDate: this.xDate || ["1月", "2月", "3月", "4月", "5月", "6月"],
        colors: this.colors || [
          "#a6bffd",
          "#55deff",
          "#fed641",
          "#feb542",
          "#fdcf40"
        ],
        len: this.len || ["", "", ""],
        yUnit: this.yUnit || "万只",
        barWidth: this.barWidth || "22%"
      };
      let colorList = {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: data.colors[0] // 0% 处的颜色
          },
          {
            offset: 1,
            color: data.colors[1] // 100% 处的颜色
          }
        ],
        globalCoord: false // 缺省为 false
      };
      let colorList2 = {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: data.colors[2] // 0% 处的颜色
          },
          {
            offset: 1,
            color: data.colors[3] // 100% 处的颜色
          }
        ],
        globalCoord: false // 缺省为 false
      };
      let option = {
        grid: {
          left: "1%",
          right: "1%",
          bottom: "1%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: data.len,
          top: "6%",
          right: "2%",
          textStyle: {
            fontSize: 14,
            color: "#000"
          }
        },
        xAxis: [
          {
            type: "category",
            data: data.xDate,
            axisPointer: {
              type: "shadow"
            },
            axisLine: {
              lineStyle: {
                color: "#000"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              interval: "0",
              textStyle: {
                fontSize: 16,
                color: "#000"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: data.yUnit,
            axisLine: {
              lineStyle: {
                color: "#000"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 16,
                color: "#000"
              }
            }
          },
          {
            type: "value",
            min: 0,
            max: 100,
            name: "%",
            axisLine: {
              lineStyle: {
                color: "#000"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              interval: "0",
              textStyle: {
                fontSize: 16,
                color: "#000"
              }
            }
          }
        ],
        series: [
          {
            name: data.len[0],
            type: "bar",
            barWidth: data.barWidth,
            data: data.val1,
            itemStyle: {
              color: function(params) {
                return colorList;
              }
            }
          },
          {
            name: data.len[1],
            type: "bar",
            barWidth: data.barWidth,
            data: data.val2,
            itemStyle: {
              color: function(params) {
                return colorList2;
              }
            }
          },
          {
            name: data.len[2],
            type: "line",
            yAxisIndex: 1,
            data: data.val3,
            itemStyle: {
              color: data.colors[4]
            }
          }
        ]
      };
      this.myChart.setOption(option, true);
    },
    init() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs._chart);
    }
  },
  watch: {
    arr: function() {
      this.updateChart();
    },
    deep: true
  },
  mounted: function() {
    this.init();
    this.updateChart();
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },
  created: function() {}
};
</script>

<style scoped>
.echart-box {
  width: 100%;
  height: 100%;
  /*position: relative;*/
}
</style>
