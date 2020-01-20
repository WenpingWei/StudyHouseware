<template>
    <div class="header">
        <div class="sys-name">
            <slot>电缆断线检测控制系统</slot>
        </div>
        <div class="flex">
            <div class="net" :class="{online: $store.state.app.online}"></div>
            <div  v-html="systime" class="systime"></div>
        </div>
    </div>

</template>
<style lang="scss" scoped>
    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header {
        display: flex;
        justify-content: space-between;
        height: 80px;
        background-color: #1d2236;
        padding: 0 45px;
        align-items: center;
        .sys-name {
            letter-spacing: 3px;
            font-size: 28px;
        }
        .net {
            height: 30px;
            width: 30px;
            background: url(../assets/img/oline.png) no-repeat;
            background-position: 0 -60px
        }
        .online {
            background-position: 0 0
        }
    }
    .systime {
        line-height: 22px;
        text-align: center;
    }
</style>
<script>
  import { getDateTime } from '@/util'
  export default {
    name: 'vsHeader',
    components: {},
    data () {
      return {
        dateTime: {
          year: 2019,
          mon: 1,
          day: 1,
          hour: 0,
          mi: 0,
          ss: 0
        },
        systime: 0
      }
    },
    methods: {
      refresh () {
        this.systime = getDateTime('hh:mi</br>yyyy/mm/dd', new Date())
        clearTimeout(this.tid)
        this.tid = setTimeout(this.refresh, 2000)
      }
    },
    beforeDestroy () {
      clearTimeout(this.tid)
    },
    created () {
      this.refresh()
    }
  }
</script>