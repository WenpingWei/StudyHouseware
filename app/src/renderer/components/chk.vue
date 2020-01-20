<template>
    <div class="chk " :class="{grey: !formData.status}">
        <div class="h">
            <slot>电缆断线检测控制系统</slot>
        </div>
        <div class="vs-form" :class="{s1: !formData.status}" style="padding: 20px 20px;">
            <el-form label-width="100px">
                <!--<el-form-item label="铜线直径" >-->
                    <!--<el-input readonly v-model="formData.diameter" class="readonly">-->
                        <!--<template slot="append">mm</template>-->
                    <!--</el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="检测线数">
                    <el-input readonly v-model="formData.lines"></el-input>
                </el-form-item>
                <el-form-item label="有效次数" prop="count">
                    <el-input readonly v-model="formData.count"></el-input>
                </el-form-item>
                <el-form-item label="线圈层数">
                    <el-input readonly v-model="formData.threshold"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="btn-group">
            <el-button class="s1" @click="allow">{{formData.status ? '停用' : '启用'}}</el-button>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'chk',
    components: {},
    props: ['equip', 'inx'],
    data () {
      return {
        formData: {
          id: '',
          name: '',
          count: 1,
          diameter: 0,
          lines: 0,
          threshold: 0,
          status: 0
        }
      }
    },
    methods: {
      allow () {
        if (!this.equip.status) {
          // this.$emit('equipStatus', 1) // 停用
          this.$router.push({ name: 'edit', query: {inx: this.inx} })
        } else {
          this.$emit('equipStatus', 0) // 停用
        }
      }
    },
    beforeDestroy () {
    },
    watch: {
      equip: function () {
        Object.assign(this.formData, this.equip)
      }
    },
    created () {
      if (this.equip.id) {
        Object.assign(this.formData, this.equip)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .chk {
        min-width: 300px;
        height: 400px;
        background-color: #1d2236;
        border-radius: 6px;
        border: solid 1px #454d61;
        position: relative;
        flex: 1
    }
    .chk.grey {
        background: #40485c;
        .h {
            background: #343a49;
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