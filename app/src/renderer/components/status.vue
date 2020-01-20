<template>
    <div class="switch-group">
        <div class="switch">
            <!--<i class="el-icon-time" style="font-size: 30px;vertical-align: middle"></i>-->
            <span style="margin-left: 10px">绞线机状态：</span>
        </div>
        <div class="work-stauts" :class="{act:run}">
            {{stranderStatus}}
        </div>
    </div>
</template>
<script>
  export default {
    name: 'vsHeader',
    components: {},
    data () {
      return {
      }
    },
    computed: {
      stranderStatus () {
        return ['停止', '运行', '工作', '断线停止'][this.dots.stranderStatus]
      },
      run () {
        return [0, 1, 1, 0][this.dots.stranderStatus]
      }
    },
    methods: {
    },
    beforeDestroy () {
    },
    created () {
    }
  }
</script>
<style lang="scss" scoped>
    .switch-group {
        width: 459px;
        height: 80px;
        background-color: #1d2236;
        border-radius: 6px;
        border: solid 1px #454d61;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 30px;
    }
    .work-stauts {
        width: 184px;
        color: #637085;
        &.act {
            color: #ffffff;
        }
    }
</style>