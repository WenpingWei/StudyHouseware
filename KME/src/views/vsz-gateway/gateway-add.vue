<template>
  <modify :modules="modules"></modify>
</template>

<script>
import gatewayModule from "@/views/vsz-gateway/gateway-module";
export default {
  components: {
    modify: gatewayModule
  },
  data() {
    return {
      modules: {
        id: "",
        solutionName: "",
        customerId: ""
      }
    };
  }
};
</script>

<style>
</style>
