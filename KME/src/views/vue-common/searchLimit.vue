<template>
  <div class="list-header">
    <div class="list-search">
      <slot name="add"></slot>
      <slot name="delete"></slot>
    </div>
    <div class="list-search">
      <slot name="enabled"></slot>
      <slot name="device"></slot>
      <slot name="custom"></slot>
      <slot name="online"></slot>
      <el-input v-model="input3" class="input-with-select" placeholder="请输入内容">
        <el-select v-model="defalutIds" slot="prepend" placeholder="请选择" @change="handleId" class="select-width">
          <el-option :label="item[name]" :value="item.id" v-for="item in list" :key="item.id"></el-option>
        </el-select>
        <el-button slot="append" type="primary" @click="searchInput" class="search">搜索</el-button>
      </el-input>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
    name: 'App',
    data: function () {
        return {
          input3: '',
          defalutIds: '',
          deviceSelect: '35973F9D903099A74A9175B497D86617',
        }
    },
   props: ['list', 'name', 'defalutId'],
    methods: {
      searchInput () {
        this.$emit('search', this.input3)
      },
      handleId () {
        this.$emit('limitSelect', this.defalutIds)
      }
    },
    components: {},
    mounted: function () {
      this.defalutIds = this.defalutId;
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*width: 100%;*/
    /*height: 70px;*/
    width: 98%;
    margin 0 auto
    /*line-height: 70px;*/
    .list-search {
      margin-top: 15px;
      display: flex;
      align-items: center;
      .input-with-select {
        margin-left 10px
        /*width 40%*/
      }
      .select-width {
        width 120px
      }
    }
    .search {
      background: #1890ff;color: white;border-radius: 0 5px 5px 0
    }
  }
</style>
