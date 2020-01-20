<template>
  <div class="echart-box" ref="_chart"></div>
</template>
//折线图
//现在最多4条数据
<script>
let defaults = {
  arr1: [], //数据1
  arr2: [], //数据2
  arr3: [], //数据3
  arr4: [], //数据4
  xDate: [], //x轴数据
  yMax: "", //y轴最大值
  yMin: "", //y最小值
  colors: [],
  yUnit: "",
  simpleSize: [], //折线图圆点大小
  len: []
};
export default {
  props: [
    "vw",
    "vh",
    "arr1",
    "arr2",
    "arr3",
    "arr4",
    "xDate",
    "len",
    "yUnit",
    "simpleSize",
    "yMax",
    "yMin",
    "colors"
  ],
  data: function() {
    return {};
  },
  methods: {
    updateChart: function() {
      let data = {
        val1: this.arr1 || [1, 2, 3, 4, 5, 6],
        val2: this.arr2,
        val3: this.arr3,
        val4: this.arr4,
        simpleSize: this.simpleSize || [8, 8],
        xDate: this.xDate || ["1", "2", "3", "4", "5", "6"],
        yMax: this.yMax,
        yMin: this.yMin,
        yUnit: this.yUnit || "只",
        len: this.len || ["", ""],
        color: this.colors || ["#f28a5b", "#2fe585", "#e6cf27", "#f8725a"]
      };
      let option = {
        tooltip: {
          trigger: "axis", //按x轴显示
          show: true,
          axisPointer: {
            lineStyle: {
              color: "none" //不显示线条
            }
          },
          // backgroundColor: 'rgba(255, 255, 255, 0.5)',
          textStyle: {
            align: "left",
            fontSize: 16,
            color: "#000"
          }
          //extraCssText: 'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2)' //添加阴影
        },
        color: data.color,
        grid: {
          left: "2%",
          right: "2%",
          top: "18%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          show: true,
          icon: "line",
          right: 20,
          textStyle: {
            fontSize: 14,
            color: "#000"
          },
          data: data.len
        },
        xAxis: {
          show: true,
          type: "category",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#000"
            }
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              fontSize: 16,
              color: "#000"
            }
          },
          data: data.xDate
        },
        yAxis: {
          show: true,
          min: data.yMin,
          max: data.yMax,
          name: data.yUnit,
          nameTextStyle: {
            fontSize: 16,
            color: "#000"
          },
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#6d6d6d",
              opacity: 0.3
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#6d6d6d",
              opacity: 0.3
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: 16,
              color: "#000"
            }
          }
        },
        series: [
          {
            name: data.len[0],
            type: "line",
            symbol: "circle",
            itemStyle: {
              emphasis: {
                symbol: "circle"
              }
            },
            symbolSize: data.simpleSize,
            data: data.val1
          },
          {
            name: data.len[1],
            type: "line",
            symbol: "circle",
            itemStyle: {
              emphasis: {
                symbol: "circle"
              }
            },
            symbolSize: data.simpleSize,
            data: data.val2
          },
          {
            name: data.len[2],
            type: "line",
            symbol: "circle",
            itemStyle: {
              emphasis: {
                symbol: "circle"
              }
            },
            symbolSize: data.simpleSize,
            data: data.val3
          },
          {
            name: data.len[3],
            type: "line",
            symbol: "circle",
            itemStyle: {
              emphasis: {
                symbol: "circle"
              }
            },
            symbolSize: data.simpleSize,
            data: data.val4
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
