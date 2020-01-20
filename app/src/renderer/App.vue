<template>
  <div id="app" @focusin="openKeybord" :class="$store.state.app.language">
    <router-view></router-view>
  </div>
</template>

<script>
  // const child = require('child_process')
  const { webFrame } = require('electron')
  // const { ipcRenderer } = require('electron')
  // const fs = require('fs')
  webFrame.setVisualZoomLevelLimits(1, 1)
  export default {
    name: 'ai_pad',
    data () {
      return {
        centerDialogVisible: false,
        lang: true
      }
    },
    methods: {
      openKeybord (e) {
        if (e.target.tagName !== 'INPUT' ||
          e.target.readOnly ||
          e.target.classList.contains('el-checkbox__original') ||
          e.target.classList.contains('el-radio__original') ||
          e.target.parentElement.classList.contains('el-date-editor--date') ||
          e.target.parentElement.parentElement.classList.contains('el-select')
        ) {
          return true
        }
        this.$keybord({
          val: e.target.value,
          sucesss (d) {
            console.log(d)
            e.target.value = d
            e.target.dispatchEvent(new Event('input'))
            e.target.dispatchEvent(new Event('blur'))
          }
        })
      }
    },
    created () {
      // var that = this
      // let client = this.$client
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
  /* CSS */
  #app{
      width: 100%;
      height: 100%;
  }

</style>
