<template>
  <div>
    <add-edit-tem title="编辑" v-if="editTriggerList" :triggerList="editTriggerList"></add-edit-tem>


  </div>
</template>
<script>
  import addEditTem from "@/views/vsz-warn/add-edit-tem.vue";
  export default {
    name: 'home',
    data() {
      return {
        editTriggerList: '',

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
      queryDetail () {
        let data = {
          id: this.$route.query.triggerId
        };
        this.common.getList(this, '/alarm/trigger/query', data, res => {
          this.editTriggerList = res;
//          console.log(res);
//          console.log(this.editTriggerList)
        })
      }
    },
    mounted() {
      if (this.$route.query.triggerId) {
        this.queryDetail();
      }
//      console.log(this.$route.query.triggerId)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
