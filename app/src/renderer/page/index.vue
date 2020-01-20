<template>
    <div class="pages">
        <vsHeader></vsHeader>
        <router-view></router-view>
		<!-- index下面有三个子路由 对应着一个router-view -->
    </div>
</template>

<script>
  import header from '@/components/header.vue'
  export default {
    name: 'landing-page',
    data () {
      return {
      }
    },
    components: {
      vsHeader: header
    },
    methods: {
    },
    created () {
    }
  }
</script>

<style scoped>


</style>
