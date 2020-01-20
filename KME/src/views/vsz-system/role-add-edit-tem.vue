<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="home-container">
    <div class="contain-content">
      <div class="left-add">
        <div class="add-header">
          <el-button
            v-if="modules.id"
            class="filter-item"
            type="primary"
            style="border-radius: 10px 0 0 0;"
          >编辑角色</el-button>
          <el-button
            v-else
            class="filter-item"
            type="primary"
            style="border-radius: 10px 0 0 0;"
          >新增角色</el-button>
        </div>
        <div class="add-content" :class="{'active': !editorUpload}">
          <el-form
            ref="ruleForm"
            :model="modules"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="角色名称:" prop="name">
              <el-input
                v-model="modules.name"
                style="width: 60%;margin-left: 4px;"
                class="filter-item"
              />
            </el-form-item>
            <el-form-item label="角色描述:" prop="description">
              <el-input
                v-model="modules.description"
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                maxlength="200"
                resize="none"
                show-word-limit
              />
              <span style="color:#ffffff;position: relative;right: 50px;">{{modules.description.length}}/200</span>
            </el-form-item>
            <el-form-item label="权限设置:">
              <div class="permission-list">
                <el-tree
                  ref="tree"
                  :data="data"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2, 3]"
                  :props="defaultProps"
                />
              </div>
            </el-form-item>
            <div style="text-align: center;padding: 15px 0;">
              <el-button class="filter-item" type="primary" @click="submitForm('ruleForm')">确认</el-button>
              <el-button class="filter-item" type="danger" @click="resetFilter">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      editorUpload: true,
      modules: {
        id: this.$router.history.current.query.roleId,
        name: '',
        description: '' // 备注
      },
      rules: {
        name: [
          {
            required: true,
            pattern: /^(?!_)[\u4e00-\u9fa5]{1,20}$/,
            message: '请输入1-20个汉字以内的字符',
            trigger: 'blur'
          }
        ],
      },
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        },
        {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        },
        {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
      defaultProps: {
        children: 'sons',
        label: 'name'
      }
    }
  },
  created() {
    // this.fetchData()
  },
  mounted: function() {
    this.menuList() // 菜单列表

    if (!this.$router.history.current.query.roleId) {
      return
    }
    this.searchRoleDetail() // 获取角色详情
  },
  methods: {
    resetFilter: function() {
      this.$router.push(`system2`)
    },
    changeCustom(id) {
      this.modules.customerId = id
    },
    // 编辑数据模板
    submitForm(formName) {
      const that = this
      const index = this.$refs.tree.getCheckedKeys().filter(v => {
        return v === 'AE91AD1B4F17F29CAD010A726108F4D4'
      })
      if (this.$refs.tree.getCheckedKeys().length === 0) {
        this.$message.error('权限设置列表不能为空哦!')
      }
      if (index.length === 0) {
        this.$message.error('首页必须勾选哦!')
        return false
      }
      that.$refs[formName].validate(valid => {
        // console.log(valid)
        if (valid) {
          if (that.modules.id) {
            that.$ajax
              .put($$('/role'), that.modules)
              .then(res => {
                const obj = {
                  targetId: this.$router.history.current.query.roleId,
                  bindIds: this.$refs.tree.getCheckedKeys()
                }
                if (res.data.status === 200) {
                  this.$ajax.post($$('/role/menu/bind'), obj).then(re => {
                    if (re.data.status === 200) {
                      this.$message({
                        message: '修改成功！',
                        type: 'success'
                      })
                      this.$router.push(`/system/system2`)
                    }
                  })
                } else {
                  that.$message.error(res.data.message)
                }
              })
          } else { // 新增
            that.$ajax
              .post($$('/role'), that.modules)
              .then(res => {
                const obj = {
                  targetId: res.data.data,
                  bindIds: this.$refs.tree.getCheckedKeys()
                }
                if (res.data.status === 200) {
                  this.$ajax.post($$('/role/menu/bind'), obj).then(re => {
                    console.log(res)
                    if (re.data.status === 200) {
                      this.$message({
                        message: '添加成功！',
                        type: 'success'
                      })
                      this.$router.push(`/system/system2`)
                    }
                  })
                } else {
                  that.$message.error(res.data.message)
                }
              })
          }
        } else {
          return false
        }
      })
    },
    // 查询角色详情
    searchRoleDetail() {
      this.$ajax({
        url: $$('/role'),
        method: 'get',
        params: {
          id: this.$router.history.current.query.roleId
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.modules.name = res.data.data.name
          this.modules.description = res.data.data.description

          // const arr = []
          // if (!res.data.data.menuList) {
          //   return false
          // }
          // res.data.data.menuList.map(v => {
          //   arr.push(v.id)
          // })
          this.$refs.tree.setCheckedKeys(res.data.data.menuids);
        }
      })
    },
    menuList() {
      this.$ajax({
        url: $$('/sys/menu/list/tree'),
        method: 'get'
      }).then(res => {
        if (res.data.status === 200) {
          this.data = res.data.data
          // this.$refs.tree.setCheckedKeys('AE91AD1B4F17F29CAD010A726108F4D4');
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .active {
    display: none;
  }
  .contain-content {
    display: flex;
    justify-content: space-between;
    width: 98%;
    margin: 30px auto;
  }
  .home-container {
    width: 100%;
    overflow: hidden;
  }
  .left-add {
    width: 98%;
    height: auto;
    border-radius: 10px 0 0 0;
    background: #1b2333;
  }
  .add-header {
    height: 38px;
    width: 100%;
    background: #273753;
    border-radius: 10px 0 0 0;
    overflow: hidden;
  }
  .add-header-span {
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  .add-content {
    width: 80%;
    margin: 30px auto;
  }
  .upload-content {
    width: 90%;
    margin: 30px auto;
  }
  .download {
    font-size: 14px;
    color: #009dd9;
    text-decoration: underline;
    position: absolute;
    top: 0;
    left: 70px;
  }
  .right-container {
    width: 32%;
  }
  .img-wrapper {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    width: 300px;
    height: 200px;
    background: #233149;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .font-color {
    color: #fff;
  }
  .upload-device {
    display: inline-block;
    >>>.el-upload {
      width: 82px;
      height: 29px;
      line-height: 29px;
      background: none;
      border: none;
    }
  }
  .el-textarea {
    width: 60%;
    margin-left: 0.4%;
    color: #b2bdcd
  }
  .el-textarea__inner {
    color: #b2bdcd
  }
  .permission-list {
    height: 600px;
    width: 60%;
    overflow-y: scroll;
    background: #273653;
    margin-left: 0.4%;
    border-radius: 5px;
    .el-tree {
      background: none;
      color: #b1bdcd;
      font-size: 14px;
    }
  }
</style>
