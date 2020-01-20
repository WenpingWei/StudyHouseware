<template>
    <div class="content" >
        <div class="flex-row" style="margin: 0 -10px;">
            <!--<vs-chk class="f1">监测单元1</vs-chk>-->
            <vs-chk class="f1" v-bind:equip="item" :stick="stick"  v-for="item in $store.getters.runEquip">{{item.name}}</vs-chk>
        </div>
        <div class="flex-row" style="margin-top: 20px;">
          <vs-work :dateTime="dateTime"></vs-work>
          <vs-status></vs-status>
        </div>
        <div class="flex-row" style="margin-top: 20px;">
            <div class="btn-group">
                <vs-kg ></vs-kg>
            </div>
            <div class="exit-btn" @click="dialogVisible = true">
                退 出
            </div>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="740px"
                :append-to-body="true"
                :show-close="false"
                custom-class="wbox"
        >
            <span slot="title"></span>

            <div class="text-center">
                <img src="../assets/img/warning.png" alt="">
            </div>
			
			<!-- 点击退出提示 -->
            <p class="tips text-center">确认退出检测吗？</p>
            <span slot="footer" class="dialog-footer">
    <div class="btn-exit mgr" @click="dialogVisible = false">取 消</div>
    <div class="btn-start mgr" @click="exit">确 定</div>
  </span>
        </el-dialog>
    </div>

</template>
<script>
  import chk from '@/components/moni.vue'
  import kg from '@/components/switch.vue'
  import work from '@/components/work.vue'
  import status from '@/components/status.vue'
  import { padStart } from 'lodash'
  export default {
    name: 'chk',
    components: {
      'vs-chk': chk,
      'vs-kg': kg,
      'vs-work': work,
      'vs-status': status
    },
    data () {
      return {
        dialogVisible: false,
        startTime: 0,
        dateTime: {
          year: 2019,
          mon: 1,
          day: 1,
          hour: 0,
          mi: 0,
          ss: 0
        },
        stick: true,
        systime: 0
      }
    },
    methods: {
      exit () {
        // 执行退出方法
        this.writePlc([[24, 0]])
        this.$router.push('sets')
      },
      refresh () {
        let times = Date.now() - this.startTime
        this.stick = !this.stick
        this.dateTime.hour = padStart(Math.floor(times / 3600000), 2, '0')
        this.dateTime.mi = padStart(Math.floor((times % 3600000) / 60000), 2, '0')
        this.dateTime.ss = padStart(Math.floor((times % 60000) / 1000), 2, '0')
        clearTimeout(this.tid)
        this.tid = setTimeout(this.refresh, 1000)
      }
    },
    beforeDestroy () {
      clearTimeout(this.tid)
    },
    created () {
      this.startTime = Date.now()
      this.refresh()
    }
  }
</script>
<style lang="scss" scoped>
    .mgr {
        margin: 0 20px;
    }
    .tips {
        line-height: 40px;
        letter-spacing: 2px;
        color: #1d2236;
        font-size: 20px;
        font-family: 'Microsoft YaHei';
        margin: 1em 0 -15px 0;
    }
</style>