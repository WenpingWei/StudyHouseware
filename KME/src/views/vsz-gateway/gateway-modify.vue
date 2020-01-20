<template>
  <modify :modules="modules" />
</template>

<script>
import gatewayModule from '@/views/vsz-gateway/gateway-module'
export default {
  components: {
    modify: gatewayModule
  },
  data() {
    return {
      modules: {
        customerId: '',
        iccid: '',
        id: '',
        name: '',
        snNumber: '',
        state: 0,
        version: ''
      }
    }
  },
  mounted: function() {
    const cid = this.$route.query.id
    this.getListData(cid)
  },
  methods: {
    // 获取一条数据
    getListData: function(cid) {
      const that = this
      that.$ajax
        .get($$('/gateway'), { params: { id: cid }})
        .then(function(data) {
          that.modules.customerId = data.data.data.customerId
          that.modules.iccid = data.data.data.iccid
          that.modules.id = data.data.data.id
          that.modules.name = data.data.data.name
          that.modules.snNumber = data.data.data.snNumber
          that.modules.state = data.data.data.state
          that.modules.version = data.data.data.version
        })
    }
  }
}
</script>

<style>
</style>
