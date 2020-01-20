<template>
    <div class="switch-group">
        <div class="switch">
            <span >声光报警</span>
            <div class="btn" :class="{'active': light}" @click="flash(0)">{{light ? 'ON' : 'OFF'}}</div>
        </div>
        <div class="switch">
            <span>报警停机</span>
            <div class="btn" :class="{'active': shutdown}" @click="flash(1)">
                {{shutdown ? 'ON' : 'OFF'}}
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
            <p class="tips text-center">确认关闭{{b ? '报警停机' : '声光报警'}}吗？</p>
            <span slot="footer" class="dialog-footer">
    <div class="btn-exit mgr" @click="dialogVisible = false">取 消</div>
    <div class="btn-start mgr" @click="stop">确 定</div>
  </span>
        </el-dialog>
    </div>
</template>
<script>
  export default {
    name: 'vsHeader',
    components: {},
    data () {
      return {
        b: 0,
        dialogVisible: false
      }
    },
    methods: {
      flash (x = 0) {
        let alarmSwitch = this.dots.alarmSwitch ^ (1 << x)
        this.b = x
        let bit = (this.dots.alarmSwitch & (1 << x)) >> x
        if (bit) {
          this.dialogVisible = true
        } else {
          this.writePlc([[25, alarmSwitch]])
        }
      },
      stop () {
        let alarmSwitch = this.dots.alarmSwitch ^ (1 << this.b)
        this.writePlc([[25, alarmSwitch]])
        this.dialogVisible = false
      }
    },
    computed: {
      light: function () {
        return [1, 3].includes(this.dots.alarmSwitch)
      },
      shutdown: function () {
        return [2, 3].includes(this.dots.alarmSwitch)
      }
    },
    beforeDestroy () {
    },
    created () {
    }
  }
</script>
<style>

</style>
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
        .btn {
            width: 56px;
            height: 56px;
            line-height: 56px;
            display: inline-block;
            vertical-align: middle;
            margin-left: 10px;
            font-size: 16px;
            text-align: center;
            color: #fefeff;
            background: url('../assets/img/kg.png') no-repeat;
            cursor: pointer;
            &.active {
                background-position:0 -130px;
            }

        }
    }

</style>