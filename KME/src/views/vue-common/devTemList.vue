<template>
  <el-select slot="enabled"  v-model="deviceTemplateId" @change="changeTemId">
    <el-option v-for="item in devList" :value="item.id" :key="item.id" :label="item.tplName"/>
  </el-select>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'App',
    data: function () {
      return {
        deviceTemplateId: this.devId,
        devList: []
      }
    },
    props: ['devId'],
    methods: {
      changeTemId (val) {
        this.$emit('changeId', val)
      }
    },
    components: {},
    mounted: function () {
      this.common.getList(this, '/dev/template/list', '', res => {
        this.devList = res.list;
        this.devList.unshift({
          id: '',
          tplName: '设备模板'
        });
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
