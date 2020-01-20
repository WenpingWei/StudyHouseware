<template>
    <transition name="fd">
        <div class="keyboard" v-show="visible">
            <div class="key-top-box">
                <input class="input-text" spellcheck="false" v-model="istr" readonly/>
            </div>
            <div class="input-box">
                <input id="inputview" type="text" spellcheck="false" v-model="itxt" class="" readonly>
                <div class="ul" v-show="lang">
                    <button class="list" v-for="(zh, i) in lists" @click="write(zh)" :class="{hilight: i === 0}">{{zh}}</button>
                    <!--<button class="list">值</button>-->
                    <!--<button class="list">至</button>-->
                    <!--<button class="list">智</button>-->
                    <!--<button class="list">值</button>-->
                </div>
                <div v-show="lang">
                    <button class="keybtn grey iconfont icon-fanye- wh" @click="prev"></button>
                    <button class="keybtn grey wh" @click="next" style="margin-left:10px"><span class="iconfont icon-fanye-" style="font-size:48px; transform: rotate(180deg);display: block;pointer-events: none"></span> </button>
                </div>
            </div>
            <div class="key-down-box" @mousedown="keysClick">
                <template v-if="shift">
                    <button class="keybtn" data-key="!">!</button>
                    <button class="keybtn  iconfont icon-konggejian-" data-key="space"></button>
                    <button class="keybtn" data-key="#">#</button>
                    <button class="keybtn" data-key="_">_</button>
                    <button class="keybtn" data-key="%">%</button>
                    <button class="keybtn" data-key="-">-</button>
                    <button class="keybtn" data-key="/">/</button>
                    <button class="keybtn" data-key="(">(</button>
                    <button class="keybtn" data-key=")">)</button>
                    <button class="keybtn" data-key="ø">Ø</button>
                </template>
                <template v-else>
                    <button class="keybtn" data-key="1">1</button>
                    <button class="keybtn" data-key="2">2</button>
                    <button class="keybtn" data-key="3">3</button>
                    <button class="keybtn" data-key="4">4</button>
                    <button class="keybtn" data-key="5">5</button>
                    <button class="keybtn" data-key="6">6</button>
                    <button class="keybtn" data-key="7">7</button>
                    <button class="keybtn" data-key="8">8</button>
                    <button class="keybtn" data-key="9">9</button>
                    <button class="keybtn" data-key="0">0</button>
                </template>
                <button class="keybtn grey" data-key=".">.</button>

                <button class="keybtn" data-key="q">{{shift ? 'Q' : 'q' }}</button>
                <button class="keybtn" data-key="w">{{shift ? 'W' : 'w' }}</button>
                <button class="keybtn" data-key="e">{{shift ? 'E' : 'e' }}</button>
                <button class="keybtn" data-key="r">{{shift ? 'R' : 'r' }}</button>
                <button class="keybtn" data-key="t">{{shift ? 'T' : 't' }}</button>
                <button class="keybtn" data-key="y">{{shift ? 'Y' : 'y' }}</button>
                <button class="keybtn" data-key="u">{{shift ? 'U' : 'u' }}</button>
                <button class="keybtn" data-key="i">{{shift ? 'I' : 'i' }}</button>
                <button class="keybtn" data-key="o">{{shift ? 'O' : 'o' }}</button>
                <button class="keybtn" data-key="p">{{shift ? 'P' : 'p' }}</button>
                <button class="keybtn grey iconfont icon-shanchu-" data-key="del"></button>

                <button class="keybtn iconfont icon-jiantou-" data-key="shift" :class="{hilight: shift}"></button>
                <button class="keybtn" data-key="a">{{shift ? 'A' : 'a' }}</button>
                <button class="keybtn" data-key="s">{{shift ? 'S' : 's' }}</button>
                <button class="keybtn" data-key="d">{{shift ? 'D' : 'd' }}</button>
                <button class="keybtn" data-key="f">{{shift ? 'F' : 'f' }}</button>
                <button class="keybtn" data-key="g">{{shift ? 'G' : 'g' }}</button>
                <button class="keybtn" data-key="h">{{shift ? 'H' : 'h' }}</button>
                <button class="keybtn" data-key="j">{{shift ? 'J' : 'j' }}</button>
                <button class="keybtn" data-key="k">{{shift ? 'K' : 'k' }}</button>
                <button class="keybtn" data-key="l">{{shift ? 'L' : 'l' }}</button>
                <button class="keybtn grey " data-key="clear">CL</button>

                <button class="keybtn black iconfont icon-jianpan-" data-key="win"></button>
                <button class="keybtn" data-key="lang">{{lang?'cn':'en'}}</button>
                <button class="keybtn" data-key="z">{{shift ? 'Z' : 'z' }}</button>
                <button class="keybtn" data-key="x">{{shift ? 'X' : 'x' }}</button>
                <button class="keybtn" data-key="c">{{shift ? 'C' : 'c' }}</button>
                <button class="keybtn" data-key="v">{{shift ? 'V' : 'v' }}</button>
                <button class="keybtn" data-key="b">{{shift ? 'B' : 'b' }}</button>
                <button class="keybtn" data-key="n">{{shift ? 'N' : 'n' }}</button>
                <button class="keybtn" data-key="m">{{shift ? 'M' : 'm' }}</button>
                <button class="keybtn colspan grey iconfont icon-enterjian-" data-key="done"></button>

            </div>

        </div>
    </transition>
</template>
<script>
    import { debounce } from 'lodash'
    import simpleZh from '@/lang/chinese-pynsimpl.js'
    export default {
      name: 'keybord',
      data () {
        return {
          visible: false,
          istr: '', // 文本输入框
          itxt: '', // 拼音预览框
          shift: false,
          lang: false, // 中文true
          page: 0,
          arrs: [],
          sucesss: function () {}
        }
      },
      computed: {
        count () {
          return Math.ceil(this.arrs.length / 5)
        },
        lists () {
          let start = this.page * 5
          let end = start + 5
          return this.arrs.slice(start, end)
        },
        deferGetList () {
          return debounce(this.search, 200, { 'maxWait': 1000 })
        }
      },
      methods: {
        search () {
          let key = this.itxt
          this.page = 0
          if (simpleZh[key]) {
            this.arrs = simpleZh[key].split('')
            // console.log(key, this.arrs)
          } else {
            this.arrs = []
          }
        },
        write (str) {
          this.istr = this.istr + str
          this.itxt = ''
        },
        prev () {
          if (this.page > 0) {
            this.page--
          }
        },
        next () {
          if (this.page < this.count - 1) {
            this.page++
          }
        },
        cancel () {
          this.arrs = []
          this.lang = false
          this.visible = false
          this.shift = false
          this.itxt = ''
        },
        close () {
          this.sucesss(this.istr)
          this.arrs = []
          this.lang = false
          this.visible = false
          this.shift = false
          this.itxt = ''
        },
        keysClick (e) {
          let key = e.target.dataset.key
          if (e.target.tagName !== 'BUTTON') {
            return false
          }
          // 按键是shift
          if (key === 'shift') {
            this.shift = !this.shift
            return false
          }
          // 按键是lang
          if (key === 'lang') {
            this.lang = !this.lang
            this.itxt = ''
            return false
          }
          // 按键是del
          if (key === 'del') {
            if (this.itxt) {
              this.itxt = this.itxt.slice(0, -1)
              this.search()
            } else if (this.istr) {
              this.istr = this.istr.slice(0, -1)
            }
            return false
          }
          // 按键win 关闭键盘
          if (key === 'win') {
            this.cancel()
            return false
          }
          // 按键done 选择第一个字
          if (key === 'done') {
            this.close()
            if (this.lang && this.lists.length > 1) {
              this.write(this.lists[0])
            }
            return false
          }
          // 空格键
          if (key === 'space') {
            console.log('space')
            this.write(' ')
            return
          }
          if (key === 'clear') {
            this.istr = ''
            return
          }
          // 才进入输入处理流程
          if (this.lang) {
            // 中文键盘处理
            // 数字键选择汉字
            console.log(key.charCodeAt(0))
            // if (!isNaN(key)) {
            //   let i = parseFloat(key)
            //   if (i > 0 && i <= this.lists.length) {
            //     this.write(this.lists[i - 1])
            //   }
            //   return
            // }
            if (key >= 'a' && key <= 'z') {
              this.itxt = this.itxt + key
              this.deferGetList()
            } else {
              this.istr = this.istr + key
            }
          } else {
            if (this.shift) {
              key = key.toUpperCase()
            }
            this.istr = this.istr + key
            // 英文键盘处理
          }
        }
      }
    }
</script>
<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: transform .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translate3d(0, 100%, 0);
    }
    .keyboard {
        width: 100%;
        height: 100%;
        background: #e6e9f0;
        font-size: 48px;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 9999;
        button {
            cursor: pointer;
        }
    }
    .key-top-box {
        height: 158px;
        background-color: #ced2db;
        padding: 20px;
        box-sizing: border-box;
    }
    .input-text {
        background: #ffffff;
        border-radius: 8px;
        height: 100%;
        display: block;
        width: 100%;
        border: none;
        font-size: 48px;
        box-sizing: border-box;
        padding: 0 20px;
    }
    .input-box {
        height: 158px;
        padding: 30px 20px;
        display: flex;
        box-sizing: border-box;
        border-bottom: 1px solid  #81818b;
        align-items: center;
    }
    .input-box input {
        box-sizing: border-box;
        width: 206px;
        height: 90px;
        border-radius: 8px;
        border: none;
        font-size: 40px;
        padding: 0 20px;

    }
    .ul {
        width: 560px;
        margin: 0 18px;
        counter-reset: count 0;
        display: flex;
    }
    .list {
        margin:0 18px;
        border: none;
        padding: 0;
        border: none;
        font-size: 40px;
        background: none;

    }
    .list.hilight {
        color: #2790fd
    }
    .list::before {
        content: counter(count,decimal) ".";
        counter-increment: count;

    }
    .key-down-box {
        /*height: 642px;*/
        height: 440px;
        padding: 20px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: repeat(11, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 12px;

    }
    :focus {
        outline: none;
    }
    .keybtn {
        /*min-width: 100px;*/
        /*height: 100px;*/
        /*line-height: 100px;*/
        background-image: linear-gradient(
                        #f3f5f9,
                        #f3f5f9),
        linear-gradient(
                        #8fb9e5,
                        #8fb9e5);
        background-blend-mode: normal,
        normal;
        box-shadow: 0px 4px 3px 0px
        rgba(0, 0, 0, 0.35);
        border-radius: 8px;
        border: solid 1px #ced2db;

        font-family: MicrosoftYaHei;
        font-size: 48px;
        font-weight: normal;
        font-stretch: normal;
        text-align: center;

        /*letter-spacing: 5px;*/
        color: #191d24;
    }
    .keybtn.wh {
        height: 80px;
        width: 78px;
    }
    .keybtn.hilight {
        color: #2790fd
    }
    .keybtn.grey {
        background-image: linear-gradient(
                        #cacdd4,
                        #cacdd4),
        linear-gradient(
                        #8fb9e5,
                        #8fb9e5);
    }
    .keybtn.black {
        color: #ffffff;
        /*width: 100px;*/
        /*height: 100px;*/
        background-image: linear-gradient(
                        #44464a,
                        #44464a),
        linear-gradient(
                        #8fb9e5,
                        #8fb9e5);
        background-blend-mode: normal,
        normal;
        box-shadow: 0px 4px 3px 0px
        rgba(0, 0, 0, 0.35);
        border-radius: 8px;
    }
    .keybtn:active {
        background-image: linear-gradient(
                        #f3f5f9,
                        #f3f5f9),
        linear-gradient(
                        #8fb9e5,
                        #8fb9e5);
        background-blend-mode: normal,
        normal;
        box-shadow: 0px 1px 3px 0px
        rgba(0, 0, 0, 0.35);
        border-radius: 8px;
        border: solid 1px #ced2db;
    }
    .colspan {
        grid-column-start: span 2;
    }

</style>