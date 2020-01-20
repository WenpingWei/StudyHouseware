<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="home-container">
    <div class="contain-content">
      <div class="left-container">
        <p class="square">
          <el-button  class="filter-item" type="primary">
            {{title}}触发器
          </el-button>
        </p>
        <el-form :label-position="labelPosition" :rules="rules" label-width="100px" class="demo-ruleForm" ref="ruleForm" :model="ruleForm">
          <el-form-item label="触发器名称" prop="triggerName">
            <el-input v-model="ruleForm.triggerName"  style="width: 50%;"></el-input>
          </el-form-item> 
          <el-form-item label="选择数据点" prop="point" class="tree-page-contain" >
            <vs-select-tree v-if="list.length >0"
              :props="props"
              :options="list"
              :value="ruleForm.point"
              :clearable="isClearable"
              :accordion="isAccordion"
              @getValue="getValue($event)"></vs-select-tree>
          </el-form-item>
          <el-form-item label="触发条件" prop="conditionStatement">
            <el-input v-model="ruleForm.conditionStatement" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="告警描述" prop="mark">
            <el-input v-model="ruleForm.mark" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-switch
              v-model="ruleForm.status">
            </el-switch>
          </el-form-item>

          <el-form-item label="设备选择" prop="status">
            <div class="table-prop-contain">
              <div class="select-contain">
                <vs-search-limit :list="deviceList"  name="name" @search="searchContent" @limitSelect="handleLimitSearch" :defalutId="defalutId">
                  <vs-custom-list slot="add" @changeCustom="handleId" :customId="limit.customerId"></vs-custom-list>
                  <vs-dev-list slot="delete" @changeId="handleDevid" :devId="limit.deviceTemplateId" style="margin-left: 10px"></vs-dev-list>
                </vs-search-limit>
              </div>
              <vs-table v-if="tableData.list && tableData.list.length > 0"
                        @changeTable="handleTableId"
                        :tableData="tableData"
                        :ids="deviceIds"
                        :colConfigs="colConfigs" @changeNum="handleNum">
                <el-table-column slot="checkbox"
                                 type="selection"
                                 width="55">
                </el-table-column>
              </vs-table>
            </div>
          </el-form-item>

          <div class="align-button-center">
            <template v-if="title === '新增'">
              <el-button  class="filter-item" type="primary" @click="submitForm('ruleForm', 'add')">继续新增</el-button>
            </template>
            <el-button  class="filter-item" type="primary" @click="submitForm('ruleForm')">确认</el-button>
            <el-button  class="filter-item" type="danger" @click="resetWarn">取消</el-button>
          </div>
        </el-form>
      </div>
      <div class="right-container">
        <p class="square">
          <span>字段解释模板</span>
        </p>
        <div class="right-content">
          <h2>选择数据点：</h2>
          <div class="msg">根据添加的数据点或者数据模板分类，选择一个已有的数据点；</div>
          <h2>触发条件：</h2>
          <div class="msg">根据告警需求，对采集数据点的数据值进行判断，利用一定规则的表达
            式公式，进行触发的判断；</div>
          <h2>告警描述：</h2>
          <div class="msg">更加告警需求，对满足触发条件的告警，进行稍微详细的文字描述；</div>
        </div>
        <template v-if="title === '新增'">
          <p class="square mg-t-20">
            <span>快速指南</span>
          </p>
          <div class="height-240">
            <div class="zn-content">
              <router-link to="/equipmentManage/menu2">
                <div>
                  <img src="../../assets/images/pt-icon11.png" alt="">
                  <div class="msg">设备添加</div>
                </div>
              </router-link>
              <img src="../../assets/images/arrow.png" alt="" class="arrow">
              <router-link to="/warnMessage/warn3">
                <div>
                  <img src="../../assets/images/pt-icon12.png" alt="">
                  <div class="msg">触发点管理</div>
                </div>
              </router-link>
              <img src="../../assets/images/arrow.png" alt="" class="arrow">
              <router-link to="/equipmentManage/menu2">
                <div>
                  <img src="../../assets/images/pt-icon13.png" alt="">
                  <div class="msg" style="margin-top: 24px;">中性管理</div>
                </div>
              </router-link>
              <img src="../../assets/images/arrow.png" alt="" class="arrow">
              <router-link to="/equipmentManage/menu2">
                <div>
                  <img src="../../assets/images/pt-icon14.png" alt="">
                  <div class="msg">视频监控 维保管理</div>
                </div>
              </router-link>
              <img src="../../assets/images/arrow.png" alt="" class="arrow">
              <router-link to="/equipmentManage/menu2">
                <div>
                  <img src="../../assets/images/pt-icon15.png" alt="">
                  <div class="msg">工作圈管理</div>
                </div>
              </router-link>
            </div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>
<script>
  import table from '@/views/vue-common/table.vue'
  import SelectTree from "@/views/vue-common/selectTree.vue";
  export default {
    name: 'home',
    data() {
      this.colConfigs = [
        { prop: 'deviceName', label: '设备名称'},
        { prop: 'customerName', label: '所属客户'},
        { prop: 'customerAddr', label: '客户地址'},
        { prop: 'tplName', label: '设备模板'}
      ];
      return {
        labelPosition: 'right',
        tableData: [],
        currentPage: 1,
        list: [],
        isClearable:true,     // 可清空（可选）
        isAccordion:true,     // 可收起（可选）
        props:{               // 配置项（必选）
          value: 'id',
          label: 'pointName',
          children: 'points',
        },
        defalutId: 1,
        deviceList: [
          {
            name: '设备名称',
            id: 1
          },
          {
            name: '客户名称',
            id: 2
          }
        ],
        ruleForm: {
          triggerName: '',
          conditionStatement: '',
          mark: '',
          status: true,
          point: ''
        },
        treeShow: false,
        rules: {
          triggerName: [
            {required: true, message: '请输入触发器名称', trigger: 'blur' }
          ],
          point: [
            {required: true, message: '请选择数据点', trigger: 'change' }
          ],
          conditionStatement: [
            {required: true, message: '请输入触发条件', trigger: 'blur' }
          ],
          mark: [
            {required: true, message: '请输入告警描述', trigger: 'blur' }
          ]
        },
        limit: {
          customerId: '',
          deviceTemplateId: '',
          content: ''
        },
        selectTableId: [],
        deviceIds: [], //选中的设备
        targetId: '' //绑定目标，填入的触发器的id
      }
    },
    props: ['title', 'triggerList'],
    created() {
      // this.fetchData()
    },
    computed:{
      /* 转树形数据 */
      optionData(){
//        let cloneData = JSON.parse(JSON.stringify(this.list))      // 对源数据深度克隆
//        return  cloneData.filter(father=>{                      // 循环所有项，并添加children属性
//          let branchArr = cloneData.filter(child=>father.id == child.parentId);       // 返回每一项的子级数组
//          branchArr.length>0 ? father.children=branchArr : ''   //给父级添加一个children属性，并赋值
//          return father.parentId==0;      //返回第一层
//        });
        return this.list
      }
    },
    components: {
      'vs-table': table,
      'vs-select-tree': SelectTree
    },
    methods: {
      submitForm(formName, str) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              triggerName: this.ruleForm.triggerName,
              conditionStatement: this.ruleForm.conditionStatement,
              mark: this.ruleForm.mark,
              status: this.ruleForm.status === true ? 1 : 0,
              pointId: this.ruleForm.point
            };
            let url = '';
            if (this.$route.query.triggerId) { //编辑页面
              url = $$('/alarm/trigger/edit');
              data.id = this.$route.query.triggerId;
            } else { //添加
              url = $$('/alarm/trigger')
            }
            this.$ajax({
              method: 'post',
              url: url,
              data: data,
            }).then(res => {
              if (res.data.status === 200) {
                if (this.$route.query.triggerId) {
                  if (this.selectTableId) {
                    this.bindDeviceFun();
                  } else {
                    this.$router.push(`/warnMessage/warn2`);
                  }
                }
                else {
                  this.targetId = res.data.data
                  if (this.selectTableId.length === 0) {
                    if (str === 'add') {
                      this.$message({
                        message: '添加成功',
                        type: 'success'
                      });
                      this.ruleForm.triggerName = ''
                      this.ruleForm.conditionStatement = ''
                      this.ruleForm.mark = ''
                      this.ruleForm.status = true
                    } else {
                      this.$router.push(`/warnMessage/warn2`);
                    }
                  } else {
                    this.bindDeviceFun('add');
                    if (str === 'add') {
                      this.$message({
                        message: '添加成功',
                        type: 'success'
                      });
                      this.ruleForm.triggerName = ''
                      this.ruleForm.conditionStatement = ''
                      this.ruleForm.mark = ''
                      this.ruleForm.status = true
                    }  else {
                      this.$router.push(`/warnMessage/warn2`);
                    }
                  }
                }
              } else {
                this.$message.error(res.data.message);
              }
            }).catch(res => {
            });
          } else {
//            console.log('error submit!!');
            return false;
          }
        });
      },
      resetWarn () {
        this.$router.push(`/warnMessage/warn2`);
      },
      bindDeviceFun (str) {
        this.$ajax({
          method: 'post',
          url: $$('/alarm/trigger/bindDevice'),
          data: {
            bindIds: this.selectTableId, //设备id
            pointId: this.ruleForm.point,
            targetId: this.targetId
          },
        }).then(res => {
          if (res.data.status !== 200) {
            this.$message.error(res.data.message);
          } else {
            if (str === 'add') {
              this.ruleForm.triggerName = ''
              this.ruleForm.conditionStatement = ''
              this.ruleForm.mark = ''
              this.ruleForm.status = true
              this.deviceIds = [];
            } else {
              this.$router.push(`/warnMessage/warn2`);
            }

          }
        })
      },
      getValue(value){
        this.ruleForm.point = value
        this.deviceTableList();
      },
      deviceTableList () {
        let data = {
          page: this.currentPage,
          rows: 10,
          customerId: this.limit.customerId,
          deviceTemplateId: this.limit.deviceTemplateId,
          pointId: this.ruleForm.point,
          type: this.defalutId,
          keyword: this.limit.content
        };
        this.common.getTableList(this, '/alarm/trigger/deploy/list', data, res => {
          this.tableData = res;
        })
      },
      handleNum (num) {
        this.currentPage = num;
        this.deviceTableList();
      },
      flagStatus (num) {
        return num === 0 ? false : true
      },
      //      筛选客户id
      handleId (val) {
        this.limit.customerId = val
        if (this.ruleForm.point) {
          this.deviceTableList();
        }
      },
//      筛选设备id
      handleDevid (val) {
        this.limit.deviceTemplateId = val
        if (this.ruleForm.point) {
          this.deviceTableList();
        }
      },
      handleLimitSearch (val) {
        this.defalutId = val
      },
      searchContent (val) {
        this.limit.content = val
        if (this.ruleForm.point) {
          this.deviceTableList();
        }

      },
//      获取数据点
      pointListInit () {
        this.common.getList(this, '/alarm/trigger/getDataTemplate', '', res => {
          this.list = res;
          res.map(v => {
            v.pointName = v.tplName
          })
        })
      },
      handleTableId (val) {
        this.selectTableId.length = 0;
        if (val) {
          val.map(v => {
            this.selectTableId.push(v.id)
          })
        }
      }
    },
    mounted () {
      this.pointListInit();
      if (this.$route.query.triggerId) {
        this.ruleForm = this.triggerList;
        this.ruleForm.point = this.triggerList.extra;
        this.deviceIds = this.triggerList.deviceIds;
        this.targetId = this.triggerList.id;
        if (this.ruleForm.point) {
          this.deviceTableList()
        }
        this.ruleForm.status = this.flagStatus(this.ruleForm.status);
      }


    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home-container {
    width 100%
    overflow hidden
    .contain-content {
      display flex
      justify-content space-between
      width 98%
      margin 30px auto
      .square {
        height 35px
        background #CFD3EC
        font-size 14px
        line-height 35px;
        span {
          padding-left 18px;
        }
        button {
          border-radius 0
        }
      }
      .mg-t-20 {
        margin-top 20px
      }
      .left-container {
        width 67%
        /*height 500px*/
        background #fff
        .tree-page-contain {
          position relative
          .tree-contain {
            position: absolute;
            z-index: 2;
            top: 39px;
            outline: 1px solid red;
            width: 100%;

          }
        }
      }
      .right-container {
        width 32%
        /*height 500px*/
        background #fff
        .right-content {
          margin-left 21px
          h2 {
            margin-top 29px
            font-size 14px
            font-weight bold
          }
          .msg {
            margin-top 10px
            font-size 14px
            line-height 30px
          }
        }
        .height-240 {
          /*height 240px*/
          background #fff
          margin-bottom 20px
          margin-top 20px
        }
        .zn-content {
          display flex
          width: 96%;
          margin: 0 auto;
          flex-wrap: wrap;
          text-align: center;
          a {
            margin-top 20px
          }
          /*align-items center*/
          .msg {
            font-size 14px
            text-align center
            margin-top 29px
            width: 70px;
            line-height: 18px;
          }
          .arrow {
            height 23px
            position: relative;
            top: 32px;
          }
        }
      }
    }

    .demo-ruleForm {
      margin 22px 5%
      .table-prop-contain {
        border 1px solid #bfbfbf
        border-radius 5px
        .select-contain {
          width 97%
          margin 10px auto
        }
        >>> .table-content {
              width 97%
              margin-top 10px
            }
      }
    }
    .align-button-center {
      text-align center
    }
  }

</style>
