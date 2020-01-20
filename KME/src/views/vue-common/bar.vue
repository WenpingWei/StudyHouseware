<template>
  <div class="echart-box" ref="_chart"></div>
</template>

<script>
var defaults = {
  arr: [{ name: "项目一", value: 1 }],
  c1: "#009193",
  c2: "#d0d38e"
};
export default {
  props: ["vw", "vh", "arr", "arrName", "c1", "c2", "max", "unit"],
  data: function() {
    return {};
  },
  created: function() {},
  methods: {
    updateChart: function() {
      let arr = this.arr || [],
        unit = this.unit || "",
        arrName = this.arrName || "系列名",
        c1 = this.c1 || "#009193",
        c2 = this.c2 || "#d0d38e";

      let option = {
        tooltip: {
          trigger: "axis", //按x轴显示
          show: true,
          axisPointer: {
            lineStyle: {
              color: "none" //不显示线条
            }
          },
          textStyle: {
            align: "left",
            fontSize: 16,
            color: "#fff"
          }
        },
        color: ["#0580f2"],
        grid: {
          left: "3%",
          right: "3%",
          top: "14%",
          bottom: "5%",
          containLabel: true
        },
        legend: {
          icon: "square",
          right: 20,
          textStyle: {
            fontSize: 16,
            color: "#000"
          },
          data: [arrName]
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
              fontSize: 14,
              color: "#232323"
            }
          },
          data: arr.map(function(item) {
            return item.name;
          })
        },
        yAxis: {
          show: true,
          min: 0,
          minInterval: 1,
          name: unit,
          nameTextStyle: {
            fontSize: 14,
            color: "#232323"
          },
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#39a6f2",
              opacity: 0.3
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#39a6f2",
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
            name: arrName,
            type: "bar",
            barWidth: "16",
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: c2 // 0% 处的颜色
                  },
                  {
                    offset: 0.4,
                    color: c1
                  },
                  {
                    offset: 1,
                    color: c1 // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            data: arr.map(function(item) {
              return item.value;
            })
          }
        ]
      };
      if (this.max) {
        option.yAxis.max = this.max;
      }

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
}
</style>
