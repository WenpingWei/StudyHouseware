<template>
  <el-button :plain="true"  class="filter-item" type="danger" slot="delete"  @click="delMore">
    {{title}}
  </el-button>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'App',
  data: function () {
    return {}
  },
  props: ['title'],
  methods: {
    delMore () {
      this.$emit('del')
    }
  },
  components: {},
  mounted: function () {
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
