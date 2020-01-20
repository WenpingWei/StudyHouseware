<template />

<script>
let myChart=null;
export default {
  name: 'Pie',
  props: ['arr', 'index', 'legend'],
  data() {
    return {}
  },
  computed: {},
  watch: {
    arr: function() {
      this.updateChart()
    },
    deep: true
  },
  mounted() {
   myChart = this.$echarts.init(this.$el)
    this.updateChart()
     window.addEventListener("resize",() => {
      myChart.resize();
    })
    window.onblur(e =>{
      this.myChart.clear()
      })
      window.onfocus(e =>{
      this.updateChart()
      })
 
  },
  methods: {
    updateChart() {
      const option = {
        color: ['#ffff00', '#199af5', '#00ffff', '#a847d7', '#025db0'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          // show: show,
          icon: 'circle',
          itemWidth: 11,
          itemHeight: 11,
          orient: 'vertical',
          left: 20,
          top: 30,
          itemGap: 16,
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        series: [
          {
            name: '故障信息',
            type: 'pie',
            radius: ['50%', '60%'],
            center: ['65%', '50%'],
            // center: ['80%', '20%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                formatter: '{d}%',
                position: 'outside'
              }
              // emphasis: {
              //   show: true,
              //   textStyle: {
              //     fontSize: '12',
              //     fontWeight: 'bold'
              //   }
              // }
            },
            labelLine: {
              normal: {
                // show: false,
                // length: 0,
                // length2: 0,
                fontSize: 16
              }
            },
            data: this.arr
          }
        ]
      }
      myChart.setOption(option, true)
    }
  },
  beforeDestroy(){
      console.log(this.$el,1111111)
      myChart.clear(); //清空图表
      myChart.dispose(); //释放图表组件
      myChart = null;
  }
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
