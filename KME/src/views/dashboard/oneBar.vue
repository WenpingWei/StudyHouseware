<!--单个柱状图  业务指标 当月省计库存中心  业务流程 当月各地市公司报废申请情况-->
<template>
<div>

</div>
</template>
<script>
// import { setTimeout } from 'timers';
export default {
  props: ['arr', 'name', 'pro', 'left', 'rotate', 'bottom', 'top',
    'color', 'flag'],
  data: function() {
    return {
      observer: null,
      firedNum: 0,
       recordOldValue: { // 记录下旧的宽高数据，避免重复触发回调函数
        width: '0',
        height: '0'
      }

    }
  },
   computed:{
        isCollapse(){
            return this.$store.state.isCollapse;
        }
    },
      watch: {
    isCollapse(newValue, oldValue){
            console.log(this.$store.state.isCollapse+"======监听按钮事件"+"重置图表")
            setTimeout(()=>{
            this.myChart.resize()
            },500)
        },
    arr: function() {
      this.updateChart()
    },
    deep: true
  },
  beforeDestroy(){
    this.myChart.clear()     //vue实例销毁时，释放ECharts的内存
  },
  mounted: function() {
    var that = this
    this.myChart = this.$echarts.init(this.$el)
    this.updateChart()
    window.addEventListener("resize",() => {
      this.myChart.resize();
    })
    window.onblur=(e)=>{
      this.myChart.clear()
      this.myChart.setOption(Option)
      }
      window.onfocus=(e) =>{
      this.updateChart()
      }

  },
  created: function() {
  },
  methods: {
    updateChart: function() {
      const option = {
        color: this.color || ['#199af5'],
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#283143'
            }
          },
          axisLabel: {
            show: this.flag,
            color: '#b1bdcd',
            rotate: this.rotate,
            fontSize: 14
          },
          splitLine: {
            lineStyle: {
              color: '#023d40'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          minInterval: 1,
          type: 'value',
          nameLocation: 'end',
          // boundaryGap: ['20%', '50%'],
          nameTextStyle: {
            color: '#b1bdcd',
            fontSize: 14,
            align: 'left'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#283143'
            }
          },
          axisLabel: {
            color: '#b1bdcd',
            fontSize: 16
            // formatter: '{value}万只'
          },
          splitLine: {
            // show: false,
            lineStyle: {
              color: '#283143'
            }
          }
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          icon: 'circle',
          right: 10,
          textStyle: {
            color: '#00b7ee',
            fontSize: 16
          }
        },
        grid: {
          left: this.left || '6%',
          top: this.top || '21%',
          bottom: this.bottom || '16%',
          right: '2%'
        },
     tooltip: {
    //       formatter(params) {
    //         const div = `<div class="tooltip" style="width: 43px;
    // height: 51px;
    // background: url('../../assets/images/common/1.png');">${params.name}：${params.seriesId}</div>`
    //         return div
    //       }
        },
        dataset: {
          //   dimensions: ,
          source: this.arr
        },
        series: [
          {
            name: this.name,
            encode: {
              x: this.name,
              // y: this.pro
            },
            // data: data.val,
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                // borderColor: '#00b7ee',
                barBorderRadius: [30, 30, 0, 0]
                // borderWidth: 1
              }
            }
          }]
      }

      this.myChart.setOption(option, true)
    }

  }
}
</script>

<style scoped>
  div{
    width:100%;
    height:100%;
    /*position: relative;*/
  }
  .tooltip {
    width: 43px;
    height: 51px;
    background: url('../../assets/images/common/1.png');
  }
</style>
