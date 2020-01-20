<template>
<div>
  <slot name="header"></slot>
  <ul class="page" v-for="item in list">
    <li>
      <div class="div-animate">
        <div class="p-1">
          <slot name="content-one" :item="item"></slot>
        </div>
        <div class="p-2">
          <slot name="content-two" :item="item"></slot>
        </div>
      </div>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  name: 'commonTable',
  data () {
    return {
      list: [],
      index: 0,
      total: '',
      time: 1000
      // rows: 12 // 每页显示几条
    }
  },
  props: ['listTotal', 'rows'],
  beforeDestroy() {    //在vue实例销毁的时候，清理掉定时器控制
      
  },
  methods: {
    detailData (num) {
      this.list = this.listTotal.slice(num * this.rows, ((num + 1) * this.rows))
    },
    animate () {
      console.log("11111111111")
      this.index++
      if (this.index > this.total) {
        this.index = 1
      }
      this.detailData(this.index - 1)
      if (this.listTotal.length < this.rows) {
        return false
      }
      setTimeout(() => {
        d3.select(this.$el)
          .selectAll('.div-animate')
          .style('transform', 'translateY(-50px)')
          .transition()
          .duration(1500)
          .delay((d, i) => {
            return i * this.time // 延迟
          })
          .style('transform', 'translateY(0px)')
      }, 1000)
      if(this.$store.state.animation==false){
        return
      }else if(this.$store.state.listTab==false){
        return
      }
      this.anima = setTimeout(this.animate, this.list.length * this.time + 3000) //总时间
    }
  },
  watch: {
    listTotal () {
      this.total = Math.ceil(this.listTotal.length / this.rows)
      this.animate()
    },
    animation(newValue, oldValue){
        if(newValue == false){
            clearTimeout(this.anima)
            this.anima = null
        }else{
            this.animate()
        }
    }
    
  },
  mounted () {
    this.$store.state.listTab = true
    this.total = Math.ceil(this.listTotal.length / this.rows)
    // this.detailData(this.index) // index当前是第几页的索引
    this.animate()
  },
  computed: {  
    animation(){
    return  this.$store.state.animation
  }},
  beforeDestroy () {
     this.$store.state.listTab = false
    if (this.anima) {
      clearTimeout(this.anima)
    }
  },

}
</script>

<style lang="scss" scoped>
ul.header {
  display: flex;
  justify-content: space-around;
  width :100%;
  text-align: center;
  /*display: flex;*/
  background: #233149;
  color: #199af5;
  li {
    width: 20%;
    height: 50px;
    line-height: 50px;
    color: #199af5;
    font-size: 14px;
    text-align: center;
  }
}
  .page {
    width: 100%;
    border :1px solid #252e3f;
    box-sizing :border-box;
    /*margin-top :10px;*/
    height :50px;
    color: #fff;
    display: flex;
    .p-1,.p-2 {
      display: flex;
      justify-content: space-around;
    }
    > li {
      width: 100%;
      height: 50px;
      overflow: hidden;
    }
    span {
      display: block;
      width: 20%;
      line-height: 50px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /*span:nth-of-type(odd) {*/
      /*color: #14edff;*/
    /*}*/
  }
  .page:nth-of-type(even) {
    background: #161e2c;
  }
</style>
