<template>
  <el-select v-model="customerId" @change="changeId">
    <el-option v-for="item in customList" :key="item.id" :value="item.id" :label="item.customerName" />
  </el-select>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'App',
  components: {},
  props: ['customId', 'title'],
  data: function() {
    return {
      customerId: this.customId,
      customList: []
    }
  },
  mounted: function() {
    this.common.getList(this, '/custom/customer/page', {getPage:0}, res => {
      this.customList = res.list
      this.customList.unshift({
        id: '',
        customerName: this.title || '所有客户'
      })
    })
  },
  methods: {
    changeId(val) {
      //      console.log(val);
      this.$emit('changeCustom', val)
    }
  }
}
</script>
<style scoped>

</style>
