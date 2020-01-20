<template>
    <div class="switch-group">
        <div class="switch">
            <i class="el-icon-time" style="font-size: 30px;vertical-align: middle"></i>
            <span style="margin-left: 10px">设备工作时长：</span>

        </div>
        <div class="workTimes">
            {{dateTime.hour}} : {{dateTime.mi}} : {{dateTime.ss}}
        </div>
    </div>
</template>
<script>
  export default {
    name: 'vsHeader',
    props: ['dateTime'],
    components: {},
    data () {
      return {
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
    .switch {

    }
    .workTimes {
        width: 204px;
        font-size: 30px;
        font-weight: bold;
        text-align: right ;
    }
</style>