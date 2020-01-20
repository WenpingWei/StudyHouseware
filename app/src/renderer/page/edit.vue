<template>
    <div class="content" style="margin-top: 0px;">
        <div class="unit-name">{{formData.name}}</div>
        <el-form label-width="100px"
                 :model="formData"
                 hide-required-asterisk
                 :show-message="false"
                 :rules="rules" ref="formData"
        >
        <div class="flex-row vs-form" style="margin: 0 -10px;">
            <div class="chk f1" >
                <div class="h">
                    铜线检测配置
                </div>
                <div class="flex-row h1">
                    <div class="pre-img">
                        <img src="../assets/img/img-1.png" alt="">
                    </div>
                    <div  style="padding: 20px 20px;">
                            <!--<el-form-item label="铜线直径" prop="diameter" >-->
                                <!--<el-input  v-model="formData.diameter" class="">-->
                                    <!--<template slot="append">mm</template>-->
                                <!--</el-input>-->
                            <!--</el-form-item>-->
                            <el-form-item label="检测线数" prop="lines">
                                <el-input  v-model="formData.lines"></el-input>
                            </el-form-item>
                        <el-form-item label="有效次数" prop="count">
                            <el-input  v-model="formData.count"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </div>
            <div class="chk f1">
                <div class="h">
                    成品线检测配置
                </div>
                <div class="flex-row h1">
                    <div class="pre-img">
                        <img src="../assets/img/img-2.png" alt="">
                    </div>

                    <div  style="padding: 20px 20px;">
                            <el-form-item label="线圈层数" prop="threshold">
                                <el-select  v-model="formData.threshold">
                                    <el-option lable="1" :value="1"></el-option>
                                    <el-option lable="2" :value="2"></el-option>
                                    <el-option lable="3" :value="3"></el-option>
                                    <el-option lable="4" :value="4"></el-option>
                                </el-select>
                            </el-form-item>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-row" style="margin-top: 90px; flex-direction: row-reverse">
            <div class="exit-btn" @click="submit">
                确 定
            </div>
        </div>
        </el-form>
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
        inx: 0,
        formData: {
          id: '',
          name: '',
          diameter: 0,
          lines: 0,
          count: 1,
          threshold: 0,
          status: 0,
          d1: 1,
          d2: 0
        },
        rules: {
          diameter: [ {
            required: true,
            pattern: /^\d+$|^\d*\.\d+$/g,
            message: '请输入数字',
            trigger: 'blur'
          }],
          lines: [ {
            required: true,
            pattern: /^[1-9]\d*$/g,
            message: '请输入数字',
            trigger: 'blur'
          }],
          threshold: [ {
            required: true,
            pattern: /^[1-9]\d*$/g,
            message: '请输入数字',
            trigger: 'blur'
          }],
          count: [ {
            required: true,
            pattern: /^[1-9]\d*$/g,
            message: '请输入数字',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submit () {
        this.$refs.formData.validate(valid => {
          if (valid) {
            // this.formData.status = 1
            // 只立刻更新保存在本地数据，其他同步PLC数据，PLC写人成功后会自动同步
            let orData = {...this.equips[this.inx]}
            orData.threshold = this.formData.threshold
            let data = {
              i: this.inx,
              row: orData
            }
            // 需要写进PLC中的数据
            let hook = {
              0: [2, 37, 28],
              1: [20, 38, 30],
              2: [22, 39, 32]
            } // 0:单元设定检测线芯根数 1:单元设定检出有效次数 2 单元实测线芯根数
            let lineStoreIndex = hook[this.inx][0]
            let lineCheackIndex = hook[this.inx][1]
            let pos = 2 - this.inx
            let run = this.dots.linesStatus | (1 << pos)
            let arr = [
              [lineStoreIndex, Number(this.formData.lines)],
              [lineCheackIndex, Number(this.formData.count)],
              [0, run]
            ]
            this.writePlc(arr)
            this.$store.commit('setEquip', data)
            this.$router.push('sets')
          } else {
            this.$message({
              type: 'error',
              message: '红色框区域，数据格式有误!'
            })
          }
        })
      }
    },
    beforeDestroy () {
    },
    created () {
      let inx = this.inx = this.$route.query.inx
      Object.assign(this.formData, {...this.equips[inx]})
    }
  }
</script>
<style lang="scss" scoped>
    .unit-name {
        margin: -5px 0px 25px 0px;
        letter-spacing: 2px;
        text-indent: 20px;
    }
 .chk {
     min-width: 300px;
     height: 400px;
     background-color: #1d2236;
     border-radius: 6px;
     border: solid 1px #454d61;
     position: relative;
     flex: 1;
     .pre-img {
         width: 188px;
         flex-grow: 0;
         flex-shrink: 0;
         text-align: center;
     }
     .h1 {
         height: calc(100% - 50px);
     }

 }
 .h{
     height: 50px;
     background-color: #141827;
     border-radius: 6px 6px 0px 0px;
     font-size: 24px;
     line-height: 50px;
     letter-spacing: 2px;
     color: #099cf0;
     text-indent: 20px;
 }
 .btn-group {
     position: absolute;
     bottom: 20px;
     width: 100%;
     right: 20px;
     text-align: right;
 }
</style>