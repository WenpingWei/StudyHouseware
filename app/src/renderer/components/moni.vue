<template>
    <div class="moni">
        <div class="h">
            <slot>检测单元1</slot>
        </div>
        <div class="box">
            <div class="b b1 " :class="{warning: stick && formData.d1}">
                <div class="ct">铜线检测</div>
                <div class="cr">{{formData.rlines}}</div>
                <div class="cb" style="margin-top: 0px">检测线数: {{formData.lines}}</div>

            </div>
            <div class="b b2" :class="{warning: stick && formData.d2}">
                <div class="ct">成品线检测</div>
                <div class="cb"><span>{{formData.d2 ? '断线' : '正常'}}</span><div class="status" :class="{red: formData.d2}"></div></div>
            </div>
        </div>
    </div>

</template>
<script>
  export default {
    name: 'chk',
    props: ['equip', 'stick'],
    components: {},
    data () {
      return {
        formData: {
          id: '',
          name: '',
          diameter: 0,
          lines: 0,
          threshold: 0,
          status: 0,
          d1: 'd1',
          d2: 'd2'
        }
      }
    },
    methods: {
    },
    beforeDestroy () {
    },
    watch: {
      equip (v) {
        Object.assign(this.formData, v)
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
    .moni {
        min-width: 300px;
        height: 400px;
        background-color: #1d2236;
        border-radius: 6px;
        border: solid 1px #454d61;
        position: relative;
        flex: 1;
        display: flex;
    }
    .b::before {
        content: "";
        display: table;
        height: 0;
    }
    .h{
        width: 50px;
        height: 100%;
        background-color: #141827;
        border-radius: 6px 0px 0px 6px;
        font-size: 24px;
        line-height: 50px;
        letter-spacing: 2px;
        color: #099cf0;
        writing-mode: vertical-lr;
        flex-shrink: 0;
        text-align: center;
    }
    .box {
        flex-grow: 1;

        .warning {
            background-color: rgba(255, 0, 0, 0.4);
            box-shadow: 0 0 2px 1px #ff0000 inset;
            border-radius: 0px 6px 0px 0px;
            &.stick {
                background: none;
            }
            .ct {
                color: #ffffff;
            }
            .cr {
                background-position: 0px 0px;
                color: #ff0000;
            }

            /*border: solid 1px #454d61;*/
        }
        .b2.warning {
            border-radius: 0px 0px 6px 0px;
        }
        .b1 {
            height: 246px;
            border-bottom: solid 1px #454d61;
            margin-bottom: -1px;
            .ct {
                margin-top: 36px;
            }
        }
        .b2 {
            height: 154px;
            .ct {
                margin-top: 32px;
            }
            .status {
                display: inline-block;
                width: 52px;
                height: 52px;
                background: url('../assets/img/sta.png');
                background-position: 89px -250px;
                vertical-align: middle;
                margin-left: 10px;
                &.red {
                    background-position: -38px -250px !important;
                }
            }

        }
        .ct {
            letter-spacing: 2px;
            text-align: center;
            color: #099cf0;
        }
        .cb {
            letter-spacing: 2px;
            text-align: center;
            margin-top: 20px;
        }
        .cr {
            width: 130px;
            height: 120px;
            line-height: 120px;
            margin: 16px auto 0 auto;
            text-align: center;
            font-size: 32px;
            letter-spacing: 2px;
            background: url('../assets/img/sta.png');
            background-position: 130px 0px;
        }

    }

</style>