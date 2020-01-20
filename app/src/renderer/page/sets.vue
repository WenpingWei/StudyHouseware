<template>
    <div class="content" style="margin-top: 30px;">
        <div class="flex-row" style="margin: 0 -10px;">
            <vs-chk class="f1" v-bind:equip="item"  :inx ="index" v-for="item,index in equips" :key="item.id" @equipStatus="update(index, {...item})">{{item.name}}</vs-chk>
            <!--<vs-chk class="f1">监测单元2</vs-chk>-->
            <!--<vs-chk class="f1">监测单元3</vs-chk>-->
        </div>
        <div class="flex-row" style="margin-top: 90px;">
            <div class="btn-group">
                <vs-kg></vs-kg>
            </div>
            <div :class="klass"  @click="start">
                启动监控
            </div>
        </div>
    </div>
</template>
<script>
  import chk from '@/components/chk.vue'
  import kg from '@/components/switch.vue'
  export default {
    name: 'chk',
    components: {
      'vs-chk': chk,
      'vs-kg': kg
    },
    data () {
      return {
        // equips: [
        //   { id: 'equip01',
        //     name: '监测单元1',
        //     diameter: 8,
        //     lines: 10,
        //     threshold: 1,
        //     status: 1
        //   },
        //   { id: 'equip02',
        //     name: '监测单元2',
        //     diameter: 10,
        //     lines: 12,
        //     threshold: 0,
        //     status: 0
        //   },
        //   { id: 'equip03',
        //     name: '监测单元3',
        //     diameter: 10,
        //     lines: 12,
        //     threshold: 0,
        //     status: 0
        //   }
        // ],
        systime: 0
      }
    },
    computed: {
      klass: function () {
        return this.$store.getters.canUse ? 'exit-btn' : 'start-btn'
      }
    },
    methods: {
      update (index, item) {
        // item.status = 0
        // let data = {
        //   i: index,
        //   row: item
        // }
        let run = this.dots.linesStatus & ~(1 << (2 - index))
        let arr = [
          [0, run]
        ]
        this.writePlc(arr)
        // let alarmSwitch = this.dots.alarmSwitch ^ (1 << this.b)
        // this.writePlc([[23, alarmSwitch]])
        // this.$store.commit('setEquip', data)
      },
      start () {
        if (this.$store.getters.canUse) {
          this.$client.publish('strander/config', JSON.stringify(this.equips))
          this.$router.push('moni')
        } else {
          // this.$message({
          //   type: 'info',
          //   message: '无启动监控设备!'
          // })
        }
      }
    },
    beforeDestroy () {
    },
    created () {
      console.dir(this.$store)
    }
  }
</script>
<style lang="scss" scoped>
</style>