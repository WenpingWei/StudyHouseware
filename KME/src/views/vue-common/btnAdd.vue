<template>
  <el-button  class="filter-item" type="primary">
    {{name}}
  </el-button>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'App',
  data: function () {
      return {
        name: this.title || "新增触发器"
      }
  },
  props: ['title'],
  methods: {},
  components: {},
  mounted: function () {
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
