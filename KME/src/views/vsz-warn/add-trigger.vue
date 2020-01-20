<template>
  <add-edit-tem title="新增"></add-edit-tem>
</template>
<script>
import addEditTem from "@/views/vsz-warn/add-edit-tem.vue";
export default {
  name: 'home',
  data() {
    return {
    }
  },

  created() {
    // this.fetchData()
  },
  computed:{

  },
  components: {
    'add-edit-tem': addEditTem
  },
  methods: {

  },
  mounted() {
//    console.log(this.$route.query.triggerId)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
