<template>
<!--设备状态-->
  <el-select slot="enabled" v-model="statusDevId" @change="changeId">
    <el-option v-for="item in deviceStatusList" :value="item.id" :key="item.id" :label="item.name"/>
  </el-select>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'App',
  data: function () {
    return {
      statusDevId: this.statusId,
      deviceStatusList: [
        {
          id: '',
          name: '设备状态'
        },
        {
          id: 0,
          name: '在线设备'
        },
        {
          id: 1,
          name: '离线设备'
        },
        {
          id: 2,
          name: '故障设备'
        }
      ]
    }
  },
  props: ['statusId'],
  methods: {
    changeId (val) {
      this.$emit('changeStatus', val)
    }
  },
  components: {},
  mounted: function () {
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
