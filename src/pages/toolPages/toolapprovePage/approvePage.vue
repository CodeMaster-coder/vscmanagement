<template>
    <div class="wholePage" @click="resetCurrentIndex">
      <div class="titleLine">
        <div class="title">工具领用申请</div>
        <div class="title">(tool request)</div>
      </div>
  
      <div class="bigbox">
        <div class="bigtempbox">
          <div class="tempbox">
            <div class="columnbox1">
              <div class="title">工具名称</div>
            </div>
            <div class="columnbox2">
              <div class="title">工具型号</div>
            </div>
            <div class="columnbox3">
              <div class="title">数量</div>
            </div>
            <div class="columnbox5">
              <div class="title">领用人</div>
            </div>
            <div class="columnbox4">
              <div class="title">单位</div>
            </div>
          </div>
          <div class="tempbox">
            <div class="columnbox1">
              <div class="title">Name</div>
            </div>
            <div class="columnbox2">
              <div class="title">Type</div>
            </div>
            <div class="columnbox3">
              <div class="title">Num</div>
            </div>
            <div class="columnbox5">
              <div class="title">Username</div>
            </div>
            <div class="columnbox4">
              <div class="title">Unit</div>
            </div>
          </div>
  
          <div class="tempbox" v-for="(item, index) in allRequestData" :key="index">
            <!-- <div class="contentlinebox" :key="index" :data-index="index" :data-id="item.id" @touchstart="touchStart" @touchend="touchEnd($event, index)"> -->
            <div class="contentlinebox" :key="index" :data-index="index" :data-id="item.id" >
              <div class="columnbox1">
                <div class="content">{{ item.materialName }}</div>
              </div>
              <div class="columnbox2">
                <div class="content">{{ item.materialModel }}</div>
              </div>
              <div class="columnbox3">
                <div class="content">{{ item.giveoutNum }}</div>
              </div>
              <div class="columnbox5">
                <div class="content" :data-index="index">{{ item.giveoutPcs}}</div>
              </div>
              <div class="columnbox4">
                <div class="content" :data-index="index" @click.stop="touchEnd($event, index)">{{ item.giveoutTime }}</div>
              </div>
  
              <div class="delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="delDialogVisible = true">
                <div class="content">删除(delete)</div>
              </div>
  
              <div class="delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="approveDialogVisible = true">
                <div class="content">批准(approve)</div>
              </div>
            </div>
          </div>
        </div>
        <el-dialog
        title="提示"
        :visible.sync="delDialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>确定删除领用请求数据？(Confirm delete apply data?)</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delDialogVisible = false">取 消(cancel)</el-button>
          <el-button type="primary" @click="delRequestData">确 定(confirm)</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="approveDialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>确定批准领用请求数据？(Confirm apply data?)</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="approveDialogVisible = false">取 消(cancel)</el-button>
          <el-button type="primary" @click="approveRequestData">确 定(confirm)</el-button>
        </span>
      </el-dialog>
      </div>
    </div>
  </template>
  
  <script>
  import store from '@/store'; // 导入 Vuex store
  //引入防抖文件
  import { antiShake } from '@/utils.js/utils_antishake.js';  
  export default {
    data() {
      return {
        currentItem: null,
        allRequestData: [], // 你的请求数据
        delDialogVisible: false,
        approveDialogVisible:false,
        index:null
      };
    },
    inject:['reload'],
    methods: {
      resetCurrentIndex() {
        // 重置当前索引的方法
        this.currentItem = null
        console.log(this.currentItem)
      },
      touchStart(event) {
        // 触摸开始的方法
        this.touchsx = event.changedTouches[0].screenX;
      },
      touchEnd(event,index) {
        console.log(index)
        // 触摸结束的方法
      // this.touchex = event.changedTouches[0].screenX;
      // 如果需要设置其他数据，可以像上面一样直接修改
      // this.touchey = event.changedTouches[0].clientY;
      // if (this.touchsx - this.touchex >= 50) {
        if (store.getters.auth > 1 & store.getters.department == 'EVK' || store.getters.auth > 10) {
          this.currentItem = index;
          this.index = index
        } else {
          // 如果没有权限，可以通过某种方式给出提示
          this.$message.error('你没有权限！(You do not have permission!)');
        }
      // }
      console.log(this.currentItem)
  
      },
      delRequestData:antiShake(function() {
        // 删除请求数据的方法
        console.log(this.index)
        this.delDialogVisible = false
        this.$axios.post(
                     '/electrode/login/',
                     {
                         demo:'deleteRequestData',
                         id:this.allRequestData[this.index].id
                     },
                     {headers:{
                         'Content-Type': 'application/json',
                     }}
                 ).then(
                     response => {
                         console.log(response.data);
                         if(response.data.status){
                          this.$message.success('数据删除成功！(Delete data successfully!)')
                          this.reload()
                         }else{
                           this.$message.error('数据删除失败！(Delete data failed, please try again!)')
                         }
                     }
                 ).catch(
                     error => {
                         console.log(error)
                     }
                 )
      }),
      approveRequestData:antiShake(function() {
        let that = this
        // 批准请求数据的方法
        this.approveDialogVisible = false
        this.$axios.post(
                     '/electrode/login/',
                     {
                         demo:'giveoutDataInsert',
                         materialName:that.allRequestData[that.index].materialName,
                         materialModel:that.allRequestData[that.index].materialModel,
                         giveoutNum:that.allRequestData[that.index].giveoutNum,
                         userName:that.allRequestData[that.index].giveoutPcs,
                         editName:store.getters.username,
                         giveoutPcs:that.allRequestData[that.index].giveoutTime
,
                         giveoutTime:Math.floor(Date.now() / 1000)

                     },
                     {headers:{
                         'Content-Type': 'application/json',
                     }}
                 ).then(
                     response => {
                         console.log(response.data);
                         if(response.data.status){
                          this.$axios.post(
                                      '/electrode/login/',
                                      {
                                          demo:'deleteRequestData',
                                          id:this.allRequestData[this.index].id
                                      },
                                      {headers:{
                                          'Content-Type': 'application/json',
                                      }}
                                    ).then(
                                        response => {
                                            console.log(response.data);
                                            if(response.data.status){
                                             this.reload()
                                            }
                                        }
                                    ).catch(
                                        error => {
                                            console.log(error)
                                        }
                                    )
                          this.$message.success('领用数据提交成功！(Data submit successfully!)')
                          
                         }else{
                           this.$message.error('领用数据提交失败！(Data submit failed, please try again!)')
                         }
                     }
                 ).catch(
                     error => {
                         console.log(error)
                     }
                 )
      }),
      handleClose(done) {
        this.$confirm('确认关闭？(Confirm closed?)')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    mounted(){
      this.$axios.post(
                     '/electrode/login/',
                     {
                         demo:'queryRequestData',
                     },
                     {headers:{
                         'Content-Type': 'application/json',
                     }}
                 ).then(
                     response => {
                         console.log(response.data);
                         if(response.data){
                           this.allRequestData = response.data
                         }else{
                           this.$message.success('数据获取失败，请重试！(Data acquisition failed, please try again!)')
                         }
                     }
                 ).catch(
                     error => {
                         console.log(error)
                     }
                 )
    }
  };
  </script>
  
  <style scoped>
  /* 在这里添加组件的样式 */
  @import url('./approvePage.css');
  </style>
  